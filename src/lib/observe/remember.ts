import { and, eq, gte, inArray } from "drizzle-orm";

import { agentPhases, repositories } from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";

import type { PhaseNote } from "./phase";
import { shipPhaseTrace } from "./trace";

/** Store a finished phase, then try to ship its trace. Failures stay inside this function. */
export async function rememberPhase(db: Db, note: PhaseNote): Promise<boolean> {
  try {
    const repositoryId = await repositoryIdFor(db, note.repository);
    await db.insert(agentPhases).values({
      runId: note.runId,
      stepId: note.stepId,
      repositoryId,
      agentSlug: note.agentSlug,
      agentName: note.agentName,
      phase: note.phase,
      outcome: note.outcome,
      model: note.model,
      inputTokens: note.inputTokens,
      outputTokens: note.outputTokens,
      durationMs: note.durationMs,
    });
  } catch {
    return false;
  }
  void shipPhaseTrace(note);
  return true;
}

async function repositoryIdFor(db: Db, fullName: string): Promise<number> {
  const [repo] = await db
    .select({ id: repositories.id })
    .from(repositories)
    .where(eq(repositories.fullName, fullName))
    .limit(1);
  if (!repo) throw new Error(`Unknown repository ${fullName}`);
  return repo.id;
}

/** Phases in the window. Pass installation ids to keep the dashboard inside the signed-in user's accounts. */
export async function phasesSince(db: Db, since: Date, installationIds?: number[]): Promise<PhaseNote[]> {
  if (installationIds && installationIds.length === 0) return [];
  const rows = await db
    .select({
      phase: agentPhases,
      fullName: repositories.fullName,
    })
    .from(agentPhases)
    .innerJoin(repositories, eq(repositories.id, agentPhases.repositoryId))
    .where(
      and(
        gte(agentPhases.createdAt, since),
        installationIds ? inArray(repositories.installationId, installationIds) : undefined,
      ),
    );
  return rows.map((row) => ({
    agentSlug: row.phase.agentSlug,
    agentName: row.phase.agentName,
    phase: row.phase.phase,
    outcome: row.phase.outcome,
    model: row.phase.model ?? undefined,
    inputTokens: row.phase.inputTokens,
    outputTokens: row.phase.outputTokens,
    durationMs: row.phase.durationMs,
    runId: row.phase.runId,
    stepId: row.phase.stepId ?? undefined,
    repository: row.fullName,
  }));
}

export type AgentUsage = {
  slug: string;
  name: string;
  phases: number;
  failed: number;
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
};

export type UsageSummary = {
  phases: number;
  failed: number;
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
  agents: AgentUsage[];
};

/** Roll notes up per agent for the usage page. */
export function summarizePhases(notes: PhaseNote[]): UsageSummary {
  const agents = new Map<string, AgentUsage>();
  for (const note of notes) {
    const current = agents.get(note.agentSlug) ?? {
      slug: note.agentSlug,
      name: note.agentName,
      phases: 0,
      failed: 0,
      inputTokens: 0,
      outputTokens: 0,
      durationMs: 0,
    };
    current.phases += 1;
    if (note.outcome === "failed") current.failed += 1;
    current.inputTokens += note.inputTokens;
    current.outputTokens += note.outputTokens;
    current.durationMs += note.durationMs;
    agents.set(note.agentSlug, current);
  }
  const list = [...agents.values()].sort((a, b) => b.phases - a.phases || a.name.localeCompare(b.name));
  return {
    phases: list.reduce((sum, agent) => sum + agent.phases, 0),
    failed: list.reduce((sum, agent) => sum + agent.failed, 0),
    inputTokens: list.reduce((sum, agent) => sum + agent.inputTokens, 0),
    outputTokens: list.reduce((sum, agent) => sum + agent.outputTokens, 0),
    durationMs: list.reduce((sum, agent) => sum + agent.durationMs, 0),
    agents: list,
  };
}

export async function usageSummary(db: Db, installationIds: number[], since: Date): Promise<UsageSummary> {
  return summarizePhases(await phasesSince(db, since, installationIds));
}
