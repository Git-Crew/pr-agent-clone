import { eq } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";

import * as schema from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";
import {
  type CheckRunInput,
  GitHubApiError,
  type GitHubClient,
  type InstallationRepository,
  type PullFile,
  type ReviewInput,
} from "@/lib/github/client";
import type { ActionsClaims } from "@/lib/github/oidc";
import { createTestDb } from "@/lib/test/db";

import {
  cancelRun,
  failStage,
  getStageJob,
  type OrchestratorDeps,
  type PullRequestEvent,
  RunnerRequestError,
  startRunForPullRequest,
  submitStepResult,
  syncInstallation,
} from "./orchestrator";

// End-to-end tests of the run state machine against a real Postgres (PGlite, in memory) and a fake GitHub.

const INSTALLATION = 1001;
const REPO: InstallationRepository = { id: 42, full_name: "octo/app", private: false, default_branch: "main" };

class FakeGitHub implements GitHubClient {
  files: PullFile[] = [
    {
      filename: "src/a.py",
      status: "modified",
      additions: 2,
      deletions: 0,
      patch: "@@ -1,1 +1,3 @@\n import os\n+x = 1\n+y = 2",
    },
    { filename: "docs/notes.md", status: "added", additions: 1, deletions: 0, patch: "@@ -0,0 +1 @@\n+hi" },
    { filename: "src/gone.py", status: "removed", additions: 0, deletions: 3 },
  ];
  checkRuns = new Map<number, CheckRunInput & { name: string; head_sha: string }>();
  checkUpdates: { id: number; input: CheckRunInput }[] = [];
  reviews: ReviewInput[] = [];
  dispatches: { fullName: string; file: string; ref: string; inputs: Record<string, string> }[] = [];
  dispatchError: Error | null = null;
  private nextId = 1;

  async listPullFiles() {
    return this.files;
  }
  async createCheckRun(_fullName: string, input: CheckRunInput & { name: string; head_sha: string }) {
    const id = this.nextId++;
    this.checkRuns.set(id, { ...input });
    return { id };
  }
  async updateCheckRun(_fullName: string, id: number, input: CheckRunInput) {
    this.checkUpdates.push({ id, input });
    this.checkRuns.set(id, {
      ...(this.checkRuns.get(id) as CheckRunInput & { name: string; head_sha: string }),
      ...input,
    });
  }
  async createReview(_fullName: string, _pr: number, input: ReviewInput) {
    this.reviews.push(input);
    return { id: 500 + this.reviews.length };
  }
  async dispatchWorkflow(fullName: string, file: string, ref: string, inputs: Record<string, string>) {
    if (this.dispatchError) throw this.dispatchError;
    this.dispatches.push({ fullName, file, ref, inputs });
  }
  async workflowExists() {
    return true;
  }
  async listRepositories() {
    return [REPO];
  }
  checkByName(name: string) {
    return [...this.checkRuns.values()].filter((c) => c.name === name);
  }
}

const claims: ActionsClaims = {
  repository: "octo/app",
  repositoryId: 42,
  ref: "refs/heads/main",
  eventName: "workflow_dispatch",
  runId: "777",
  workflowRef: "octo/app/.github/workflows/agent-pr.yml@refs/heads/main",
};

function prEvent(overrides: Partial<PullRequestEvent["pull_request"]> = {}, action = "opened"): PullRequestEvent {
  return {
    action,
    installation: { id: INSTALLATION },
    repository: { ...REPO, owner: { id: 9, login: "octo", type: "Organization", avatar_url: "" } },
    pull_request: {
      number: 7,
      title: "Add things",
      html_url: "https://github.com/octo/app/pull/7",
      state: "open",
      draft: false,
      user: { login: "dev" },
      head: { sha: "a".repeat(40), ref: "feature", repo: { full_name: "octo/app" } },
      base: { sha: "b".repeat(40), ref: "main", repo: { full_name: "octo/app" } },
      ...overrides,
    },
  };
}

