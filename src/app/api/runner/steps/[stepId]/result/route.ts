import { NextResponse } from "next/server";

import { z } from "zod";

import { RunnerRequestError, submitStepResult } from "@/lib/pipeline/orchestrator";
import { getOrchestratorDeps } from "@/lib/server/deps";
import { authenticateRunner, runnerErrorResponse } from "@/lib/server/runner-auth";

export const maxDuration = 60;

type Context = { params: Promise<{ stepId: string }> };

const bodySchema = z.object({
  ok: z.boolean(),
  output: z.unknown().optional(),
  error: z.string().max(5_000).optional(),
});

/** The runner posts one agent's raw output (e.g. the FixMySlop JSON report) for one step. */
export async function POST(request: Request, context: Context) {
  try {
    const { stepId } = await context.params;
    if (!z.uuid().safeParse(stepId).success) throw new RunnerRequestError(400, "Invalid step id");
    const claims = await authenticateRunner(request);
    const parsed = bodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) throw new RunnerRequestError(400, "Body must be { ok, output?, error? }");
    return NextResponse.json(await submitStepResult(await getOrchestratorDeps(), stepId, parsed.data, claims));
  } catch (error) {
    return runnerErrorResponse(error);
  }
}
