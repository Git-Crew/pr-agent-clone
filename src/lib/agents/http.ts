import { signBody } from "@/lib/github/webhook";

import { toAgentResult } from "./adapters";
import type { AgentRequest, AgentResult } from "./contract";

// Calling an agent someone hosts themselves. We POST an AgentRequest signed with the agent's secret:
//   X-GitCrew-Signature: sha256=<HMAC-SHA256 of the raw body>
// The agent answers 200 with its findings (AgentResult JSON, SARIF or text), or 202 and POSTs them later to
// request.callbackUrl, signed the same way. See docs/CONNECT-AN-AGENT.md.

export const SIGNATURE_HEADER = "X-GitCrew-Signature";
const TIMEOUT_MS = 25_000;
const MAX_REPLY_BYTES = 2_000_000;

export class UnsafeUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsafeUrlError";
  }
}

const PRIVATE_V4 = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^0\./,
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./,
];

/**
 * Only public HTTPS endpoints: agent URLs are typed in by users and fetched by our server, so block localhost,
 * private networks and cloud metadata addresses. In development, http://localhost is allowed for testing.
 */
export function assertAgentUrl(raw: string, env: NodeJS.ProcessEnv = process.env): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new UnsafeUrlError("That is not a valid URL");
  }
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  const local = host === "localhost" || host === "127.0.0.1" || host === "::1" || host.endsWith(".localhost");
  if (local && env.NODE_ENV === "development" && url.protocol === "http:") return url;
  if (url.protocol !== "https:") throw new UnsafeUrlError("The agent URL must start with https://");
  if (url.username || url.password) throw new UnsafeUrlError("The agent URL must not contain a username or password");
  if (local || host.endsWith(".internal") || host.endsWith(".local")) {
    throw new UnsafeUrlError("The agent URL must be reachable on the public internet");
  }
  if (PRIVATE_V4.some((range) => range.test(host)) || host.includes(":")) {
    throw new UnsafeUrlError("Use the agent's public hostname, not an IP address");
  }
  return url;
}

export type HttpAgentOutcome =
  | { kind: "result"; status: number; result: AgentResult }
  | { kind: "accepted"; status: number }
  | { kind: "error"; status: number | null; error: string };

export async function callHttpAgent(
  params: { url: string; secret: string; agentName: string; request: AgentRequest },
  fetchImpl: typeof fetch = fetch,
): Promise<HttpAgentOutcome> {
  let url: URL;
  try {
    url = assertAgentUrl(params.url);
  } catch (error) {
    return { kind: "error", status: null, error: (error as Error).message };
  }
  const body = JSON.stringify(params.request);
  let res: Response;
  try {
    res = await fetchImpl(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "GitCrew",
        [SIGNATURE_HEADER]: signBody(params.secret, body),
      },
      body,
      redirect: "error",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    const reason =
      (error as Error).name === "TimeoutError" ? "did not answer within 25 seconds" : (error as Error).message;
    return { kind: "error", status: null, error: `Could not reach the agent: ${reason}` };
  }

  if (res.status === 202) return { kind: "accepted", status: 202 };
  const text = (await res.text()).slice(0, MAX_REPLY_BYTES);
  if (!res.ok) {
    return { kind: "error", status: res.status, error: `The agent answered ${res.status}: ${text.slice(0, 300)}` };
  }
  try {
    return {
      kind: "result",
      status: res.status,
      result: toAgentResult(text, params.agentName, res.headers.get("content-type") ?? ""),
    };
  } catch (error) {
    return { kind: "error", status: res.status, error: (error as Error).message };
  }
}

/** A realistic request for the "Send a test request" button and for agent authors' local testing. */
export function sampleAgentRequest(appUrl: string): AgentRequest {
  return {
    version: 1,
    runId: "00000000-0000-0000-0000-000000000000",
    stepId: "00000000-0000-0000-0000-000000000001",
    agent: { slug: "test", config: {} },
    repository: { id: 1, fullName: "octo/example", defaultBranch: "main", private: false },
    pullRequest: {
      number: 1,
      title: "Test request from GitCrew",
      url: "https://github.com/octo/example/pull/1",
      author: "octocat",
      headSha: "0".repeat(40),
      baseSha: "1".repeat(40),
      headRef: "feature",
      baseRef: "main",
      isFork: false,
    },
    changedFiles: [
      {
        path: "src/app.ts",
        status: "modified",
        additions: 2,
        deletions: 0,
        patch: "@@ -1,1 +1,3 @@\n export function greet(name) {\n+  console.log(name);\n+  return name.trim();",
      },
    ],
    callbackUrl: `${appUrl}/api/agents/steps/00000000-0000-0000-0000-000000000001/result`,
  };
}
