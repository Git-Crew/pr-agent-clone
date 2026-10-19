import type { z } from "zod";

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
];

export function getBuiltinAgent(slug: string): BuiltinAgent | undefined {
  return BUILTIN_AGENTS.find((agent) => agent.slug === slug);
}

/** Validate a step's config against the agent's schema, filling defaults. Throws on invalid config. */
export function resolveAgentConfig(slug: string, config: unknown): Record<string, unknown> {
  const agent = getBuiltinAgent(slug);
  if (!agent) return (config as Record<string, unknown>) ?? {};
  return agent.configSchema.parse(config ?? {});
}
