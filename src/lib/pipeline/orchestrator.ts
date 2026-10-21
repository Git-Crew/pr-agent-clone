import { and, asc, eq, inArray, isNull, notInArray } from "drizzle-orm";

import { actionPowers, performActions } from "@/lib/agents/actions";
import { toAgentResult } from "@/lib/agents/adapters";
import { type AgentRequest, type AgentResult, agentResultSchema } from "@/lib/agents/contract";
import { buildDiffIndex } from "@/lib/agents/diff";
import { callHttpAgent } from "@/lib/agents/http";
import { instructionsFor, moduleForSlug, placeForSlug } from "@/lib/agents/modules";
import { BUILTIN_AGENTS, getBuiltinAgent, resolveAgentConfig } from "@/lib/agents/registry";
import { buildReview } from "@/lib/agents/review";
import { decryptSecret } from "@/lib/crypto/secrets";
import {
  agents,
  type Conclusion,
  installations,
  type LogLevel,
  pipelineSteps,
  type Repository,
  type Run,
  type RunStep,
  repositories,
  runLogs,
  runSteps,
  runs,
  secrets,
} from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";
import type { CheckRunConclusion, GitHubClient, InstallationInfo, InstallationRepository } from "@/lib/github/client";
import { GitHubApiError } from "@/lib/github/client";
import type { ActionsClaims } from "@/lib/github/oidc";
import { signBody, verifyWebhookSignature } from "@/lib/github/webhook";
import { completeModel, loopProvider, promptOverride, resolveModel, secretFor } from "@/lib/models";
import { noteFromFinish } from "@/lib/observe/phase";
import { rememberPhase } from "@/lib/observe/remember";
import { type PreparedSpace, prepareSpace, recordDiff } from "@/lib/space/prepare";

import { checkRunName } from "./naming";
import { evaluateStep, isTriggered } from "./rules";

// The run state machine (docs/ARCHITECTURE.md §3):
//   webhook → startRunForPullRequest → dispatchNextStage → runner GET job (getStageJob)
//   → runner POST result (submitStepResult) → advanceRun → next stage or finalizeRun.

export const WORKFLOW_FILE = "agent-pr.yml";
const MAX_CHECK_SUMMARY = 60_000;

export type OrchestratorDeps = {
  db: Db;
  github: (installationId: number) => GitHubClient;
  appUrl: string;
};

export class RunnerRequestError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "RunnerRequestError";
  }
}

const TERMINAL_STEP = new Set(["completed", "skipped", "cancelled"]);

export { checkRunName };

export function runUrl(appUrl: string, runId: string) {
  return `${appUrl}/dashboard/runs/${runId}`;
}

