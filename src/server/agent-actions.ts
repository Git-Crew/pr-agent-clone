"use server";

import { revalidatePath } from "next/cache";

import { and, eq, inArray, isNull, max, or } from "drizzle-orm";
import { z } from "zod";

import { defaultSettings } from "@/lib/agents/card";
import { getCatalogCard } from "@/lib/agents/catalog";
import { assertAgentUrl, callHttpAgent, sampleAgentRequest, UnsafeUrlError } from "@/lib/agents/http";
import { decryptSecret, encryptSecret } from "@/lib/crypto/secrets";
import { getInstallationIds, requireUser } from "@/lib/db/dashboard";
import { db } from "@/lib/db/drizzle";
import { agents, pipelineSteps, repositories } from "@/lib/db/schema";
import { getAppUrl } from "@/lib/env";
import { ensureBuiltinAgents } from "@/lib/pipeline/orchestrator";

import { randomBytes } from "node:crypto";

export type AgentActionResult<T = object> = ({ ok: true; message?: string } & T) | { ok: false; error: string };

function fail(error: unknown): { ok: false; error: string } {
  if (error instanceof z.ZodError) return { ok: false, error: error.issues[0]?.message ?? "Check the form" };
  if (error instanceof UnsafeUrlError) return { ok: false, error: error.message };
  return { ok: false, error: error instanceof Error ? error.message : "Something went wrong" };
}

function newSecret() {
  return `gcs_${randomBytes(24).toString("base64url")}`;
}

function slugify(name: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${base || "agent"}-${randomBytes(3).toString("hex")}`;
}

/** An agent the user may manage: one their installation registered. */
async function ownAgent(agentId: string) {
  const user = await requireUser();
  const installationIds = await getInstallationIds(user.id);
  if (installationIds.length === 0 || !z.uuid().safeParse(agentId).success) return null;
  const [agent] = await db
    .select()
    .from(agents)
    .where(and(eq(agents.id, agentId), inArray(agents.installationId, installationIds)))
    .limit(1);
  return agent ?? null;
}

const connectSchema = z.object({
  installationId: z.number().int().positive(),
  name: z.string().trim().min(2, "Give the agent a name").max(40, "Keep the name under 40 characters"),
  tagline: z.string().trim().max(120).default(""),
  url: z.string().trim().min(1, "Paste the agent's URL"),
});

/** Register an agent someone hosts. Returns its signing secret; this is the only time it is shown. */
export async function connectHttpAgent(
  input: unknown,
): Promise<AgentActionResult<{ agentId: string; secret: string }>> {
  try {
    const user = await requireUser();
    const data = connectSchema.parse(input);
    if (!(await getInstallationIds(user.id)).includes(data.installationId)) {
      return { ok: false, error: "Pick one of your GitHub accounts" };
    }
    const url = assertAgentUrl(data.url).toString();
    const secret = newSecret();
    const [agent] = await db
      .insert(agents)
      .values({
        slug: slugify(data.name),
        name: data.name,
        tagline: data.tagline,
        description: data.tagline,
        kind: "http",
        endpointUrl: url,
        signingSecret: encryptSecret(secret),
        installationId: data.installationId,
        createdBy: user.id,
      })
      .returning({ id: agents.id });
    revalidatePath("/dashboard/agents");
    return { ok: true, agentId: agent.id, secret, message: `${data.name} connected` };
  } catch (error) {
    return fail(error);
  }
}

export type TestOutcome = { kind: string; title?: string; findings?: number; detail: string };

/** Send a sample pull request to the agent and report what came back, in plain words. */
export async function testHttpAgent(agentId: string): Promise<AgentActionResult<{ outcome: TestOutcome }>> {
  try {
    const agent = await ownAgent(agentId);
    if (!agent?.endpointUrl || !agent.signingSecret) return { ok: false, error: "Agent not found" };
    const outcome = await callHttpAgent({
      url: agent.endpointUrl,
      secret: decryptSecret(agent.signingSecret),
      agentName: agent.name,
      request: sampleAgentRequest(getAppUrl()),
    });
    if (outcome.kind === "result") {
      const findings = outcome.result.comments.length;
      return {
        ok: true,
        outcome: {
          kind: "result",
          title: outcome.result.title,
          findings,
          detail: `It answered with “${outcome.result.title}” and ${findings} line comment${findings === 1 ? "" : "s"}. It works.`,
        },
      };
    }
    if (outcome.kind === "accepted") {
      return {
        ok: true,
        outcome: {
          kind: "accepted",
          detail: "It accepted the request (202) and will post its result to the callback URL. That works too.",
        },
      };
    }
    return { ok: true, outcome: { kind: "error", detail: outcome.error } };
  } catch (error) {
    return fail(error);
  }
}

export async function rotateAgentSecret(agentId: string): Promise<AgentActionResult<{ secret: string }>> {
  try {
    const agent = await ownAgent(agentId);
    if (!agent) return { ok: false, error: "Agent not found" };
    const secret = newSecret();
    await db
      .update(agents)
      .set({ signingSecret: encryptSecret(secret), updatedAt: new Date() })
      .where(eq(agents.id, agent.id));
    return { ok: true, secret, message: "New secret created. Update it in your agent now." };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteAgent(agentId: string): Promise<AgentActionResult> {
  try {
    const agent = await ownAgent(agentId);
    if (!agent) return { ok: false, error: "Agent not found" };
    await db.delete(agents).where(eq(agents.id, agent.id));
    revalidatePath("/dashboard/agents");
    revalidatePath("/dashboard/repos");
    return { ok: true, message: `${agent.name} removed from every pipeline` };
  } catch (error) {
    return fail(error);
  }
}

const addSchema = z.object({
  agentId: z.uuid(),
  repoIds: z.array(z.number().int()).min(1, "Pick a repository").max(500),
});

/** Add an agent to the end of each repo's first stage, with its default settings. */
export async function addAgentToRepos(input: unknown): Promise<AgentActionResult> {
  try {
    const user = await requireUser();
    const { agentId, repoIds } = addSchema.parse(input);
    const installationIds = await getInstallationIds(user.id);
    if (installationIds.length === 0) return { ok: false, error: "Install the GitHub App first" };
    await ensureBuiltinAgents(db);

    const [agent] = await db
      .select()
      .from(agents)
      .where(
        and(eq(agents.id, agentId), or(isNull(agents.installationId), inArray(agents.installationId, installationIds))),
      )
      .limit(1);
    if (!agent) return { ok: false, error: "Agent not found" };
    const card = getCatalogCard(agent.slug);
    if (card && card.status !== "available") return { ok: false, error: `${agent.name} is coming soon` };

    const repos = await db
      .select({ id: repositories.id })
      .from(repositories)
      .where(and(inArray(repositories.id, repoIds), inArray(repositories.installationId, installationIds)));
    if (repos.length !== repoIds.length) return { ok: false, error: "Some repositories are not accessible" };

    const config = card ? defaultSettings(card.settings) : {};
    for (const { id } of repos) {
      const [{ last }] = await db
        .select({ last: max(pipelineSteps.position) })
        .from(pipelineSteps)
        .where(eq(pipelineSteps.repositoryId, id));
      await db
        .insert(pipelineSteps)
        .values({ repositoryId: id, agentId: agent.id, stage: 1, position: (last ?? -1) + 1, config });
    }
    revalidatePath("/dashboard/repos");
    return { ok: true, message: `${agent.name} added to ${repos.length} repositor${repos.length === 1 ? "y" : "ies"}` };
  } catch (error) {
    return fail(error);
  }
}
