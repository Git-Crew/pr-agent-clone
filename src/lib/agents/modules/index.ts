import { fixmyslop, httpAgent } from "./hosted";
import { kodus } from "./kodus/agent";
import type { AgentModule } from "./types";

export type { AgentModule, CheckoutKind, ReviewContext } from "./types";

export type AgentPlace = "process" | "worker" | "actions" | "http";

const hermes: AgentModule = { id: "hermes", checkout: "sandbox", memory: true, terminal: true };
const openclaw: AgentModule = { id: "openclaw", checkout: "sandbox", memory: true, terminal: true };

const MODULES: AgentModule[] = [kodus, hermes, openclaw, fixmyslop, httpAgent];

/** Cards that share a loop. The instructions are that card's prompt. */
const CARDS: { slug: string; moduleId: string; instructions: string }[] = [
  {
    slug: "plain-words",
    moduleId: "kodus",
    instructions:
      "Follow the team's written instructions in the step config when present. Comment only where the diff breaks them.",
  },
  {
    slug: "ponytail",
    moduleId: "kodus",
    instructions:
      "Prefer the smallest change that fixes the problem. Do not rewrite the file, rename for style, or add dependencies.",
  },
  {
    slug: "hermes",
    moduleId: "hermes",
    instructions:
      "Review this pull request in the checkout. Print only a JSON review result with conclusion, title, summary, and comments.",
  },
  {
    slug: "openclaw",
    moduleId: "openclaw",
    instructions:
      "Review this pull request in the checkout. Look for a better approach. Print only a JSON review result with conclusion, title, summary, and comments.",
  },
];

export function moduleForSlug(slug: string): AgentModule | undefined {
  const card = CARDS.find((item) => item.slug === slug);
  if (card) return MODULES.find((mod) => mod.id === card.moduleId);
  return MODULES.find((mod) => mod.id === slug);
}

export function instructionsFor(slug: string): string {
  return CARDS.find((item) => item.slug === slug)?.instructions ?? "Review this pull request.";
}

export function placeForSlug(slug: string, fallback: AgentPlace = "http"): AgentPlace {
  const mod = moduleForSlug(slug);
  if (!mod) return fallback;
  if (mod.checkout === "actions") return "actions";
  if (mod.checkout === "sandbox") return "worker";
  if (mod.checkout === "none") return "http";
  return "process";
}

export type Capability = "read_diff" | "read_tree" | "exec" | "secrets" | "write_branch";

export function capabilitiesFor(slug: string, isFork: boolean): Capability[] {
  if (isFork) return ["read_diff"];
  const mod = moduleForSlug(slug);
  if (!mod || mod.checkout === "none") return ["read_diff"];
  if (mod.terminal) return ["read_diff", "read_tree", "exec"];
  if (mod.checkout === "shared") return ["read_diff", "read_tree"];
  return ["read_diff"];
}
