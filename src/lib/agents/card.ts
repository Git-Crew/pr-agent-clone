import { z } from "zod";

// An agent card is the one description every agent has: what it is, how it runs, and which settings people can
// change. The dashboard builds the catalog and the settings form from cards, so adding an agent needs no UI code.

export const settingFieldSchema = z.object({
  key: z.string().regex(/^[a-zA-Z][a-zA-Z0-9]*$/),
  label: z.string().min(1).max(60),
  help: z.string().max(200).optional(),
  type: z.enum(["text", "textarea", "number", "boolean", "select", "list"]),
  options: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  default: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
  min: z.number().optional(),
  max: z.number().optional(),
  /** Hidden under "Advanced" so beginners only see what matters. */
  advanced: z.boolean().optional(),
});

export type SettingField = z.infer<typeof settingFieldSchema>;

/**
 * How an agent runs:
 * - runner:  inside the repo's own GitHub Actions job (agent-pr.yml), e.g. FixMySlop
 * - http:    we POST the pull request to a URL the agent's author hosts, and it answers with findings
 * - prompt:  plain-words instructions sent to an LLM with the diff (coming next)
 * - command: a CLI run in the repo's Actions job (coming next)
 */
export type AgentRuntime = "runner" | "http" | "prompt" | "command";

export type AgentCard = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  by?: string;
  docsUrl?: string;
  status: "available" | "coming_soon";
  runtime: AgentRuntime;
  settings: SettingField[];
  /** Secrets the agent needs, stored encrypted under Settings → Secrets. */
  secrets: { name: string; label: string }[];
};

export function defaultSettings(fields: SettingField[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((field) => [field.key, field.default]));
}

/** Validate user-entered settings against a card's fields. Unknown keys are dropped; missing ones get defaults. */
export function parseSettings(fields: SettingField[], input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    const value = input[field.key] ?? field.default;
    switch (field.type) {
      case "boolean":
        out[field.key] = z.boolean().parse(value);
        break;
      case "number":
        out[field.key] = z
          .number()
          .min(field.min ?? Number.NEGATIVE_INFINITY)
          .max(field.max ?? Number.POSITIVE_INFINITY)
          .parse(value);
        break;
      case "select":
        out[field.key] = z.enum((field.options ?? []).map((o) => o.value) as [string, ...string[]]).parse(value);
        break;
      case "list":
        out[field.key] = z.array(z.string().max(200)).max(50).parse(value);
        break;
      default:
        out[field.key] = z
          .string()
          .max(field.type === "textarea" ? 5_000 : 300)
          .parse(value);
    }
  }
  return out;
}