const REPORT = {
  repo_path: "/home/runner/work/app/app",
  scanned_files: 2,
  slop_score: 30,
  grade: "C",
  issues: [
    {
      file_path: "/home/runner/work/app/app/src/a.py",
      line_start: 2,
      severity: "HIGH",
      rule_id: "slop/x",
      title: "In diff",
    },
    {
      file_path: "/home/runner/work/app/app/src/a.py",
      line_start: 40,
      severity: "LOW",
      rule_id: "slop/y",
      title: "Outside diff",
    },
  ],
};

let db: Db;
let github: FakeGitHub;
let deps: OrchestratorDeps;

beforeEach(async () => {
  db = await createTestDb();
  github = new FakeGitHub();
  deps = { db, github: () => github, appUrl: "https://agent-pr.test" };
  await syncInstallation(deps, {
    id: INSTALLATION,
    account: { id: 9, login: "octo", type: "Organization", avatar_url: "" },
    suspended_at: null,
  });
});

async function pipeline() {
  return db.select().from(schema.pipelineSteps).where(eq(schema.pipelineSteps.repositoryId, REPO.id));
}

async function stepsOf(runId: string) {
  return db.select().from(schema.runSteps).where(eq(schema.runSteps.runId, runId));
}

async function runRow(runId: string) {
  const [run] = await db.select().from(schema.runs).where(eq(schema.runs.id, runId));
  return run;
}

describe("installation sync", () => {
  it("stores the installation and repos and gives new repos a FixMySlop pipeline", async () => {
    const [installation] = await db.select().from(schema.installations);
    expect(installation.accountLogin).toBe("octo");
    const [repo] = await db.select().from(schema.repositories);
    expect(repo).toMatchObject({ fullName: "octo/app", defaultBranch: "main", enabled: true });
    const steps = await pipeline();
    expect(steps).toHaveLength(1);
    expect(steps[0]).toMatchObject({ stage: 1, blocking: false });

    // A second sync does not duplicate the default pipeline.
    await syncInstallation(deps, {
      id: INSTALLATION,
      account: { id: 9, login: "octo", type: "Organization", avatar_url: "" },
      suspended_at: null,
    });
    expect(await pipeline()).toHaveLength(1);
  });
});