async function log(db: Db, runId: string, message: string, level: LogLevel = "info", stepId: string | null = null) {
  await db.insert(runLogs).values({ runId, stepId, level, message });
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

/** A failing agent only fails its check (and the merge gate) when the step is blocking. */
function checkConclusion(result: AgentResult["conclusion"], blocking: boolean): Conclusion {
  if (result === "failure") return blocking ? "failure" : "neutral";
  return result;
}

// ─── Built-in agents and installation sync ─────────────────────────────────

export async function ensureBuiltinAgents(db: Db) {
  for (const agent of BUILTIN_AGENTS) {
    await db
      .insert(agents)
      .values({
        slug: agent.slug,
        name: agent.name,
        description: agent.description,
        kind: "builtin",
        defaultConfig: agent.configSchema.parse({}),
      })
      .onConflictDoUpdate({
        target: agents.slug,
        set: { name: agent.name, description: agent.description, updatedAt: new Date() },
      });
  }
}

/** New repos start with FixMySlop in stage 1, non-blocking, so a fresh install works with zero setup. */
async function addDefaultPipeline(db: Db, repositoryId: number) {
  await ensureBuiltinAgents(db);
  const [fixmyslop] = await db.select().from(agents).where(eq(agents.slug, "fixmyslop")).limit(1);
  if (!fixmyslop) return;
  await db.insert(pipelineSteps).values({ repositoryId, agentId: fixmyslop.id, stage: 1, position: 0 });
}

export async function upsertInstallation(db: Db, info: InstallationInfo) {
  const values = {
    id: info.id,
    accountId: info.account.id,
    accountLogin: info.account.login,
    accountType: info.account.type,
    accountAvatarUrl: info.account.avatar_url,
    suspendedAt: info.suspended_at ? new Date(info.suspended_at) : null,
  };
  await db
    .insert(installations)
    .values(values)
    .onConflictDoUpdate({ target: installations.id, set: { ...values, deletedAt: null, updatedAt: new Date() } });
}

export async function upsertRepositories(db: Db, installationId: number, repos: InstallationRepository[]) {
  if (repos.length === 0) return;
  const existing = await db
    .select({ id: repositories.id })
    .from(repositories)
    .where(
      inArray(
        repositories.id,
        repos.map((r) => r.id),
      ),
    );
  const known = new Set(existing.map((r) => r.id));
  for (const repo of repos) {
    const values = {
      id: repo.id,
      installationId,
      fullName: repo.full_name,
      private: repo.private,
      defaultBranch: repo.default_branch,
    };
    await db
      .insert(repositories)
      .values(values)
      .onConflictDoUpdate({ target: repositories.id, set: { ...values, removedAt: null, updatedAt: new Date() } });
    if (!known.has(repo.id)) await addDefaultPipeline(db, repo.id);
  }
}

/** Full sync: installation row, every repo it can access, and mark repos it lost as removed. */
export async function syncInstallation(deps: OrchestratorDeps, info: InstallationInfo) {
  await upsertInstallation(deps.db, info);
  const repos = await deps.github(info.id).listRepositories();
  await upsertRepositories(deps.db, info.id, repos);
  const ids = repos.map((r) => r.id);
  await deps.db
    .update(repositories)
    .set({ removedAt: new Date() })
    .where(
      and(
        eq(repositories.installationId, info.id),
        isNull(repositories.removedAt),
        ids.length ? notInArray(repositories.id, ids) : undefined,
      ),
    );
}

export async function markInstallationDeleted(db: Db, installationId: number) {
  await db.update(installations).set({ deletedAt: new Date() }).where(eq(installations.id, installationId));
}

export async function setInstallationSuspended(db: Db, installationId: number, suspended: boolean) {
  await db
    .update(installations)
    .set({ suspendedAt: suspended ? new Date() : null, updatedAt: new Date() })
    .where(eq(installations.id, installationId));
}

export async function markRepositoriesRemoved(db: Db, repoIds: number[]) {
  if (repoIds.length === 0) return;
  await db.update(repositories).set({ removedAt: new Date() }).where(inArray(repositories.id, repoIds));
}

// ─── Starting a run ────────────────────────────────────────────────────────

export type PullRequestEvent = {
  action: string;
  /** The label just added, on "labeled" events. */
  label?: { name: string };
  installation: { id: number };
  repository: InstallationRepository & { owner: { id: number; login: string; type: string; avatar_url: string } };
  pull_request: {
    number: number;
    title: string;
    html_url: string;
    state: string;
    draft?: boolean;
    labels?: { name: string }[];
    user: { login: string } | null;
    head: { sha: string; ref: string; repo: { full_name: string } | null };
    base: { sha: string; ref: string; repo: { full_name: string } };
  };
};

const RUN_ACTIONS = new Set(["opened", "synchronize", "reopened", "ready_for_review", "labeled"]);

/** Built-in runner agents, and HTTP agents with a URL, can run today. */
function canRun(agent: typeof agents.$inferSelect): boolean {
  return Boolean(getBuiltinAgent(agent.slug)) || (agent.kind === "http" && Boolean(agent.endpointUrl));
}

export async function startRunForPullRequest(deps: OrchestratorDeps, event: PullRequestEvent): Promise<string | null> {
  const { db } = deps;
  const pr = event.pull_request;

  if (event.action === "closed") {
    await cancelOpenRunsForPr(deps, event.repository.id, pr.number, "PR was closed");
    return null;
  }
  if (!RUN_ACTIONS.has(event.action) || pr.state !== "open") return null;

  // The installation event normally arrives first, but webhooks can race: make sure the rows exist.
  const [installation] = await db
    .select()
    .from(installations)
    .where(eq(installations.id, event.installation.id))
    .limit(1);
  if (!installation) {
    await upsertInstallation(db, { id: event.installation.id, account: event.repository.owner, suspended_at: null });
  } else if (installation.suspendedAt || installation.deletedAt) {
    return null;
  }
  await upsertRepositories(db, event.installation.id, [event.repository]);

  const [repo] = await db.select().from(repositories).where(eq(repositories.id, event.repository.id)).limit(1);
  if (!repo?.enabled || repo.removedAt) return null;

  const steps = await db
    .select({ step: pipelineSteps, agent: agents })
    .from(pipelineSteps)
    .innerJoin(agents, eq(pipelineSteps.agentId, agents.id))
    .where(eq(pipelineSteps.repositoryId, repo.id))
    .orderBy(asc(pipelineSteps.stage), asc(pipelineSteps.position));
  // "When should it run?": steps this event does not trigger are left out of the run entirely.
  const triggerFacts = {
    action: event.action,
    labels: (pr.labels ?? []).map((label) => label.name),
    addedLabel: event.label?.name ?? null,
  };
  const triggered = steps.filter(({ step }) => isTriggered(step, triggerFacts));
  if (triggered.length === 0) return null;

  // Adding a label only starts that label's agents, so it must not cancel the run for the latest push.
  if (event.action !== "labeled") {
    await cancelOpenRunsForPr(deps, repo.id, pr.number, `Superseded by ${pr.head.sha.slice(0, 7)}`);
  }

  const github = deps.github(event.installation.id);
  const files = await github.listPullFiles(repo.fullName, pr.number);
  const isFork = !pr.head.repo || pr.head.repo.full_name !== pr.base.repo.full_name;
  const facts = {
    baseRef: pr.base.ref,
    draft: Boolean(pr.draft),
    isFork,
    changedFiles: files.map((f) => ({ path: f.filename, removed: f.status === "removed" })),
  };

  const [run] = await db
    .insert(runs)
    .values({
      repositoryId: repo.id,
      prNumber: pr.number,
      prTitle: pr.title,
      prAuthor: pr.user?.login ?? "",
      prUrl: pr.html_url,
      headSha: pr.head.sha,
      baseSha: pr.base.sha,
      headRef: pr.head.ref,
      baseRef: pr.base.ref,
      isFork,
      trigger: `pull_request.${event.action}`,
    })
    .returning();

  for (const { step, agent } of triggered) {
    let decision = evaluateStep(step, facts);
    let config: Record<string, unknown> = step.config;
    if (decision.run && !canRun(agent)) {
      decision = { run: false, reason: `${agent.name} can't run yet` };
    }
    if (decision.run) {
      try {
        config = resolveAgentConfig(agent.slug, { ...agent.defaultConfig, ...step.config });
      } catch (error) {
        decision = { run: false, reason: `Invalid agent config: ${errorMessage(error)}` };
      }
    }
    await db.insert(runSteps).values({
      runId: run.id,
      pipelineStepId: step.id,
      agentId: agent.id,
      agentSlug: agent.slug,
      agentName: agent.name,
      stage: step.stage,
      blocking: step.blocking,
      reviewMode: step.reviewMode,
      commentStyle: step.commentStyle,
      maxComments: step.maxComments,
      config,
      targetFiles: decision.run ? decision.files : [],
      status: decision.run ? "pending" : "skipped",
      conclusion: decision.run ? null : "skipped",
      skipReason: decision.run ? null : decision.reason,
    });
  }
  await log(
    db,
    run.id,
    `Run created for ${repo.fullName}#${pr.number} at ${pr.head.sha.slice(0, 7)} (${files.length} changed files)`,
  );

  await createCheckRuns(deps, run, repo, event.installation.id);
  await dispatchNextStage(deps, run.id);
  return run.id;
}

async function createCheckRuns(deps: OrchestratorDeps, run: Run, repo: Repository, installationId: number) {
  const github = deps.github(installationId);
  const steps = await deps.db.select().from(runSteps).where(eq(runSteps.runId, run.id));
  for (const step of steps) {
    // Skipped non-blocking steps stay quiet. Skipped blocking steps get a "skipped" check so a required check
    // does not hang as "Expected" on PRs it does not apply to.
    if (step.status === "skipped" && !step.blocking) continue;
    try {
      const skipped = step.status === "skipped";
      const created = await github.createCheckRun(repo.fullName, {
        name: checkRunName(step.agentName),
        head_sha: run.headSha,
        external_id: step.id,
        details_url: runUrl(deps.appUrl, run.id),
        status: skipped ? "completed" : "queued",
        ...(skipped
          ? {
              conclusion: "skipped" as const,
              completed_at: new Date().toISOString(),
              output: { title: "Skipped", summary: step.skipReason ?? "Skipped" },
            }
          : {}),
      });
      await deps.db.update(runSteps).set({ checkRunId: created.id }).where(eq(runSteps.id, step.id));
    } catch (error) {
      await log(
        deps.db,
        run.id,
        `Could not create check run for ${step.agentName}: ${errorMessage(error)}`,
        "warn",
        step.id,
      );
    }
  }
}

async function loadRunContext(db: Db, runId: string) {
  const [row] = await db
    .select({ run: runs, repo: repositories })
    .from(runs)
    .innerJoin(repositories, eq(runs.repositoryId, repositories.id))
    .where(eq(runs.id, runId))
    .limit(1);
  return row ?? null;
}

function placeForStep(step: RunStep) {
  const builtin = getBuiltinAgent(step.agentSlug);
  return placeForSlug(step.agentSlug, builtin?.executor === "runner" ? "actions" : "http");
}

async function installationSecret(db: Db, installationId: number, repositoryId: number, name: string) {
  const rows = await db
    .select()
    .from(secrets)
    .where(and(eq(secrets.installationId, installationId), eq(secrets.name, name)));
  const row =
    rows.find((secret) => secret.repositoryId === repositoryId) ?? rows.find((secret) => secret.repositoryId === null);
  return row ? decryptSecret(row.value) : null;
}

async function runProcessStep(deps: OrchestratorDeps, run: Run, repo: Repository, step: RunStep, space: PreparedSpace) {
  const mod = moduleForSlug(step.agentSlug);
  if (!mod?.run) {
    await completeStepWithError(deps, step, "This agent has no review loop.");
    return;
  }
  try {
    const spec = resolveModel(step.config);
    const apiKey = await installationSecret(deps.db, repo.installationId, repo.id, secretFor(spec.provider));
    if (!apiKey) {
      await completeStepWithError(deps, step, `Add a ${secretFor(spec.provider)} secret for this installation.`);
      return;
    }
    const request = await buildAgentRequest(deps, run, repo, step);
    if (space.checkoutDir) await recordDiff(space.checkoutDir, request.changedFiles);
    const system = typeof step.config.system === "string" ? step.config.system.trim() : "";
    const result = await mod.run({
      instructions: promptOverride(instructionsFor(step.agentSlug), step.config.instructions),
      system: system || undefined,
      files: request.changedFiles,
      model: spec,
      apiKey,
      isFork: run.isFork,
      checkoutDir: space.checkoutDir,
      memoryDir: space.memoryDir(mod.id),
      complete: (prompt) => completeModel(spec, apiKey, prompt),
    });
    await completeStepWithResult(deps, run, repo, step, result);
  } catch (error) {
    await completeStepWithError(deps, step, errorMessage(error));
  }
}

// ─── Stages ────────────────────────────────────────────────────────────────

export async function dispatchNextStage(deps: OrchestratorDeps, runId: string): Promise<void> {
  const { db } = deps;
  const ctx = await loadRunContext(db, runId);
  if (!ctx || ctx.run.status === "completed" || ctx.run.status === "cancelled") return;

  const pending = await db
    .select({ stage: runSteps.stage })
    .from(runSteps)
    .where(and(eq(runSteps.runId, runId), eq(runSteps.status, "pending")))
    .orderBy(asc(runSteps.stage))
    .limit(1);
  if (pending.length === 0) {
    await finalizeRun(deps, runId);
    return;
  }
  const stage = pending[0].stage;

  // Claim the stage atomically so two concurrent results can't dispatch it twice.
  const claimed = await db
    .update(runSteps)
    .set({ status: "queued" })
    .where(and(eq(runSteps.runId, runId), eq(runSteps.stage, stage), eq(runSteps.status, "pending")))
    .returning();
  if (claimed.length === 0) return;

  await db
    .update(runs)
    .set({ status: "running", currentStage: stage, startedAt: ctx.run.startedAt ?? new Date() })
    .where(eq(runs.id, runId));

  // FixMySlop uses the Actions checkout. Prompt loops run here. Hermes and OpenClaw run on the worker.
  const actionsSteps = claimed.filter((step) => placeForStep(step) === "actions");
  const processSteps = claimed.filter((step) => placeForStep(step) === "process");
  const workerSteps = claimed.filter((step) => placeForStep(step) === "worker");
  const httpSteps = claimed.filter((step) => placeForStep(step) === "http");

  if (actionsSteps.length > 0) {
    const github = deps.github(ctx.repo.installationId);
    try {
      await github.dispatchWorkflow(ctx.repo.fullName, WORKFLOW_FILE, ctx.repo.defaultBranch, {
        run_id: runId,
        stage: String(stage),
      });
      await log(
        db,
        runId,
        `Stage ${stage} dispatched to ${WORKFLOW_FILE} (${actionsSteps.map((s) => s.agentName).join(", ")})`,
      );
    } catch (error) {
      const hint =
        error instanceof GitHubApiError && (error.status === 404 || error.status === 422)
          ? `Add .github/workflows/${WORKFLOW_FILE} to ${ctx.repo.defaultBranch} (the dashboard shows the file).`
          : "";
      const message = `Could not start the agent workflow: ${errorMessage(error)} ${hint}`.trim();
      await log(db, runId, message, "error");
      for (const step of actionsSteps) {
        await completeStepWithError(deps, step, message);
      }
    }
  }

  const space = await prepareSpace({
    modules: processSteps.flatMap((step) => {
      const mod = moduleForSlug(step.agentSlug);
      return mod ? [mod] : [];
    }),
    runId,
    installationId: ctx.repo.installationId,
    repositoryId: ctx.repo.id,
    isFork: ctx.run.isFork,
  });
  try {
    await Promise.all([
      ...processSteps.map((step) => runProcessStep(deps, ctx.run, ctx.repo, step, space)),
      ...workerSteps.map((step) => runWorkerStep(deps, ctx.run, ctx.repo, step)),
      ...httpSteps.map((step) => runHttpStep(deps, ctx.run, ctx.repo, step)),
    ]);
  } finally {
    await space.close();
  }
  await advanceRun(deps, runId);
}

// ─── HTTP agents ───────────────────────────────────────────────────────────

const MAX_PATCH_CHARS = 400_000;

async function buildAgentRequest(
  deps: OrchestratorDeps,
  run: Run,
  repo: Repository,
  step: RunStep,
): Promise<AgentRequest> {
  const files = await deps.github(repo.installationId).listPullFiles(repo.fullName, run.prNumber);
  const wanted = new Set(step.targetFiles);
  let budget = MAX_PATCH_CHARS;
  const changedFiles = files
    .filter((file) => wanted.has(file.filename))
    .map((file) => {
      const patch = file.patch && file.patch.length <= budget ? file.patch : undefined;
      if (patch) budget -= patch.length;
      return { path: file.filename, status: file.status, additions: file.additions, deletions: file.deletions, patch };
    });
  return {
    version: 1,
    runId: run.id,
    stepId: step.id,
    agent: { slug: step.agentSlug, config: step.config },
    repository: { id: repo.id, fullName: repo.fullName, defaultBranch: repo.defaultBranch, private: repo.private },
    pullRequest: {
      number: run.prNumber,
      title: run.prTitle,
      url: run.prUrl,
      author: run.prAuthor,
      headSha: run.headSha,
      baseSha: run.baseSha,
      headRef: run.headRef,
      baseRef: run.baseRef,
      isFork: run.isFork,
    },
    changedFiles,
    callbackUrl: `${deps.appUrl}/api/agents/steps/${step.id}/result`,
  };
}

async function runHttpStep(deps: OrchestratorDeps, run: Run, repo: Repository, step: RunStep): Promise<void> {
  const { db } = deps;
  const [agent] = step.agentId ? await db.select().from(agents).where(eq(agents.id, step.agentId)).limit(1) : [];
  if (!agent?.endpointUrl || !agent.signingSecret) {
    await completeStepWithError(deps, step, "This agent has no URL or secret. Reconnect it on the Agents page.");
    return;
  }
  await db.update(runSteps).set({ status: "running", startedAt: new Date() }).where(eq(runSteps.id, step.id));
  await safeUpdateCheckRun(deps, repo, step, { status: "in_progress", started_at: new Date().toISOString() });

  try {
    const outcome = await callHttpAgent({
      url: agent.endpointUrl,
      secret: decryptSecret(agent.signingSecret),
      agentName: agent.name,
      request: await buildAgentRequest(deps, run, repo, step),
    });
    if (outcome.kind === "accepted") {
      await log(db, run.id, `${agent.name}: accepted, waiting for its result`, "info", step.id);
    } else if (outcome.kind === "result") {
      await completeStepWithResult(deps, run, repo, { ...step, status: "running" }, outcome.result);
    } else {
      await completeStepWithError(deps, step, outcome.error);
    }
  } catch (error) {
    await completeStepWithError(deps, step, `Could not call the agent: ${errorMessage(error)}`);
  }
}

/** An HTTP agent that answered 202 posts its findings here, signed with its secret. */
export async function submitAgentCallback(
  deps: OrchestratorDeps,
  stepId: string,
  rawBody: string,
  signature: string | null,
  contentType: string,
): Promise<{ conclusion: Conclusion }> {
  const { db } = deps;
  const [row] = await db
    .select({ step: runSteps, agent: agents })
    .from(runSteps)
    .innerJoin(agents, eq(agents.id, runSteps.agentId))
    .where(eq(runSteps.id, stepId))
    .limit(1);
  if (!row || row.agent.kind !== "http" || !row.agent.signingSecret) throw new RunnerRequestError(404, "Unknown step");
  if (!verifyWebhookSignature(decryptSecret(row.agent.signingSecret), rawBody, signature)) {
    throw new RunnerRequestError(401, "Invalid signature");
  }
  if (row.step.status !== "running" && row.step.status !== "queued") {
    throw new RunnerRequestError(409, `Step is already ${row.step.status}`);
  }
  const ctx = await loadRunContext(db, row.step.runId);
  if (!ctx) throw new RunnerRequestError(404, "Unknown run");

  let conclusion: Conclusion;
  try {
    const result = toAgentResult(rawBody, row.agent.name, contentType);
    conclusion = await completeStepWithResult(deps, ctx.run, ctx.repo, row.step, result);
  } catch (error) {
    if (error instanceof RunnerRequestError) throw error;
    conclusion = await completeStepWithError(
      deps,
      row.step,
      `Could not read the agent's result: ${errorMessage(error)}`,
    );
  }
  await advanceRun(deps, row.step.runId);
  return { conclusion };
}

/** The worker posts an AgentResult here, signed with GITCREW_WORKER_SECRET. */
export async function submitWorkerResult(
  deps: OrchestratorDeps,
  stepId: string,
  rawBody: string,
  signature: string | null,
): Promise<{ conclusion: Conclusion }> {
  const secret = process.env.GITCREW_WORKER_SECRET;
  if (!secret || !verifyWebhookSignature(secret, rawBody, signature)) {
    throw new RunnerRequestError(401, "Invalid signature");
  }
  const { db } = deps;
  const [step] = await db.select().from(runSteps).where(eq(runSteps.id, stepId)).limit(1);
  if (!step || placeForStep(step) !== "worker") throw new RunnerRequestError(404, "Unknown step");
  if (step.status !== "running" && step.status !== "queued") {
    throw new RunnerRequestError(409, `Step is already ${step.status}`);
  }
  const ctx = await loadRunContext(db, step.runId);
  if (!ctx) throw new RunnerRequestError(404, "Unknown run");

  let conclusion: Conclusion;
  try {
    conclusion = await completeStepWithResult(
      deps,
      ctx.run,
      ctx.repo,
      step,
      agentResultSchema.parse(JSON.parse(rawBody)),
    );
  } catch (error) {
    if (error instanceof RunnerRequestError) throw error;
    conclusion = await completeStepWithError(deps, step, `Could not read the worker result: ${errorMessage(error)}`);
  }
  await advanceRun(deps, step.runId);
  return { conclusion };
}

async function runWorkerStep(deps: OrchestratorDeps, run: Run, repo: Repository, step: RunStep): Promise<void> {
  const workerUrl = process.env.GITCREW_WORKER_URL?.replace(/\/$/, "");
  const secret = process.env.GITCREW_WORKER_SECRET;
  if (!workerUrl || !secret) {
    await completeStepWithError(
      deps,
      step,
      "Set GITCREW_WORKER_URL and GITCREW_WORKER_SECRET. Hermes and OpenClaw run on the worker, not in this app.",
    );
    return;
  }
  const mod = moduleForSlug(step.agentSlug);
  if (!mod) {
    await completeStepWithError(deps, step, "This agent has no review loop.");
    return;
  }
  const spec = resolveModel(step.config);
  const apiKey = await installationSecret(deps.db, repo.installationId, repo.id, secretFor(spec.provider));
  if (!apiKey) {
    await completeStepWithError(deps, step, `Add a ${secretFor(spec.provider)} secret for this installation.`);
    return;
  }
  await deps.db.update(runSteps).set({ status: "running", startedAt: new Date() }).where(eq(runSteps.id, step.id));
  await safeUpdateCheckRun(deps, repo, step, { status: "in_progress", started_at: new Date().toISOString() });
  try {
    const request = await buildAgentRequest(deps, run, repo, step);
    const powers = actionPowers(step.config, run.isFork);
    const body = JSON.stringify({
      moduleId: mod.id,
      installationId: repo.installationId,
      instructions: promptOverride(instructionsFor(step.agentSlug), step.config.instructions),
      system: typeof step.config.system === "string" ? step.config.system.trim() : "",
      model: { provider: loopProvider(spec.provider), model: spec.model },
      apiKey,
      cloneToken: run.isFork ? null : await deps.github(repo.installationId).contentsToken(),
      memory: mod.memory,
      collectWrites: powers.draftPr,
      request: { ...request, callbackUrl: `${deps.appUrl}/api/workers/steps/${step.id}/result` },
    });
    const response = await fetch(`${workerUrl}/v1/jobs`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-gitcrew-signature": signBody(secret, body) },
      body,
      signal: AbortSignal.timeout(15_000),
    });
    if (response.status !== 202) {
      throw new Error(`The worker answered ${response.status}`);
    }
    await log(deps.db, run.id, `${step.agentName}: accepted by the worker`, "info", step.id);
  } catch (error) {
    await completeStepWithError(deps, step, `Could not reach the worker: ${errorMessage(error)}`);
  }
}

