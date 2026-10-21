import { eq } from "drizzle-orm";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { assertAgentUrl } from "@/lib/agents/http";
import { encryptSecret } from "@/lib/crypto/secrets";
import * as schema from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";
import { signBody } from "@/lib/github/webhook";
import { createTestDb } from "@/lib/test/db";
import { FakeGitHub, INSTALLATION, REPO } from "@/lib/test/fake-github";

import {
  type OrchestratorDeps,
  type PullRequestEvent,
  RunnerRequestError,
  startRunForPullRequest,
  submitAgentCallback,
  syncInstallation,
} from "./orchestrator";
import { randomBytes } from "node:crypto";

// HTTP ("connect your own") agents, triggers, strictness and comment style, against PGlite and a fake GitHub.

const SECRET = "agent-signing-secret";
const AGENT_URL = "https://agent.example.com/review";

let db: Db;
let github: FakeGitHub;
let deps: OrchestratorDeps;
let agentId: string;
let fetchMock: ReturnType<typeof vi.fn>;

function prEvent(action = "opened", extra: Partial<PullRequestEvent> = {}, labels: string[] = []): PullRequestEvent {
  return {
    action,
    installation: { id: INSTALLATION },
    repository: { ...REPO, owner: { id: 9, login: "octo", type: "Organization", avatar_url: "" } },
    pull_request: {
      number: 7,
      title: "Add things",
      html_url: "https://github.com/octo/app/pull/7",
      state: "open",
      draft: false,
      labels: labels.map((name) => ({ name })),
      user: { login: "dev" },
      head: { sha: "a".repeat(40), ref: "feature", repo: { full_name: "octo/app" } },
      base: { sha: "b".repeat(40), ref: "main", repo: { full_name: "octo/app" } },
    },
    ...extra,
  };
}

function reply(status: number, body: unknown, contentType = "application/json") {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: { "Content-Type": contentType },
  });
}

async function onlyHttpAgent(overrides: Partial<typeof schema.pipelineSteps.$inferInsert> = {}) {
  await db.delete(schema.pipelineSteps).where(eq(schema.pipelineSteps.repositoryId, REPO.id));
  await db.insert(schema.pipelineSteps).values({ repositoryId: REPO.id, agentId, stage: 1, ...overrides });
}

async function stepsOf(runId: string) {
  return db.select().from(schema.runSteps).where(eq(schema.runSteps.runId, runId));
}

beforeEach(async () => {
  process.env.ENCRYPTION_KEY = randomBytes(32).toString("base64");
  db = await createTestDb();
  github = new FakeGitHub();
  deps = { db, github: () => github, appUrl: "https://gitcrew.test" };
  await syncInstallation(deps, {
    id: INSTALLATION,
    account: { id: 9, login: "octo", type: "Organization", avatar_url: "" },
    suspended_at: null,
  });
  const [agent] = await db
    .insert(schema.agents)
    .values({
      slug: "security-bot",
      name: "Security Bot",
      kind: "http",
      endpointUrl: AGENT_URL,
      signingSecret: encryptSecret(SECRET),
      installationId: INSTALLATION,
    })
    .returning();
  agentId = agent.id;
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("HTTP agents", () => {
  it("sends a signed request and posts the agent's findings", async () => {
    await onlyHttpAgent();
    fetchMock.mockResolvedValueOnce(
      reply(200, {
        conclusion: "failure",
        title: "1 risky change",
        summary: "Found a hardcoded key.",
        comments: [{ path: "src/a.py", line: 2, body: "Hardcoded key", severity: "high" }],
      }),
    );

    const runId = (await startRunForPullRequest(deps, prEvent())) as string;

    const [url, init] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(String(url)).toBe(AGENT_URL);
    const body = String(init.body);
    expect((init.headers as Record<string, string>)["X-GitCrew-Signature"]).toBe(signBody(SECRET, body));
    const sent = JSON.parse(body);
    expect(sent).toMatchObject({ version: 1, pullRequest: { number: 7, isFork: false } });
    expect(sent.changedFiles.map((f: { path: string }) => f.path)).toEqual(["src/a.py", "docs/notes.md"]);
    expect(sent.callbackUrl).toBe(`https://gitcrew.test/api/agents/steps/${sent.stepId}/result`);

    expect(github.dispatches).toHaveLength(0); // HTTP agents don't need the Actions workflow
    expect(github.reviews[0].comments).toEqual([expect.objectContaining({ path: "src/a.py", line: 2 })]);
    expect(github.checkByName("GitCrew / Security Bot")[0]).toMatchObject({
      status: "completed",
      conclusion: "neutral",
    });
    const [run] = await db.select().from(schema.runs).where(eq(schema.runs.id, runId));
    expect(run).toMatchObject({ status: "completed", conclusion: "success" });
  });

  it("waits for a 202 and accepts only a correctly signed callback", async () => {
    await onlyHttpAgent({ blocking: true });
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 202 }));
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    const [step] = await stepsOf(runId);
    expect(step.status).toBe("running");

    const sarif = JSON.stringify({
      version: "2.1.0",
      runs: [
        {
          results: [
            {
              ruleId: "no-eval",
              level: "error",
              message: { text: "eval is dangerous" },
              locations: [{ physicalLocation: { artifactLocation: { uri: "src/a.py" }, region: { startLine: 3 } } }],
            },
          ],
        },
      ],
    });
    await expect(submitAgentCallback(deps, step.id, sarif, "sha256=bad", "application/json")).rejects.toMatchObject({
      status: 401,
    });
    const { conclusion } = await submitAgentCallback(deps, step.id, sarif, signBody(SECRET, sarif), "application/json");
    expect(conclusion).toBe("failure"); // blocking agent with an error-level finding
    await expect(
      submitAgentCallback(deps, step.id, sarif, signBody(SECRET, sarif), "application/json"),
    ).rejects.toBeInstanceOf(RunnerRequestError);
    const [run] = await db.select().from(schema.runs).where(eq(schema.runs.id, runId));
    expect(run).toMatchObject({ status: "completed", conclusion: "failure" });
  });

  it("records a failing agent without blocking a non-blocking step", async () => {
    await onlyHttpAgent();
    fetchMock.mockResolvedValueOnce(reply(500, "boom", "text/plain"));
    const runId = (await startRunForPullRequest(deps, prEvent())) as string;
    const [step] = await stepsOf(runId);
    expect(step).toMatchObject({ status: "completed", conclusion: "neutral" });
    expect(step.summary).toContain("answered 500");
  });

  it("posts plain-text replies as a summary review", async () => {
    await onlyHttpAgent();
    fetchMock.mockResolvedValueOnce(reply(200, "Consider splitting this PR in two.", "text/plain"));
    await startRunForPullRequest(deps, prEvent());
    expect(github.reviews).toHaveLength(1);
    expect(github.reviews[0].comments).toEqual([]);
    expect(github.reviews[0].body).toContain("Consider splitting this PR in two.");
  });
});

