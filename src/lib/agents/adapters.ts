import { z } from "zod";

import { type AgentComment, type AgentResult, agentResultSchema, type Severity } from "./contract";

// Agents can answer in three shapes. We turn each into the common AgentResult:
// - our AgentResult JSON (see docs/CONNECT-AN-AGENT.md)
// - SARIF 2.1.0, which most linters and scanners already output (ESLint, Semgrep, Ruff, CodeQL…)
// - plain text, posted as the review summary

export type AgentOutputFormat = "agent-result" | "sarif" | "text";

const sarifSchema = z.object({
  version: z.string().optional(),
  runs: z.array(
    z.object({
      tool: z
        .object({ driver: z.object({ name: z.string().optional() }).passthrough() })
        .passthrough()
        .optional(),
      results: z
        .array(
          z
            .object({
              ruleId: z.string().optional(),
              level: z.enum(["error", "warning", "note", "none"]).optional(),
              message: z.object({ text: z.string().optional(), markdown: z.string().optional() }).passthrough(),
              locations: z
                .array(
                  z
                    .object({
                      physicalLocation: z
                        .object({
                          artifactLocation: z.object({ uri: z.string() }).passthrough().optional(),
                          region: z.object({ startLine: z.number().int().optional() }).passthrough().optional(),
                        })
                        .passthrough()
                        .optional(),
                    })
                    .passthrough(),
                )
                .optional(),
            })
            .passthrough(),
        )
        .default([]),
    }),
  ),
});

const LEVEL_SEVERITY: Record<string, Severity> = { error: "high", warning: "medium", note: "low", none: "low" };

function cleanPath(uri: string): string {
  return uri.replace(/^file:\/\//, "").replace(/^\.?\//, "");
}

export function fromSarif(raw: unknown, agentName: string): AgentResult {
  const sarif = sarifSchema.parse(raw);
  const comments: AgentComment[] = [];
  let errors = 0;
  let total = 0;
  for (const run of sarif.runs) {
    for (const result of run.results) {
      total++;
      if (result.level === "error") errors++;
      const location = result.locations?.[0]?.physicalLocation;
      const uri = location?.artifactLocation?.uri;
      const line = location?.region?.startLine;
      const text = result.message.markdown ?? result.message.text ?? "Finding";
      if (!uri || !line || line < 1) continue;
      comments.push({
        path: cleanPath(uri),
        line,
        severity: LEVEL_SEVERITY[result.level ?? "warning"],
        body: result.ruleId ? `\`${result.ruleId}\` · ${text}` : text,
      });
    }
  }
  return {
    conclusion: errors > 0 ? "failure" : "success",
    title: total === 0 ? `${agentName} found nothing` : `${agentName}: ${total} finding${total === 1 ? "" : "s"}`,
    summary: `${total} finding${total === 1 ? "" : "s"}, ${errors} error${errors === 1 ? "" : "s"}.`,
    comments: comments.slice(0, 500),
  };
}

export function fromText(text: string, agentName: string): AgentResult {
  const trimmed = text.trim();
  return {
    conclusion: "neutral",
    title: `${agentName} replied`,
    summary: trimmed.slice(0, 60_000) || "(empty reply)",
    comments: [],
  };
}

/** Recognise the reply's shape and turn it into an AgentResult. Throws with a readable message if it can't. */
export function toAgentResult(body: string, agentName: string, contentType = ""): AgentResult {
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    if (contentType.includes("json")) throw new Error("The agent said it sent JSON, but the body is not valid JSON");
    return fromText(body, agentName);
  }
  if (json && typeof json === "object" && "runs" in json) return fromSarif(json, agentName);
  const parsed = agentResultSchema.safeParse(json);
  if (parsed.success) return parsed.data;
  const issue = parsed.error.issues[0];
  throw new Error(
    `The agent's JSON is not a valid result: ${issue?.path.join(".") || "body"} ${issue?.message ?? ""}`.trim(),
  );
}