/** Called after any step finishes. Moves to the next stage, stops on a blocking failure, or finalizes. */
export async function advanceRun(deps: OrchestratorDeps, runId: string): Promise<void> {
  const { db } = deps;
  const steps = await db.select().from(runSteps).where(eq(runSteps.runId, runId));
  const inFlight = steps.filter((s) => s.status === "queued" || s.status === "running");
  if (inFlight.length > 0) return;

  const blockingFailure = steps.find((s) => s.status === "completed" && s.blocking && s.conclusion === "failure");
  if (blockingFailure) {
    const ctx = await loadRunContext(db, runId);
    const pending = steps.filter((s) => s.status === "pending");
    for (const step of pending) {
      const reason = `Skipped because the blocking agent ${blockingFailure.agentName} failed`;
      await db
        .update(runSteps)
        .set({ status: "skipped", conclusion: "skipped", skipReason: reason, finishedAt: new Date() })
        .where(eq(runSteps.id, step.id));
      if (ctx && step.checkRunId) {
        await safeUpdateCheckRun(deps, ctx.repo, step, {
          status: "completed",
          conclusion: "skipped",
          completed_at: new Date().toISOString(),
          output: { title: "Skipped", summary: reason },
        });
      }
    }
    await finalizeRun(deps, runId);
    return;
  }
  await dispatchNextStage(deps, runId);
}

