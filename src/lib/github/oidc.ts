import { createRemoteJWKSet, type JWTVerifyGetKey, jwtVerify } from "jose";

// The agent-pr.yml workflow authenticates to us with its GitHub Actions OIDC token, so users never store a
// shared secret in their repo. https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect

export const ACTIONS_OIDC_ISSUER = "https://token.actions.githubusercontent.com";

let remoteJwks: JWTVerifyGetKey | null = null;

function githubJwks(): JWTVerifyGetKey {
  remoteJwks ??= createRemoteJWKSet(new URL(`${ACTIONS_OIDC_ISSUER}/.well-known/jwks`));
  return remoteJwks;
}

export type ActionsClaims = {
  repository: string;
  repositoryId: number;
  ref: string;
  eventName: string;
  runId: string;
  workflowRef: string;
};

export class OidcError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OidcError";
  }
}

export async function verifyActionsToken(
  token: string,
  audience: string,
  keys: JWTVerifyGetKey = githubJwks(),
): Promise<ActionsClaims> {
  let payload: Record<string, unknown>;
  try {
    ({ payload } = await jwtVerify(token, keys, { issuer: ACTIONS_OIDC_ISSUER, audience, algorithms: ["RS256"] }));
  } catch (error) {
    throw new OidcError(`Invalid GitHub Actions token: ${(error as Error).message}`);
  }
  const repositoryId = Number(payload.repository_id);
  if (typeof payload.repository !== "string" || !Number.isSafeInteger(repositoryId)) {
    throw new OidcError("GitHub Actions token is missing repository claims");
  }
  return {
    repository: payload.repository,
    repositoryId,
    ref: String(payload.ref ?? ""),
    eventName: String(payload.event_name ?? ""),
    runId: String(payload.run_id ?? ""),
    workflowRef: String(payload.workflow_ref ?? ""),
  };
}

/** Pull the bearer token out of an Authorization header. */
export function bearerToken(header: string | null): string | null {
  const match = header?.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}