describe("plain questions", () => {
  const failing = {
    conclusion: "failure",
    title: "Problems",
    summary: "See comments.",
    comments: [{ path: "src/a.py", line: 2, body: "Fix this" }],
  };

  it("“How strict?” request changes, and “How chatty?” summary only", async () => {
    await onlyHttpAgent({ reviewMode: "request_changes", commentStyle: "summary" });
    fetchMock.mockResolvedValueOnce(reply(200, failing));
    await startRunForPullRequest(deps, prEvent());
    expect(github.reviews[0].event).toBe("REQUEST_CHANGES");
    expect(github.reviews[0].comments).toEqual([]);
    expect(github.reviews[0].body).toContain("`src/a.py:2`");
  });

  it("“When should it run?” only when opened", async () => {
    await onlyHttpAgent({ trigger: "opened" });
    fetchMock.mockResolvedValue(reply(200, { ...failing, conclusion: "success", comments: [] }));
    expect(await startRunForPullRequest(deps, prEvent("synchronize"))).toBeNull();
    expect(await startRunForPullRequest(deps, prEvent("opened"))).not.toBeNull();
  });

  it("“When should it run?” while a label is on the PR, without cancelling the push run", async () => {
    const [fixmyslop] = await db.select().from(schema.agents).where(eq(schema.agents.slug, "fixmyslop"));
    await onlyHttpAgent({ trigger: "label", triggerLabel: "security" });
    await db.insert(schema.pipelineSteps).values({ repositoryId: REPO.id, agentId: fixmyslop.id, stage: 1 });
    fetchMock.mockResolvedValue(reply(200, { ...failing, conclusion: "success", comments: [] }));

    const pushRun = (await startRunForPullRequest(deps, prEvent("opened"))) as string;
    expect((await stepsOf(pushRun)).map((s) => s.agentSlug)).toEqual(["fixmyslop"]);
    expect(fetchMock).not.toHaveBeenCalled();

    expect(await startRunForPullRequest(deps, prEvent("labeled", { label: { name: "docs" } }))).toBeNull();
    const labelRun = (await startRunForPullRequest(
      deps,
      prEvent("labeled", { label: { name: "Security" } }, ["security"]),
    )) as string;
    expect((await stepsOf(labelRun)).map((s) => s.agentSlug)).toEqual(["security-bot"]);
    const [push] = await db.select().from(schema.runs).where(eq(schema.runs.id, pushRun));
    expect(push.status).not.toBe("cancelled");

    const synced = (await startRunForPullRequest(deps, prEvent("synchronize", {}, ["security"]))) as string;
    expect((await stepsOf(synced)).map((s) => s.agentSlug).sort()).toEqual(["fixmyslop", "security-bot"]);
  });
});

describe("agent URL safety", () => {
  it("allows public https and blocks local or private targets", () => {
    expect(assertAgentUrl("https://agent.example.com/x").hostname).toBe("agent.example.com");
    for (const bad of [
      "http://agent.example.com",
      "https://localhost/x",
      "https://127.0.0.1/x",
      "https://169.254.169.254/latest/meta-data",
      "https://10.0.0.5/x",
      "https://192.168.1.2/x",
      "https://[::1]/x",
      "https://user:pass@agent.example.com",
      "https://metadata.google.internal/x",
      "not a url",
    ]) {
      expect(() => assertAgentUrl(bad, { NODE_ENV: "production" } as unknown as NodeJS.ProcessEnv), bad).toThrow();
    }
    expect(
      assertAgentUrl("http://localhost:4000/agent", { NODE_ENV: "development" } as unknown as NodeJS.ProcessEnv).port,
    ).toBe("4000");
  });
});