export async function finalizeRun(deps: OrchestratorDeps, runId: string) {
  const { db } = deps;
  const steps = await db.select().from(runSteps).where(eq(runSteps.runId, runId));
  let conclusion: Conclusion = "skipped";
  if (steps.some((s) => s.blocking && s.conclusion === "failure")) conclusion = "failure";
  else if (steps.some((s) => s.status === "completed")) conclusion = "success";

  const updated = await db
    .update(runs)
    .set({ status: "completed", conclusion, finishedAt: new Date() })
    .where(and(eq(runs.id, runId), inArray(runs.status, ["queued", "running"])))
    .returning({ id: runs.id });
  if (updated.length > 0) await log(db, runId, `Run finished: ${conclusion}`);
}

// ─── Runner API ────────────────────────────────────────────────────────────

/** The runner proves which repo it runs in; it must be our run's repo, on the default-branch workflow. */
function assertRunnerOwnsRun(claims: ActionsClaims, repo: Repository) {
  if (claims.repositoryId !== repo.id) throw new RunnerRequestError(403, "Token is for a different repository");
  if (claims.eventName !== "workflow_dispatch") {
    throw new RunnerRequestError(403, "Only workflow_dispatch runs of agent-pr.yml may report results");
  }
  if (claims.ref !== `refs/heads/${repo.defaultBranch}`) {
    throw new RunnerRequestError(403, `Workflow must run from ${repo.defaultBranch}`);
  }
}

