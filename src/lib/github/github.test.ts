import { createLocalJWKSet, exportJWK, generateKeyPair, jwtVerify, SignJWT } from "jose";
import { describe, expect, it, vi } from "vitest";

import { createAppJwt, GitHubApiError, InstallationClient } from "./client";
import { ACTIONS_OIDC_ISSUER, bearerToken, OidcError, verifyActionsToken } from "./oidc";
import { signBody, verifyWebhookSignature } from "./webhook";
import { createHmac, generateKeyPairSync } from "node:crypto";

describe("webhook signature", () => {
  const secret = "a-very-long-webhook-secret";
  const body = JSON.stringify({ action: "opened" });
  const header = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;

  it("accepts GitHub's signature", () => {
    expect(verifyWebhookSignature(secret, body, header)).toBe(true);
    expect(signBody(secret, body)).toBe(header);
  });

  it("rejects a wrong secret, a changed body, or a missing header", () => {
    expect(verifyWebhookSignature("other-secret-value!", body, header)).toBe(false);
    expect(verifyWebhookSignature(secret, `${body} `, header)).toBe(false);
    expect(verifyWebhookSignature(secret, body, null)).toBe(false);
    expect(verifyWebhookSignature(secret, body, "sha1=abc")).toBe(false);
  });
});

describe("App JWT", () => {
  it("signs an RS256 JWT from a PKCS#1 key (GitHub's format)", async () => {
    const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    const pem = privateKey.export({ type: "pkcs1", format: "pem" }).toString();
    expect(pem).toContain("BEGIN RSA PRIVATE KEY");
    const now = Date.UTC(2026, 0, 1);
    const jwt = await createAppJwt("12345", pem, now);
    const { payload, protectedHeader } = await jwtVerify(jwt, publicKey, { currentDate: new Date(now) });
    expect(protectedHeader.alg).toBe("RS256");
    expect(payload.iss).toBe("12345");
    expect(payload.iat).toBe(now / 1000 - 60);
    expect(payload.exp).toBe(now / 1000 + 540);
  });
});

describe("InstallationClient", () => {
  function jsonResponse(body: unknown, status = 200) {
    return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  }

  it("paginates PR files and sends GitHub headers", async () => {
    const page1 = Array.from({ length: 100 }, (_, i) => ({ filename: `f${i}.ts`, status: "modified" }));
    const page2 = [{ filename: "last.ts", status: "added" }];
    const fetchMock = vi.fn(async (url: string | URL | Request) =>
      jsonResponse(String(url).endsWith("&page=1") ? page1 : page2),
    );
    const client = new InstallationClient(async () => "ghs_token", fetchMock as unknown as typeof fetch);
    const files = await client.listPullFiles("o/r", 7);
    expect(files).toHaveLength(101);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.github.com/repos/o/r/pulls/7/files?per_page=100&page=1");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer ghs_token");
    expect((init.headers as Record<string, string>)["X-GitHub-Api-Version"]).toBe("2022-11-28");
  });

  it("dispatches the workflow by file name and handles 204", async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 204 }));
    const client = new InstallationClient(async () => "t", fetchMock as unknown as typeof fetch);
    await client.dispatchWorkflow("o/r", "agent-pr.yml", "main", { run_id: "x", stage: "1" });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.github.com/repos/o/r/actions/workflows/agent-pr.yml/dispatches");
    expect(JSON.parse(String(init.body))).toEqual({ ref: "main", inputs: { run_id: "x", stage: "1" } });
  });

  it("reports a missing workflow as false and other errors as GitHubApiError", async () => {
    const notFound = new InstallationClient(
      async () => "t",
      (async () => new Response("Not Found", { status: 404 })) as unknown as typeof fetch,
    );
    expect(await notFound.workflowExists("o/r", "agent-pr.yml")).toBe(false);
    const broken = new InstallationClient(
      async () => "t",
      (async () => new Response("boom", { status: 500 })) as unknown as typeof fetch,
    );
    await expect(broken.workflowExists("o/r", "agent-pr.yml")).rejects.toBeInstanceOf(GitHubApiError);
  });
});

describe("Actions OIDC", () => {
  async function setup() {
    const { publicKey, privateKey } = await generateKeyPair("RS256");
    const jwk = { ...(await exportJWK(publicKey)), kid: "k1", alg: "RS256" };
    const keys = createLocalJWKSet({ keys: [jwk] });
    const sign = (claims: Record<string, unknown>, audience = "https://agent-pr.test") =>
      new SignJWT(claims)
        .setProtectedHeader({ alg: "RS256", kid: "k1" })
        .setIssuer(ACTIONS_OIDC_ISSUER)
        .setAudience(audience)
        .setIssuedAt()
        .setExpirationTime("5m")
        .sign(privateKey);
    return { keys, sign };
  }

  const claims = {
    repository: "octo/app",
    repository_id: "42",
    ref: "refs/heads/main",
    event_name: "workflow_dispatch",
    run_id: "999",
    workflow_ref: "octo/app/.github/workflows/agent-pr.yml@refs/heads/main",
  };

  it("verifies a token and normalizes the claims", async () => {
    const { keys, sign } = await setup();
    const result = await verifyActionsToken(await sign(claims), "https://agent-pr.test", keys);
    expect(result).toEqual({
      repository: "octo/app",
      repositoryId: 42,
      ref: "refs/heads/main",
      eventName: "workflow_dispatch",
      runId: "999",
      workflowRef: "octo/app/.github/workflows/agent-pr.yml@refs/heads/main",
    });
  });

  it("rejects the wrong audience", async () => {
    const { keys, sign } = await setup();
    await expect(
      verifyActionsToken(await sign(claims, "https://evil.test"), "https://agent-pr.test", keys),
    ).rejects.toBeInstanceOf(OidcError);
  });

  it("parses bearer headers", () => {
    expect(bearerToken("Bearer abc.def")).toBe("abc.def");
    expect(bearerToken("bearer  xyz ")).toBe("xyz");
    expect(bearerToken("Basic abc")).toBeNull();
    expect(bearerToken(null)).toBeNull();
  });
});
