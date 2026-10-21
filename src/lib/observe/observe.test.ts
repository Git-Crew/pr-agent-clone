import { describe, expect, it } from "vitest";

import { noteFromFinish, type PhaseNote } from "./phase";
import { summarizePhases } from "./remember";
import { renderScrape, scrapePermitted } from "./scrape";
import { phaseTrace } from "./trace";

const note: PhaseNote = noteFromFinish({
  agentSlug: 'fix"myslop',
  agentName: "FixMySlop",
  outcome: "failed",
  metrics: { inputTokens: 12, output_tokens: 4, model: "crew-small" },
  startedAt: new Date(0),
  finishedAt: new Date(1500),
  runId: "run-1",
  stepId: "step-1",
  repository: "octo/app",
});

describe("observability smoke", () => {
  it("reads tokens and duration off a finished step", () => {
    expect(note).toMatchObject({
      phase: "review",
      outcome: "failed",
      model: "crew-small",
      inputTokens: 12,
      outputTokens: 4,
      durationMs: 1500,
    });
  });

  it("renders Prometheus gauges and escapes label quotes", () => {
    const text = renderScrape([note], new Date(0));
    expect(text).toContain("# TYPE gitcrew_agent_phases gauge");
    expect(text).toContain('gitcrew_agent_phases{agent="fix\\"myslop",phase="review",outcome="failed"} 1');
    expect(text).toContain(
      'gitcrew_agent_tokens{agent="fix\\"myslop",phase="review",outcome="failed",direction="input"} 12',
    );
    expect(text).toContain(
      'gitcrew_agent_tokens{agent="fix\\"myslop",phase="review",outcome="failed",direction="output"} 4',
    );
    expect(text).toContain('gitcrew_agent_duration_ms{agent="fix\\"myslop",phase="review",outcome="failed"} 1500');
  });

  it("builds an OTLP span with token attributes", () => {
    const body = phaseTrace(note, {
      traceId: "ab".repeat(16),
      spanId: "cd".repeat(8),
      start: new Date(0),
      end: new Date(1500),
    });
    const span = body.resourceSpans[0].scopeSpans[0].spans[0];
    expect(span.name).toBe("gitcrew.agent.phase");
    expect(span.status.code).toBe(2);
    expect(span.traceId).toHaveLength(32);
    expect(span.attributes).toContainEqual({ key: "gen_ai.usage.input_tokens", value: { intValue: "12" } });
    expect(span.attributes).toContainEqual({ key: "gen_ai.response.model", value: { stringValue: "crew-small" } });
    expect(span.attributes).toContainEqual({ key: "gitcrew.repository", value: { stringValue: "octo/app" } });
  });

  it("requires the scrape token in production and whenever one is set", () => {
    expect(scrapePermitted(null, { production: false })).toBe(true);
    expect(scrapePermitted(null, { production: true })).toBe(false);
    expect(scrapePermitted("Bearer secret", { token: "secret", production: false })).toBe(true);
    expect(scrapePermitted("Bearer no", { token: "secret", production: false })).toBe(false);
  });

  it("rolls phases up per agent", () => {
    const summary = summarizePhases([
      note,
      { ...note, outcome: "ok", inputTokens: 1, outputTokens: 1, durationMs: 500 },
    ]);
    expect(summary).toMatchObject({ phases: 2, failed: 1, inputTokens: 13, outputTokens: 5, durationMs: 2000 });
    expect(summary.agents[0]).toMatchObject({ slug: 'fix"myslop', name: "FixMySlop", phases: 2 });
  });
});
