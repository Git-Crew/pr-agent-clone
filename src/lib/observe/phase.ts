import type { PhaseOutcome } from "@/lib/db/schema";

// One finished slice of an agent's work. The usage page stores these.
// The metrics scrape turns a window of them into Prometheus gauges.

export type PhaseNote = {
  agentSlug: string;
  agentName: string;
  phase: string;
  outcome: PhaseOutcome;
  model?: string;
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
  runId: string;
  stepId?: string;
  repository: string;
};

const INPUT_KEYS = ["inputTokens", "input_tokens", "prompt_tokens"];
const OUTPUT_KEYS = ["outputTokens", "output_tokens", "completion_tokens"];

function numberField(metrics: Record<string, string | number> | null | undefined, keys: string[]): number {
  if (!metrics) return 0;
  for (const key of keys) {
    const value = metrics[key];
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) return Math.round(value);
  }
  return 0;
}

/** Build the note stored when a step finishes. Token fields are read from the agent's metrics, when it sent any. */
export function noteFromFinish(input: {
  agentSlug: string;
  agentName: string;
  outcome: PhaseOutcome;
  metrics?: Record<string, string | number> | null;
  startedAt: Date | null;
  finishedAt: Date;
  runId: string;
  stepId?: string;
  repository: string;
}): PhaseNote {
  const elapsed = input.startedAt ? input.finishedAt.getTime() - input.startedAt.getTime() : 0;
  const model = input.metrics?.model;
  return {
    agentSlug: input.agentSlug,
    agentName: input.agentName,
    phase: "review",
    outcome: input.outcome,
    model: typeof model === "string" && model.length > 0 ? model.slice(0, 120) : undefined,
    inputTokens: numberField(input.metrics, INPUT_KEYS),
    outputTokens: numberField(input.metrics, OUTPUT_KEYS),
    durationMs: Math.max(0, elapsed),
    runId: input.runId,
    stepId: input.stepId,
    repository: input.repository,
  };
}
