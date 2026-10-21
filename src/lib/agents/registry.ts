import { z } from "zod";

import { acceptReviewResult } from "@/lib/agents/modules/prompt";

import type { AgentResult } from "./contract";
import { FIXMYSLOP_VERSION, finalizeFixMySlop, fixMySlopConfigSchema } from "./fixmyslop";

// Built-in agents. The database `agents` table mirrors these rows (ensureBuiltinAgents) so pipelines can reference
// them by id; the code here stays the source of truth for behaviour and config validation.

export type BuiltinAgent = {
  slug: string;
  name: string;
  description: string;
  /** "runner": executed by agent-pr.yml in the user's repo. "server": runs on our side, diff only. */
  executor: "runner" | "server";
  configSchema: z.ZodType<Record<string, unknown>>;
  /** Turn the raw output posted by the runner into the common AgentResult. */
  finalize: (raw: unknown, config: Record<string, unknown>) => AgentResult;
  /** Extra data the runner needs, sent with the job. */
  runnerSpec?: Record<string, string>;
  docsUrl?: string;
};

const reviewConfigSchema = z.record(z.string(), z.unknown());

function reviewAgent(slug: string, name: string, description: string, executor: "runner" | "server"): BuiltinAgent {
  return {
    slug,
    name,
    description,
    executor,
    configSchema: reviewConfigSchema,
    finalize: (raw) => acceptReviewResult(raw),
  };
}

export const BUILTIN_AGENTS: BuiltinAgent[] = [
  {
    slug: "fixmyslop",
    name: "FixMySlop",
    description:
      "Scans the PR's changed files for AI slop, security holes and hallucinated packages, then posts the findings as an inline review with a slop score and grade.",
    executor: "runner",
    configSchema: fixMySlopConfigSchema,
    finalize: finalizeFixMySlop,
    runnerSpec: { fixmyslopVersion: FIXMYSLOP_VERSION },
    docsUrl: "https://github.com/MrSpideyNihal/FixMySlop",
  },
  reviewAgent(
    "plain-words",
    "Plain-words reviewer",
    "Reads the diff with the kodus harness and comments where the team's instructions say to.",
    "server",
  ),
  reviewAgent(
    "ponytail",
    "Ponytail",
    "Reviews with the kodus harness and keeps the suggested change as small as the instructions allow.",
    "server",
  ),
  reviewAgent(
    "hermes",
    "Hermes",
    "Runs Hermes's own agent loop on this server. Scratch files last for one run. Its memory lasts for the repository.",
    "server",
  ),
  reviewAgent(
    "openclaw",
    "OpenClaw",
    "Runs OpenClaw's own agent loop on this server. Scratch files last for one run. Its state lasts for the repository.",
    "server",
  ),
];

export function getBuiltinAgent(slug: string): BuiltinAgent | undefined {
  return BUILTIN_AGENTS.find((agent) => agent.slug === slug);
}

/** Validate a step's config against the agent's schema, filling defaults. Throws on invalid config. */
export function resolveAgentConfig(slug: string, config: unknown): Record<string, unknown> {
  const agent = getBuiltinAgent(slug);
  if (!agent) return typeof config === "object" && config !== null ? (config as Record<string, unknown>) : {};
  return agent.configSchema.parse(config ?? {});
}
