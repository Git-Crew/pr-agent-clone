import { NextResponse } from "next/server";

import { z } from "zod";

import { SIGNATURE_HEADER } from "@/lib/agents/http";
import { RunnerRequestError, submitAgentCallback } from "@/lib/pipeline/orchestrator";
import { getOrchestratorDeps } from "@/lib/server/deps";
import { runnerErrorResponse } from "@/lib/server/runner-auth";

export const maxDuration = 60;

type Context = { params: Promise<{ stepId: string }> };

/**
 * Where an HTTP agent that answered 202 posts its findings: AgentResult JSON, SARIF or text, signed with
 * X-GitCrew-Signature: sha256=<HMAC of the raw body with the agent's secret>.
 */
export async function POST(request: Request, context: Context) {
  try {
    const { stepId } = await context.params;
    if (!z.uuid().safeParse(stepId).success) throw new RunnerRequestError(400, "Invalid step id");
    const rawBody = await request.text();
    if (rawBody.length > 2_000_000) throw new RunnerRequestError(413, "Result is larger than 2 MB");
    return NextResponse.json(
      await submitAgentCallback(
        await getOrchestratorDeps(),
        stepId,
        rawBody,
        request.headers.get(SIGNATURE_HEADER),
        request.headers.get("content-type") ?? "",
      ),
    );
  } catch (error) {
    return runnerErrorResponse(error);
  }
}