describe("run lifecycle", () => {
  it("runs FixMySlop end to end: check run, dispatch, job, review, conclusion", async () => {
    const runId = await startRunForPullRequest(deps, prEvent());
    expect(runId).toBeTruthy();
    if (!runId) return;

    const [check] = github.checkByName("GitCrew / FixMySlop");
    expect(check).toMatchObject({ status: "queued", head_sha: "a".repeat(40) });
    expect(check.details_url).toBe(`https://agent-pr.test/dashboard/runs/${runId}`);
    expect(github.dispatches).toEqual([
      { fullName: "octo/app", file: "agent-pr.yml", ref: "main", inputs: { run_id: runId, stage: "1" } },
    ]);

    const job = await getStageJob(deps, runId, 1, claims);
    expect(job.pullRequest).toMatchObject({ number: 7, headSha: "a".repeat(40), isFork: false });
    expect(job.steps).toHaveLength(1);
    expect(job.steps[0]).toMatchObject({
      agent: "fixmyslop",
      files: ["src/a.py", "docs/notes.md"],
      config: { failOn: "high", maxComments: 30 },
      spec: { fixmyslopVersion: expect.any(String) },
    });
    expect(github.checkUpdates.at(-1)?.input.status).toBe("in_progress");

    const { conclusion } = await submitStepResult(deps, job.steps[0].stepId, { ok: true, output: REPORT }, claims);
    // A HIGH issue fails the agent, but the step is not blocking, so the check is neutral.
    expect(conclusion).toBe("neutral");

    expect(github.reviews).toHaveLength(1);
    expect(github.reviews[0].comments).toEqual([expect.objectContaining({ path: "src/a.py", line: 2, side: "RIGHT" })]);
    expect(github.reviews[0].body).toContain("`src/a.py:40`");

    const finalCheck = github.checkRuns.get(1);
    expect(finalCheck).toMatchObject({ status: "completed", conclusion: "neutral" });
    expect(finalCheck?.output?.title).toBe("Grade C · slop score 30 · 2 issues");

    const run = await runRow(runId);
    expect(run).toMatchObject({ status: "completed", conclusion: "success" });
    const [step] = await stepsOf(runId);
    expect(step).toMatchObject({ status: "completed", conclusion: "neutral", reviewId: 501 });
    expect(step.metrics).toMatchObject({ grade: "C", high: 1, low: 1 });

    // A second result for the same step is rejected and does not post another review.
    await expect(submitStepResult(deps, step.id, { ok: true, output: REPORT }, claims)).rejects.toMatchObject({
      status: 409,
    });
    expect(github.reviews).toHaveLength(1);
  });

  it("rejects runner tokens from another repo, another event or a non-default branch", async () => {
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    for (const bad of [
      { ...claims, repositoryId: 43 },
      { ...claims, eventName: "pull_request" },
      { ...claims, ref: "refs/heads/feature" },
    ]) {
      await expect(getStageJob(deps, runId, 1, bad)).rejects.toMatchObject({ status: 403 });
    }
    await expect(getStageJob(deps, runId, 1, claims)).resolves.toBeTruthy();
  });

  it("runs stages in order and stops after a blocking failure", async () => {
    const [first] = await pipeline();
    await db.update(schema.pipelineSteps).set({ blocking: true }).where(eq(schema.pipelineSteps.id, first.id));
    await db
      .insert(schema.pipelineSteps)
      .values({ repositoryId: REPO.id, agentId: first.agentId, stage: 2, blocking: true });

    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    expect(github.dispatches.map((d) => d.inputs.stage)).toEqual(["1"]);
    const job = await getStageJob(deps, runId, 1, claims);
    expect(job.steps).toHaveLength(1);

    await submitStepResult(deps, job.steps[0].stepId, { ok: true, output: REPORT }, claims);
    expect(github.dispatches).toHaveLength(1); // stage 2 never dispatched

    const steps = (await stepsOf(runId)).sort((a, b) => a.stage - b.stage);
    expect(steps[0]).toMatchObject({ status: "completed", conclusion: "failure" });
    expect(steps[1]).toMatchObject({ status: "skipped", conclusion: "skipped" });
    expect(steps[1].skipReason).toContain("blocking agent FixMySlop failed");
    expect(await runRow(runId)).toMatchObject({ status: "completed", conclusion: "failure" });
    const stage2Check = github.checkRuns.get(steps[1].checkRunId as number);
    expect(stage2Check).toMatchObject({ conclusion: "skipped" });
  });

  it("moves to the next stage when the first one passes", async () => {
    const [first] = await pipeline();
    await db.insert(schema.pipelineSteps).values({ repositoryId: REPO.id, agentId: first.agentId, stage: 2 });
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;

    const job1 = await getStageJob(deps, runId, 1, claims);
    await submitStepResult(deps, job1.steps[0].stepId, { ok: true, output: { ...REPORT, issues: [] } }, claims);
    expect(github.dispatches.map((d) => d.inputs.stage)).toEqual(["1", "2"]);

    const job2 = await getStageJob(deps, runId, 2, claims);
    await submitStepResult(deps, job2.steps[0].stepId, { ok: true, output: { ...REPORT, issues: [] } }, claims);
    expect(await runRow(runId)).toMatchObject({ status: "completed", conclusion: "success" });
    expect(github.reviews).toHaveLength(0); // clean scans do not post reviews
  });

  it("cancels the previous run when new commits are pushed", async () => {
    const firstRun = (await startRunForPullRequest(deps, prEvent())) as string;
    const secondRun = (await startRunForPullRequest(
      deps,
      prEvent({ head: { sha: "c".repeat(40), ref: "feature", repo: { full_name: "octo/app" } } }, "synchronize"),
    )) as string;

    expect(await runRow(firstRun)).toMatchObject({ status: "cancelled", conclusion: "cancelled" });
    expect(github.checkRuns.get(1)).toMatchObject({ conclusion: "cancelled" });
    expect(await runRow(secondRun)).toMatchObject({ status: "running", trigger: "pull_request.synchronize" });
    await expect(getStageJob(deps, firstRun, 1, claims)).rejects.toMatchObject({ status: 409 });
  });

  it("explains a missing workflow file instead of hanging", async () => {
    github.dispatchError = new GitHubApiError(404, "POST", "/dispatches", "Not Found");
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    const [step] = await stepsOf(runId);
    expect(step).toMatchObject({ status: "completed", conclusion: "neutral" });
    expect(step.summary).toContain(".github/workflows/agent-pr.yml");
    expect(await runRow(runId)).toMatchObject({ status: "completed" });
  });

  it("skips steps whose rules do not match, and skips drafts by default", async () => {
    const [first] = await pipeline();
    await db
      .update(schema.pipelineSteps)
      .set({ includePaths: ["lib/**"] })
      .where(eq(schema.pipelineSteps.id, first.id));
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    const [step] = await stepsOf(runId);
    expect(step).toMatchObject({ status: "skipped", skipReason: "No changed files match lib/**" });
    expect(github.dispatches).toHaveLength(0);
    expect(github.checkRuns.size).toBe(0); // non-blocking skipped steps stay quiet
    expect(await runRow(runId)).toMatchObject({ status: "completed", conclusion: "skipped" });

    await db.update(schema.pipelineSteps).set({ includePaths: [] }).where(eq(schema.pipelineSteps.id, first.id));
    const draftRun = (await startRunForPullRequest(deps, prEvent({ draft: true }))) as string;
    const [draftStep] = await stepsOf(draftRun);
    expect(draftStep.skipReason).toContain("Draft");
  });

  it("marks fork PRs and ignores disabled repos and closed PRs", async () => {
    const forkRun = (await startRunForPullRequest(
      deps,
      prEvent({ head: { sha: "d".repeat(40), ref: "patch-1", repo: { full_name: "someone/app" } } }),
    )) as string;
    expect(await runRow(forkRun)).toMatchObject({ isFork: true });

    expect(await startRunForPullRequest(deps, prEvent({}, "closed"))).toBeNull();
    expect(await runRow(forkRun)).toMatchObject({ status: "cancelled" });

    await db.update(schema.repositories).set({ enabled: false });
    expect(await startRunForPullRequest(deps, prEvent())).toBeNull();
  });

  it("fails unfinished steps when the runner reports a crash", async () => {
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    await getStageJob(deps, runId, 1, claims);
    const { failed } = await failStage(deps, runId, 1, "Runner job failed", claims);
    expect(failed).toBe(1);
    const [step] = await stepsOf(runId);
    expect(step).toMatchObject({ status: "completed", conclusion: "neutral", summary: "Runner job failed" });
  });

  it("records a bad agent output as a failed step", async () => {
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    const job = await getStageJob(deps, runId, 1, claims);
    await submitStepResult(deps, job.steps[0].stepId, { ok: true, output: { issues: "nope" } }, claims);
    const [step] = await stepsOf(runId);
    expect(step.summary).toContain("Could not read the agent output");
  });

  it("can be cancelled from the dashboard", async () => {
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    expect(await cancelRun(deps, runId, "Cancelled by dev")).toBe(true);
    expect(await cancelRun(deps, runId, "again")).toBe(false);
    expect(await runRow(runId)).toMatchObject({ status: "cancelled", error: "Cancelled by dev" });
  });

  it("uses RunnerRequestError for unknown ids", async () => {
    await expect(getStageJob(deps, "00000000-0000-0000-0000-000000000000", 1, claims)).rejects.toBeInstanceOf(
      RunnerRequestError,
    );
  });
});
