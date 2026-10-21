import { type AgentResult, agentResultSchema } from "@/lib/agents/contract";

import type { ChangedSlice } from "./types";

const SYSTEM = `You review a pull request. Reply with one JSON object and nothing else:
{"conclusion":"success"|"failure"|"neutral","title":"one line","summary":"markdown","comments":[{"path":"file","line":1,"body":"what to change","severity":"critical"|"high"|"medium"|"low"}]}
Only comment on lines in the diff. No patch unless you were told to suggest a minimal one.`;

export function reviewMessages(
  instructions: string,
  files: ChangedSlice[],
  system = SYSTEM,
): { system: string; user: string } {
  const diff = files.map((file) => `### ${file.path}\n${file.patch ?? "(no patch)"}`).join("\n\n");
  return {
    system,
    user: `${instructions.trim()}\n\n${diff || "(no changed files)"}`,
  };
}

/** Pull the JSON object out of a model reply, including a fenced block. */
export function resultFromModelText(text: string): AgentResult {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = (fenced?.[1] ?? text).trim();
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("The review reply was not JSON");
  return agentResultSchema.parse(JSON.parse(body.slice(start, end + 1)));
}

/** A loop's stdout. JSON becomes a review. Prose becomes a neutral summary. */
export function reviewFromText(text: string, metrics: Record<string, string | number>): AgentResult {
  const body = text.trim();
  if (!body) throw new Error("The review loop returned an empty reply");
  try {
    const parsed = resultFromModelText(body);
    return { ...parsed, metrics: { ...parsed.metrics, ...metrics } };
  } catch {
    return {
      conclusion: "neutral",
      title: "Review",
      summary: body.slice(0, 60_000),
      comments: [],
      metrics,
    };
  }
}

export function acceptReviewResult(raw: unknown): AgentResult {
  return agentResultSchema.parse(raw);
}
