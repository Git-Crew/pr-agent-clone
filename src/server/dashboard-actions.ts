"use server";

import { revalidatePath } from "next/cache";

import { and, eq, inArray, isNull, or } from "drizzle-orm";
import { z } from "zod";

import { resolveAgentConfig } from "@/lib/agents/registry";
import { encryptSecret } from "@/lib/crypto/secrets";
import { getInstallationIds, getRepo, requireUser } from "@/lib/db/dashboard";
import { db } from "@/lib/db/drizzle";
import { agents, pipelineSteps, repositories, runs, secrets } from "@/lib/db/schema";
import { cancelRun } from "@/lib/pipeline/orchestrator";
import { type PipelineStepInput, pipelineInputSchema, secretInputSchema } from "@/lib/pipeline/schema";
import { getOrchestratorDeps } from "@/lib/server/deps";

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string };

function fail(error: unknown): ActionResult {
  if (error instanceof z.ZodError) return { ok: false, error: error.issues[0]?.message ?? "Invalid input" };
  return { ok: false, error: error instanceof Error ? error.message : "Something went wrong" };
}

async function accessibleAgentIds(installationIds: number[]) {
  const rows = await db
    .select({ id: agents.id, slug: agents.slug })
    .from(agents)
    .where(
      installationIds.length
        ? or(isNull(agents.installationId), inArray(agents.installationId, installationIds))
        : isNull(agents.installationId),
    );
  return new Map(rows.map((r) => [r.id, r.slug]));
}

/** Validate agent access and agent config, then shape rows for one repo. */
async function toPipelineRows(installationIds: number[], repositoryId: number, steps: PipelineStepInput[]) {
  const allowed = await accessibleAgentIds(installationIds);
  return steps.map((step, index) => {
    const slug = allowed.get(step.agentId);
    if (!slug) throw new Error("Unknown agent");
    return {
      ...step,
      repositoryId,
      position: index,
      config: resolveAgentConfig(slug, step.config),
    };
  });
}

export async function setRepoEnabled(repoId: number, enabled: boolean): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const repo = await getRepo(user.id, repoId);
    if (!repo) return { ok: false, error: "Repository not found" };
    await db.update(repositories).set({ enabled, updatedAt: new Date() }).where(eq(repositories.id, repo.id));
    revalidatePath("/dashboard/repos");
    return { ok: true, message: `${repo.fullName} ${enabled ? "enabled" : "paused"}` };
  } catch (error) {
    return fail(error);
  }
}

export async function savePipeline(repoId: number, input: unknown): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const repo = await getRepo(user.id, repoId);
    if (!repo) return { ok: false, error: "Repository not found" };
    const steps = pipelineInputSchema.parse(input);
    const rows = await toPipelineRows(await getInstallationIds(user.id), repo.id, steps);
    await db.transaction(async (tx) => {
      await tx.delete(pipelineSteps).where(eq(pipelineSteps.repositoryId, repo.id));
      if (rows.length) await tx.insert(pipelineSteps).values(rows);
    });
    revalidatePath(`/dashboard/repos/${repo.id}`);
    revalidatePath("/dashboard/repos");
    return { ok: true, message: "Pipeline saved. It applies to the next PR event." };
  } catch (error) {
    return fail(error);
  }
}

/** Fleet rollout: copy one repo's pipeline to many repos. */
export async function applyPipelineToRepos(sourceRepoId: number, targetRepoIds: number[]): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const installationIds = await getInstallationIds(user.id);
    const source = await getRepo(user.id, sourceRepoId);
    if (!source) return { ok: false, error: "Source repository not found" };
    const targets = z
      .array(z.number().int())
      .max(500)
      .parse(targetRepoIds)
      .filter((id) => id !== source.id);
    if (targets.length === 0) return { ok: false, error: "Pick at least one other repository" };
    const accessible = await db
      .select({ id: repositories.id })
      .from(repositories)
      .where(and(inArray(repositories.id, targets), inArray(repositories.installationId, installationIds)));
    if (accessible.length !== targets.length) return { ok: false, error: "Some repositories are not accessible" };

    const sourceSteps = await db
      .select()
      .from(pipelineSteps)
      .where(eq(pipelineSteps.repositoryId, source.id))
      .orderBy(pipelineSteps.stage, pipelineSteps.position);
    await db.transaction(async (tx) => {
      await tx.delete(pipelineSteps).where(inArray(pipelineSteps.repositoryId, targets));
      for (const repositoryId of targets) {
        if (sourceSteps.length === 0) continue;
        await tx
          .insert(pipelineSteps)
          .values(sourceSteps.map(({ id: _id, createdAt: _c, updatedAt: _u, ...step }) => ({ ...step, repositoryId })));
      }
    });
    revalidatePath("/dashboard/repos");
    return { ok: true, message: `Pipeline from ${source.fullName} applied to ${targets.length} repositories` };
  } catch (error) {
    return fail(error);
  }
}

export async function cancelRunAction(runId: string): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const installationIds = await getInstallationIds(user.id);
    const [run] = await db
      .select({ id: runs.id })
      .from(runs)
      .innerJoin(repositories, eq(repositories.id, runs.repositoryId))
      .where(and(eq(runs.id, z.uuid().parse(runId)), inArray(repositories.installationId, installationIds)))
      .limit(1);
    if (!run) return { ok: false, error: "Run not found" };
    const cancelled = await cancelRun(
      await getOrchestratorDeps(),
      run.id,
      `Cancelled by ${user.githubLogin ?? user.email}`,
    );
    revalidatePath(`/dashboard/runs/${run.id}`);
    return cancelled ? { ok: true, message: "Run cancelled" } : { ok: false, error: "Run already finished" };
  } catch (error) {
    return fail(error);
  }
}

export async function saveSecret(input: unknown): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const data = secretInputSchema.parse(input);
    const installationIds = await getInstallationIds(user.id);
    if (!installationIds.includes(data.installationId)) return { ok: false, error: "Installation not found" };
    if (data.repositoryId !== null) {
      const repo = await getRepo(user.id, data.repositoryId);
      if (repo?.installationId !== data.installationId) return { ok: false, error: "Repository not found" };
    }
    const value = encryptSecret(data.value);
    await db
      .insert(secrets)
      .values({ ...data, value })
      .onConflictDoUpdate({
        target: [secrets.installationId, secrets.repositoryId, secrets.name],
        set: { value, updatedAt: new Date() },
      });
    revalidatePath("/dashboard/settings");
    return { ok: true, message: `${data.name} saved` };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteSecret(secretId: string): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const installationIds = await getInstallationIds(user.id);
    if (installationIds.length === 0) return { ok: false, error: "Secret not found" };
    const deleted = await db
      .delete(secrets)
      .where(and(eq(secrets.id, z.uuid().parse(secretId)), inArray(secrets.installationId, installationIds)))
      .returning({ name: secrets.name });
    revalidatePath("/dashboard/settings");
    return deleted.length
      ? { ok: true, message: `${deleted[0].name} deleted` }
      : { ok: false, error: "Secret not found" };
  } catch (error) {
    return fail(error);
  }
}
