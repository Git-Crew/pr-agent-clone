import "server-only";

import { redirect } from "next/navigation";

import { and, asc, count, desc, eq, gte, inArray, isNull, or, type SQL } from "drizzle-orm";

import { db } from "./drizzle";
import { getUser } from "./queries";
import {
  agents,
  installationMembers,
  installations,
  pipelineSteps,
  type RunStatus,
  repositories,
  runLogs,
  runSteps,
  runs,
  secrets,
} from "./schema";

// Dashboard reads. Every query is scoped to the installations the signed-in user is a member of.

export async function requireUser() {
  const user = await getUser().catch(() => null);
  if (!user) redirect("/auth/v1/login");
  return user;
}

export async function getInstallationIds(userId: number): Promise<number[]> {
  const rows = await db
    .select({ id: installationMembers.installationId })
    .from(installationMembers)
    .innerJoin(installations, eq(installations.id, installationMembers.installationId))
    .where(and(eq(installationMembers.userId, userId), isNull(installations.deletedAt)));
  return rows.map((r) => r.id);
}

export async function listInstallations(userId: number) {
  const ids = await getInstallationIds(userId);
  if (ids.length === 0) return [];
  const rows = await db
    .select({ installation: installations, repoCount: count(repositories.id) })
    .from(installations)
    .leftJoin(repositories, and(eq(repositories.installationId, installations.id), isNull(repositories.removedAt)))
    .where(inArray(installations.id, ids))
    .groupBy(installations.id)
    .orderBy(asc(installations.accountLogin));
  return rows.map((r) => ({ ...r.installation, repoCount: Number(r.repoCount) }));
}

export type RepoListItem = Awaited<ReturnType<typeof listRepos>>[number];

export async function listRepos(userId: number) {
  const ids = await getInstallationIds(userId);
  if (ids.length === 0) return [];
  const repos = await db
    .select({ repo: repositories, accountLogin: installations.accountLogin })
    .from(repositories)
    .innerJoin(installations, eq(installations.id, repositories.installationId))
    .where(and(inArray(repositories.installationId, ids), isNull(repositories.removedAt)))
    .orderBy(asc(repositories.fullName));
  if (repos.length === 0) return [];
  const repoIds = repos.map((r) => r.repo.id);

  const steps = await db
    .select({
      id: pipelineSteps.id,
      repositoryId: pipelineSteps.repositoryId,
      stage: pipelineSteps.stage,
      enabled: pipelineSteps.enabled,
      blocking: pipelineSteps.blocking,
      agentName: agents.name,
    })
    .from(pipelineSteps)
    .innerJoin(agents, eq(agents.id, pipelineSteps.agentId))
    .where(inArray(pipelineSteps.repositoryId, repoIds))
    .orderBy(asc(pipelineSteps.stage), asc(pipelineSteps.position));

  const latestRuns = await db
    .selectDistinctOn([runs.repositoryId], {
      repositoryId: runs.repositoryId,
      id: runs.id,
      status: runs.status,
      conclusion: runs.conclusion,
      prNumber: runs.prNumber,
      createdAt: runs.createdAt,
    })
    .from(runs)
    .where(inArray(runs.repositoryId, repoIds))
    .orderBy(runs.repositoryId, desc(runs.createdAt));

  return repos.map(({ repo, accountLogin }) => ({
    ...repo,
    accountLogin,
    steps: steps.filter((s) => s.repositoryId === repo.id),
    lastRun: latestRuns.find((r) => r.repositoryId === repo.id) ?? null,
  }));
}

/** A repo the user can access, or null. */
export async function getRepo(userId: number, repoId: number) {
  const ids = await getInstallationIds(userId);
  if (ids.length === 0 || !Number.isSafeInteger(repoId)) return null;
  const [repo] = await db
    .select()
    .from(repositories)
    .where(and(eq(repositories.id, repoId), inArray(repositories.installationId, ids)))
    .limit(1);
  return repo ?? null;
}

export async function getPipeline(repoId: number) {
  return db
    .select({ step: pipelineSteps, agent: agents })
    .from(pipelineSteps)
    .innerJoin(agents, eq(agents.id, pipelineSteps.agentId))
    .where(eq(pipelineSteps.repositoryId, repoId))
    .orderBy(asc(pipelineSteps.stage), asc(pipelineSteps.position));
}

/** Built-in agents plus agents registered by the user's installations. */
export async function listAgents(userId: number) {
  const ids = await getInstallationIds(userId);
  return db
    .select()
    .from(agents)
    .where(
      ids.length
        ? or(isNull(agents.installationId), inArray(agents.installationId, ids))
        : isNull(agents.installationId),
    )
    .orderBy(asc(agents.name));
}