export type StageJob = {
  runId: string;
  stage: number;
  repository: string;
  pullRequest: { number: number; headSha: string; baseSha: string; baseRef: string; isFork: boolean };
  steps: {
    stepId: string;
    agent: string;
    config: Record<string, unknown>;
    files: string[];
    spec: Record<string, string>;
  }[];
};

export async function getStageJob(
  deps: OrchestratorDeps,
  runId: string,
  stage: number,
  claims: ActionsClaims,
): Promise<StageJob> {
  const { db } = deps;
  const ctx = await loadRunContext(db, runId);
  if (!ctx) throw new RunnerRequestError(404, "Unknown run");
  assertRunnerOwnsRun(claims, ctx.repo);
  if (ctx.run.status === "cancelled" || ctx.run.status === "completed") {
    throw new RunnerRequestError(409, `Run is ${ctx.run.status}`);
  }

  const started = await db
    .update(runSteps)
    .set({ status: "running", startedAt: new Date() })
    .where(and(eq(runSteps.runId, runId), eq(runSteps.stage, stage), inArray(runSteps.status, ["queued", "running"])))
    .returning();
  if (started.length === 0) throw new RunnerRequestError(409, `No steps waiting in stage ${stage}`);

  for (const step of started) {
    if (step.checkRunId) {
      await safeUpdateCheckRun(deps, ctx.repo, step, { status: "in_progress", started_at: new Date().toISOString() });
    }
  }
  await log(db, runId, `Runner picked up stage ${stage} (GitHub Actions run ${claims.runId})`);

  return {
    runId,
    stage,
    repository: ctx.repo.fullName,
    pullRequest: {
      number: ctx.run.prNumber,
      headSha: ctx.run.headSha,
      baseSha: ctx.run.baseSha,
      baseRef: ctx.run.baseRef,
      isFork: ctx.run.isFork,
    },
    steps: started.map((step) => ({
      stepId: step.id,
      agent: step.agentSlug,
      config: step.config,
      files: step.targetFiles,
      spec: { ...getBuiltinAgent(step.agentSlug)?.runnerSpec },
    })),
  };
}

