import { NextResponse } from "next/server";

import { z } from "zod";

import { SIGNATURE_HEADER } from "@/lib/agents/http";
import { RunnerRequestError, submitWorkerResult } from "@/lib/pipeline/orchestrator";
import { getOrchestratorDeps } from "@/lib/server/deps";
import { runnerErrorResponse } from "@/lib/server/runner-auth";

export const maxDuration = 60;

type Context = { params: Promise<{ stepId: string }> };

/** The gitcrew-worker posts an AgentResult here after the sandbox exits. */
export async function POST(request: Request, context: Context) {
  try {
    const { stepId } = await context.params;
    if (!z.uuid().safeParse(stepId).success) throw new RunnerRequestError(400, "Invalid step id");
    const rawBody = await request.text();
    if (rawBody.length > 2_000_000) throw new RunnerRequestError(413, "Result is larger than 2 MB");
    return NextResponse.json(
      await submitWorkerResult(await getOrchestratorDeps(), stepId, rawBody, request.headers.get(SIGNATURE_HEADER)),
    );
  } catch (error) {
    return runnerErrorResponse(error);
  }
}