export type RunFilters = { status?: RunStatus; repoId?: number; limit?: number; offset?: number };

export async function listRuns(userId: number, filters: RunFilters = {}) {
  const ids = await getInstallationIds(userId);
  if (ids.length === 0) return { runs: [], total: 0 };
  const conditions: SQL[] = [inArray(repositories.installationId, ids)];
  if (filters.status) conditions.push(eq(runs.status, filters.status));
  if (filters.repoId) conditions.push(eq(runs.repositoryId, filters.repoId));
  const where = and(...conditions);

  const [rows, [{ total }]] = await Promise.all([
    db
      .select({ run: runs, repoFullName: repositories.fullName })
      .from(runs)
      .innerJoin(repositories, eq(repositories.id, runs.repositoryId))
      .where(where)
      .orderBy(desc(runs.createdAt))
      .limit(filters.limit ?? 25)
      .offset(filters.offset ?? 0),
    db
      .select({ total: count() })
      .from(runs)
      .innerJoin(repositories, eq(repositories.id, runs.repositoryId))
      .where(where),
  ]);
  if (rows.length === 0) return { runs: [], total: Number(total) };

  const steps = await db
    .select({
      id: runSteps.id,
      runId: runSteps.runId,
      agentName: runSteps.agentName,
      status: runSteps.status,
      conclusion: runSteps.conclusion,
      metrics: runSteps.metrics,
    })
    .from(runSteps)
    .where(
      inArray(
        runSteps.runId,
        rows.map((r) => r.run.id),
      ),
    )
    .orderBy(asc(runSteps.stage));

  return {
    total: Number(total),
    runs: rows.map(({ run, repoFullName }) => ({
      ...run,
      repoFullName,
      steps: steps.filter((s) => s.runId === run.id),
    })),
  };
}

export async function getRun(userId: number, runId: string) {
  const ids = await getInstallationIds(userId);
  if (ids.length === 0) return null;
  const [row] = await db
    .select({ run: runs, repo: repositories })
    .from(runs)
    .innerJoin(repositories, eq(repositories.id, runs.repositoryId))
    .where(and(eq(runs.id, runId), inArray(repositories.installationId, ids)))
    .limit(1);
  if (!row) return null;
  const [steps, logs] = await Promise.all([
    db.select().from(runSteps).where(eq(runSteps.runId, runId)).orderBy(asc(runSteps.stage), asc(runSteps.createdAt)),
    db.select().from(runLogs).where(eq(runLogs.runId, runId)).orderBy(asc(runLogs.id)).limit(500),
  ]);
  return { ...row, steps, logs };
}

export async function getOverviewStats(userId: number) {
  const ids = await getInstallationIds(userId);
  if (ids.length === 0) return { activeRepos: 0, runs7d: 0, passRate: null as number | null, failing7d: 0 };
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [[repoRow], recent] = await Promise.all([
    db
      .select({ value: count() })
      .from(repositories)
      .where(
        and(inArray(repositories.installationId, ids), isNull(repositories.removedAt), eq(repositories.enabled, true)),
      ),
    db
      .select({ conclusion: runs.conclusion })
      .from(runs)
      .innerJoin(repositories, eq(repositories.id, runs.repositoryId))
      .where(and(inArray(repositories.installationId, ids), gte(runs.createdAt, since), eq(runs.status, "completed"))),
  ]);
  const decided = recent.filter((r) => r.conclusion === "success" || r.conclusion === "failure");
  const failing = decided.filter((r) => r.conclusion === "failure").length;
  return {
    activeRepos: Number(repoRow.value),
    runs7d: recent.length,
    passRate: decided.length ? Math.round(((decided.length - failing) / decided.length) * 100) : null,
    failing7d: failing,
  };
}

export async function listSecrets(userId: number) {
  const ids = await getInstallationIds(userId);
  if (ids.length === 0) return [];
  return db
    .select({
      id: secrets.id,
      name: secrets.name,
      installationId: secrets.installationId,
      accountLogin: installations.accountLogin,
      repositoryId: secrets.repositoryId,
      repoFullName: repositories.fullName,
      updatedAt: secrets.updatedAt,
    })
    .from(secrets)
    .innerJoin(installations, eq(installations.id, secrets.installationId))
    .leftJoin(repositories, eq(repositories.id, secrets.repositoryId))
    .where(inArray(secrets.installationId, ids))
    .orderBy(asc(installations.accountLogin), asc(secrets.name));
}