export type StepResultBody = { ok: boolean; output?: unknown; error?: string };

export async function submitStepResult(
  deps: OrchestratorDeps,
  stepId: string,
  body: StepResultBody,
  claims: ActionsClaims,
): Promise<{ conclusion: Conclusion }> {
  const { db } = deps;
  const [step] = await db.select().from(runSteps).where(eq(runSteps.id, stepId)).limit(1);
  if (!step) throw new RunnerRequestError(404, "Unknown step");
  const ctx = await loadRunContext(db, step.runId);
  if (!ctx) throw new RunnerRequestError(404, "Unknown run");
  assertRunnerOwnsRun(claims, ctx.repo);
  if (step.status !== "running" && step.status !== "queued") {
    throw new RunnerRequestError(409, `Step is already ${step.status}`);
  }

  if (!body.ok) {
    const conclusion = await completeStepWithError(deps, step, body.error ?? "The runner reported a failure");
    await advanceRun(deps, step.runId);
    return { conclusion };
  }

  let result: AgentResult;
  try {
    const agent = getBuiltinAgent(step.agentSlug);
    result = agentResultSchema.parse(agent ? agent.finalize(body.output, step.config) : body.output);
  } catch (error) {
    const conclusion = await completeStepWithError(
      deps,
      step,
      `Could not read the agent output: ${errorMessage(error)}`,
    );
    await advanceRun(deps, step.runId);
    return { conclusion };
  }

  const conclusion = await completeStepWithResult(deps, ctx.run, ctx.repo, step, result);
  await advanceRun(deps, step.runId);
  return { conclusion };
}

