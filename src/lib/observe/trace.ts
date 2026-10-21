import type { PhaseNote } from "./phase";
import { randomBytes } from "node:crypto";

// OpenTelemetry OTLP/HTTP JSON for one agent phase.
// int64 fields are strings, which is what the OTLP JSON mapping requires.

type Attr = { key: string; value: { stringValue: string } | { intValue: string } };

function attr(key: string, value: string | number): Attr {
  if (typeof value === "number") return { key, value: { intValue: String(value) } };
  return { key, value: { stringValue: value } };
}

export function phaseTrace(note: PhaseNote, clock?: { traceId?: string; spanId?: string; start?: Date; end?: Date }) {
  const end = clock?.end ?? new Date();
  const start = clock?.start ?? new Date(end.getTime() - note.durationMs);
  const attributes: Attr[] = [
    attr("gitcrew.agent.slug", note.agentSlug),
    attr("gitcrew.agent.phase", note.phase),
    attr("gitcrew.run.id", note.runId),
    attr("gitcrew.repository", note.repository),
    attr("gen_ai.usage.input_tokens", note.inputTokens),
    attr("gen_ai.usage.output_tokens", note.outputTokens),
  ];
  if (note.model) attributes.push(attr("gen_ai.response.model", note.model));

  return {
    resourceSpans: [
      {
        resource: {
          attributes: [attr("service.name", "gitcrew")],
        },
        scopeSpans: [
          {
            scope: { name: "gitcrew.observe" },
            spans: [
              {
                traceId: clock?.traceId ?? randomBytes(16).toString("hex"),
                spanId: clock?.spanId ?? randomBytes(8).toString("hex"),
                name: "gitcrew.agent.phase",
                kind: 1,
                startTimeUnixNano: String(start.getTime() * 1_000_000),
                endTimeUnixNano: String(end.getTime() * 1_000_000),
                attributes,
                status: { code: note.outcome === "failed" ? 2 : 1 },
              },
            ],
          },
        ],
      },
    ],
  };
}

/** POST the span when GITCREW_OTLP_ENDPOINT is set. A collector outage must not fail the run. */
export async function shipPhaseTrace(note: PhaseNote, env: NodeJS.ProcessEnv = process.env): Promise<void> {
  const endpoint = env.GITCREW_OTLP_ENDPOINT?.trim();
  if (!endpoint) return;
  const url = `${endpoint.replace(/\/+$/, "")}/v1/traces`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(phaseTrace(note)),
    });
  } catch {
    // Observing the run is best-effort.
  }
}
