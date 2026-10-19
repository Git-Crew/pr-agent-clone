import { NextResponse } from "next/server";

import { z } from "zod";

import { failStage, getStageJob, RunnerRequestError } from "@/lib/pipeline/orchestrator";
import { getOrchestratorDeps } from "@/lib/server/deps";
import { authenticateRunner, runnerErrorResponse } from "@/lib/server/runner-auth";

type Context = { params: Promise<{ runId: string; stage: string }> };

const paramsSchema = z.object({ runId: z.uuid(), stage: z.coerce.number().int().min(1).max(100) });

async function parseParams(context: Context) {
  const parsed = paramsSchema.safeParse(await context.params);
  if (!parsed.success) throw new RunnerRequestError(400, "Invalid run id or stage");
  return parsed.data;
}

/** The runner fetches the steps of one stage: which agents, their config and the files to scan. */
export async function GET(request: Request, context: Context) {
  try {
    const { runId, stage } = await parseParams(context);
    const claims = await authenticateRunner(request);
    return NextResponse.json(await getStageJob(await getOrchestratorDeps(), runId, stage, claims));
  } catch (error) {
    return runnerErrorResponse(error);
  }
}

const failSchema = z.object({ error: z.string().max(5_000).default("The Agent PR workflow failed") });

/** The runner's `if: failure()` step: fail every step of the stage that never reported. */
export async function POST(request: Request, context: Context) {
  try {
    const { runId, stage } = await parseParams(context);
    const claims = await authenticateRunner(request);
    const body = failSchema.parse(await request.json().catch(() => ({})));
    return NextResponse.json(await failStage(await getOrchestratorDeps(), runId, stage, body.error, claims));
  } catch (error) {
    return runnerErrorResponse(error);
  }
}