/** The runner job crashed before reporting: fail whatever it had not finished. */
export async function failStage(
  deps: OrchestratorDeps,
  runId: string,
  stage: number,
  message: string,
  claims: ActionsClaims,
) {
  const ctx = await loadRunContext(deps.db, runId);
  if (!ctx) throw new RunnerRequestError(404, "Unknown run");
  assertRunnerOwnsRun(claims, ctx.repo);
  const open = await deps.db
    .select()
    .from(runSteps)
    .where(and(eq(runSteps.runId, runId), eq(runSteps.stage, stage), inArray(runSteps.status, ["queued", "running"])));
  for (const step of open) await completeStepWithError(deps, step, message);
  await advanceRun(deps, runId);
  return { failed: open.length };
}

// ─── Completing steps ──────────────────────────────────────────────────────

async function safeUpdateCheckRun(
  deps: OrchestratorDeps,
  repo: Repository,
  step: RunStep,
  input: Parameters<GitHubClient["updateCheckRun"]>[2],
) {
  if (!step.checkRunId) return;
  try {
    await deps.github(repo.installationId).updateCheckRun(repo.fullName, step.checkRunId, input);
  } catch (error) {
    await log(deps.db, step.runId, `Could not update check run: ${errorMessage(error)}`, "warn", step.id);
  }
}

async function completeStepWithError(deps: OrchestratorDeps, step: RunStep, message: string): Promise<Conclusion> {
  const conclusion: Conclusion = step.blocking ? "failure" : "neutral";
  const finished = await deps.db
    .update(runSteps)
    .set({
      status: "completed",
      conclusion,
      title: "Agent did not finish",
      summary: message,
      finishedAt: new Date(),
    })
    .where(and(eq(runSteps.id, step.id), notInArray(runSteps.status, ["completed", "skipped", "cancelled"])))
    .returning({ id: runSteps.id });
  if (finished.length === 0) return conclusion;
  await log(deps.db, step.runId, `${step.agentName}: ${message}`, "error", step.id);
  const ctx = await loadRunContext(deps.db, step.runId);
  if (ctx) {
    await rememberPhase(
      deps.db,
      noteFromFinish({
        agentSlug: step.agentSlug,
        agentName: step.agentName,
        outcome: "failed",
        startedAt: step.startedAt,
        finishedAt: new Date(),
        runId: step.runId,
        stepId: step.id,
        repository: ctx.repo.fullName,
      }),
    );
    await safeUpdateCheckRun(deps, ctx.repo, step, {
      status: "completed",
      conclusion: conclusion as CheckRunConclusion,
      completed_at: new Date().toISOString(),
      output: { title: "Agent did not finish", summary: message.slice(0, MAX_CHECK_SUMMARY) },
    });
  }
  return conclusion;
}

