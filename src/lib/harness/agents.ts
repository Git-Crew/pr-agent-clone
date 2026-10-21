import { type AgentResult, agentResultSchema } from "@/lib/agents/contract";

// How to add an agent:
// 1. Add a card in src/lib/agents/catalog.ts (name, settings, coming_soon or available).
// 2. Add one binding below. The harness decides the machine.
// 3. Add a builtin row only when it should be stored for pipelines. Catalog status still gates the button.
//
// Machines:
// - kodus:    this server, the diff only. No clone.
// - hermes:   the repo's existing Actions job, one shared checkout.
// - openclaw: the same Actions job and the same checkout. Not a second machine.

export type HarnessName = "kodus" | "hermes" | "openclaw";
export type AgentPlace = "process" | "actions" | "http";

export type Harness = {
  name: HarnessName;
  place: AgentPlace;
  /** Actions harnesses only. A single executable name, looked up on the job's PATH. */
  command?: string;
};

export const HARNESSES: Record<HarnessName, Harness> = {
  kodus: { name: "kodus", place: "process" },
  hermes: { name: "hermes", place: "actions", command: "hermes" },
  openclaw: { name: "openclaw", place: "actions", command: "openclaw" },
};

export type AgentBinding = {
  slug: string;
  harness: HarnessName;
  /** Kodus uses this as the review instructions. Command harnesses receive it as GITCREW_PROMPT_FILE. */
  instructions: string;
};

export const AGENT_BINDINGS: AgentBinding[] = [
  {
    slug: "plain-words",
    harness: "kodus",
    instructions:
      "Follow the team's written instructions in the step config when present. Comment only where the diff breaks them.",
  },
  {
    slug: "ponytail",
    harness: "kodus",
    instructions:
      "Prefer the smallest change that fixes the problem. Do not rewrite the file, rename for style, or add dependencies.",
  },
  {
    slug: "hermes",
    harness: "hermes",
    instructions:
      "Review this pull request in the checkout. Print only a JSON review result with conclusion, title, summary, and comments.",
  },
  {
    slug: "openclaw",
    harness: "openclaw",
    instructions:
      "Review this pull request in the checkout. Look for a better approach. Print only a JSON review result with conclusion, title, summary, and comments.",
  },
];

export function getBinding(slug: string): AgentBinding | undefined {
  return AGENT_BINDINGS.find((binding) => binding.slug === slug);
}

/** A command harness prints this JSON. The kodus harness parses the same shape out of the model reply. */
export function acceptReviewResult(raw: unknown): AgentResult {
  return agentResultSchema.parse(raw);
}

/** Where this slug runs. Built-in runners with no binding stay on Actions. Everything else is an HTTP agent. */
export function placeForSlug(slug: string, fallback: AgentPlace = "http"): AgentPlace {
  const binding = getBinding(slug);
  if (binding) return HARNESSES[binding.harness].place;
  return fallback;
}

/** Fields the Actions job needs. Empty for the kodus harness, which never reaches that job. */
export function actionSpec(slug: string): Record<string, string> {
  const binding = getBinding(slug);
  if (!binding) return {};
  const harness = HARNESSES[binding.harness];
  if (harness.place !== "actions" || !harness.command) return {};
  return { harness: harness.name, command: harness.command, prompt: binding.instructions };
}

export type Capability = "read_diff" | "read_tree" | "exec" | "secrets" | "write_branch";

/** What this run is allowed to do. Forks stay on the diff. */
export function capabilitiesFor(slug: string, isFork: boolean): Capability[] {
  const place = placeForSlug(slug, "actions");
  if (isFork) return ["read_diff"];
  if (place === "process") return ["read_diff"];
  if (place === "http") return ["read_diff"];
  return ["read_diff", "read_tree", "exec"];
}
