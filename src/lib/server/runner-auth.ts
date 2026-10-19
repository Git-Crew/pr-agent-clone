import "server-only";

import { NextResponse } from "next/server";

import { getAppUrl } from "@/lib/env";
import { type ActionsClaims, bearerToken, OidcError, verifyActionsToken } from "@/lib/github/oidc";
import { RunnerRequestError } from "@/lib/pipeline/orchestrator";

/** Authenticate a call from agent-pr.yml by its GitHub Actions OIDC token (audience = APP_URL). */
export async function authenticateRunner(request: Request): Promise<ActionsClaims> {
  const token = bearerToken(request.headers.get("authorization"));
  if (!token) throw new RunnerRequestError(401, "Missing bearer token");
  try {
    return await verifyActionsToken(token, getAppUrl());
  } catch (error) {
    if (error instanceof OidcError) throw new RunnerRequestError(401, error.message);
    throw error;
  }
}

export function runnerErrorResponse(error: unknown) {
  if (error instanceof RunnerRequestError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("Runner request failed", error);
  return NextResponse.json({ error: "Internal error" }, { status: 500 });
}