async function completeStepWithResult(
  deps: OrchestratorDeps,
  run: Run,
  repo: Repository,
  step: RunStep,
  result: AgentResult,
): Promise<Conclusion> {
  const { db } = deps;
  const github = deps.github(repo.installationId);
  const conclusion = checkConclusion(result.conclusion, step.blocking);
  const finishedAt = new Date();

  // Claim completion first so a duplicate POST cannot post a second review.
  const claimed = await db
    .update(runSteps)
    .set({ status: "completed", conclusion, finishedAt })
    .where(and(eq(runSteps.id, step.id), inArray(runSteps.status, ["queued", "running"])))
    .returning({ id: runSteps.id });
  if (claimed.length === 0) throw new RunnerRequestError(409, "Step already completed");

  let reviewId: number | null = null;
  if (result.comments.length > 0 || result.conclusion !== "success") {
    // "How chatty?": summary style puts every finding in the review body instead of on lines.
    const maxComments = step.commentStyle === "summary" ? 0 : step.maxComments;
    try {
      const files = await github.listPullFiles(repo.fullName, run.prNumber);
      const built = buildReview({
        agentName: step.agentName,
        result,
        diff: buildDiffIndex(files),
        headSha: run.headSha,
        maxComments,
        runUrl: runUrl(deps.appUrl, run.id),
        reviewMode: step.reviewMode,
      });
      if (built.review) {
        try {
          reviewId = (await github.createReview(repo.fullName, run.prNumber, built.review)).id;
        } catch (error) {
          // 422 usually means the PR moved on and a line left the diff: post the findings without inline comments.
          if (!(error instanceof GitHubApiError && error.status === 422)) throw error;
          const fallback = buildReview({
            agentName: step.agentName,
            result,
            diff: new Map(),
            headSha: run.headSha,
            maxComments: 0,
            reviewMode: step.reviewMode,
            runUrl: runUrl(deps.appUrl, run.id),
          });
          if (fallback.review) reviewId = (await github.createReview(repo.fullName, run.prNumber, fallback.review)).id;
        }
        await log(
          db,
          run.id,
          `${step.agentName}: review posted (${built.inline} inline, ${built.outside} in summary)`,
          "info",
          step.id,
        );
      }
    } catch (error) {
      await log(db, run.id, `${step.agentName}: could not post review: ${errorMessage(error)}`, "warn", step.id);
    }
  }

  const blockingNote =
    result.conclusion === "failure" && !step.blocking
      ? "\n\n_This agent is not blocking, so its check is neutral. Mark it blocking in the pipeline to gate merges._"
      : "";
  await safeUpdateCheckRun(deps, repo, step, {
    status: "completed",
    conclusion: conclusion as CheckRunConclusion,
    completed_at: new Date().toISOString(),
    output: { title: result.title, summary: `${result.summary}${blockingNote}`.slice(0, MAX_CHECK_SUMMARY) },
  });

  try {
    await performActions(github, {
      fullName: repo.fullName,
      prNumber: run.prNumber,
      baseRef: run.baseRef,
      headSha: run.headSha,
      stepId: step.id,
      isFork: run.isFork,
      config: step.config,
      result,
    });
  } catch (error) {
    await log(
      db,
      run.id,
      `${step.agentName}: could not apply the allowed GitHub actions: ${errorMessage(error)}`,
      "warn",
      step.id,
    );
  }

  await db
    .update(runSteps)
    .set({
      title: result.title,
      summary: result.summary,
      metrics: result.metrics ?? null,
      result: { ...result, comments: result.comments.slice(0, 200) },
      reviewId,
    })
    .where(eq(runSteps.id, step.id));
  await rememberPhase(
    db,
    noteFromFinish({
      agentSlug: step.agentSlug,
      agentName: step.agentName,
      outcome: result.conclusion === "failure" ? "failed" : "ok",
      metrics: result.metrics,
      startedAt: step.startedAt,
      finishedAt,
      runId: run.id,
      stepId: step.id,
      repository: repo.fullName,
    }),
  );
  await log(db, run.id, `${step.agentName}: ${result.title} → ${conclusion}`, "info", step.id);
  return conclusion;
}

// ─── Cancelling ────────────────────────────────────────────────────────────

export async function cancelRun(deps: OrchestratorDeps, runId: string, reason: string) {
  const { db } = deps;
  const ctx = await loadRunContext(db, runId);
  if (!ctx || ctx.run.status === "completed" || ctx.run.status === "cancelled") return false;
  await db
    .update(runs)
    .set({ status: "cancelled", conclusion: "cancelled", finishedAt: new Date(), error: reason })
    .where(eq(runs.id, runId));
  const open = await db
    .update(runSteps)
    .set({ status: "cancelled", conclusion: "cancelled", skipReason: reason, finishedAt: new Date() })
    .where(and(eq(runSteps.runId, runId), inArray(runSteps.status, ["pending", "queued", "running"])))
    .returning();
  for (const step of open) {
    await safeUpdateCheckRun(deps, ctx.repo, step, {
      status: "completed",
      conclusion: "cancelled",
      completed_at: new Date().toISOString(),
      output: { title: "Cancelled", summary: reason },
    });
  }
  await log(db, runId, `Run cancelled: ${reason}`, "warn");
  return true;
}

async function cancelOpenRunsForPr(deps: OrchestratorDeps, repositoryId: number, prNumber: number, reason: string) {
  const open = await deps.db
    .select({ id: runs.id })
    .from(runs)
    .where(
      and(
        eq(runs.repositoryId, repositoryId),
        eq(runs.prNumber, prNumber),
        inArray(runs.status, ["queued", "running"]),
      ),
    );
  for (const { id } of open) await cancelRun(deps, id, reason);
}

export function isTerminalStep(step: Pick<RunStep, "status">) {
  return TERMINAL_STEP.has(step.status);
}
