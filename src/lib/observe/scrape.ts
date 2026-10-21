import type { PhaseNote } from "./phase";

// Prometheus text exposition. These are gauges over the notes you pass in
// (the scrape route passes the last 24 hours), so a later scrape may be lower.

type Bucket = { phases: number; inputTokens: number; outputTokens: number; durationMs: number };

function label(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/"/g, '\\"');
}

function keyOf(note: PhaseNote): string {
  return `${note.agentSlug}\n${note.phase}\n${note.outcome}`;
}

/** Render notes as Prometheus gauges. Labels stay low-cardinality: agent, phase, outcome. */
export function renderScrape(notes: PhaseNote[], scrapedAt = new Date()): string {
  const buckets = new Map<string, Bucket>();
  for (const note of notes) {
    const key = keyOf(note);
    const bucket = buckets.get(key) ?? { phases: 0, inputTokens: 0, outputTokens: 0, durationMs: 0 };
    bucket.phases += 1;
    bucket.inputTokens += note.inputTokens;
    bucket.outputTokens += note.outputTokens;
    bucket.durationMs += note.durationMs;
    buckets.set(key, bucket);
  }

  const lines: string[] = [
    "# HELP gitcrew_agent_phases Agent phases in the scrape window",
    "# TYPE gitcrew_agent_phases gauge",
  ];
  const tokenLines: string[] = [
    "# HELP gitcrew_agent_tokens Model tokens in the scrape window",
    "# TYPE gitcrew_agent_tokens gauge",
  ];
  const durationLines: string[] = [
    "# HELP gitcrew_agent_duration_ms Sum of phase durations in the scrape window, milliseconds",
    "# TYPE gitcrew_agent_duration_ms gauge",
  ];

  for (const [key, bucket] of buckets) {
    const [agent, phase, outcome] = key.split("\n");
    const labels = `agent="${label(agent)}",phase="${label(phase)}",outcome="${label(outcome)}"`;
    lines.push(`gitcrew_agent_phases{${labels}} ${bucket.phases}`);
    tokenLines.push(`gitcrew_agent_tokens{${labels},direction="input"} ${bucket.inputTokens}`);
    tokenLines.push(`gitcrew_agent_tokens{${labels},direction="output"} ${bucket.outputTokens}`);
    durationLines.push(`gitcrew_agent_duration_ms{${labels}} ${bucket.durationMs}`);
  }

  lines.push(...tokenLines, ...durationLines, `# scraped_at_unix ${Math.floor(scrapedAt.getTime() / 1000)}`, "");
  return lines.join("\n");
}

/** Production refuses an open scrape. Other environments stay open unless a token is set. */
export function scrapePermitted(authorization: string | null, env: { token?: string; production: boolean }): boolean {
  if (env.token) return authorization === `Bearer ${env.token}`;
  return !env.production;
}
