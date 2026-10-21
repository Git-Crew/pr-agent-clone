import { describe, expect, it } from "vitest";

import { PROVIDERS } from "@/lib/models";

import { fromSarif, toAgentResult } from "./adapters";
import { defaultSettings, parseSettings } from "./card";
import { CATALOG, getCatalogCard } from "./catalog";
import { fixMySlopConfigSchema } from "./fixmyslop";

describe("catalog", () => {
  it("has unique slugs and FixMySlop available", () => {
    const slugs = CATALOG.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getCatalogCard("fixmyslop")?.status).toBe("available");
    const provider = getCatalogCard("plain-words")?.settings.find((field) => field.key === "provider");
    expect(provider?.options?.map((option) => option.value)).toEqual([...PROVIDERS]);
  });

  it("keeps the FixMySlop card in step with the agent's config schema", () => {
    const card = getCatalogCard("fixmyslop");
    if (!card) throw new Error("missing card");
    const defaults = defaultSettings(card.settings);
    expect(fixMySlopConfigSchema.parse(defaults)).toMatchObject(defaults);
    for (const field of card.settings.filter((f) => f.type === "select")) {
      for (const option of field.options ?? []) {
        expect(() => fixMySlopConfigSchema.parse({ [field.key]: option.value })).not.toThrow();
      }
    }
  });
});

describe("parseSettings", () => {
  const fields = getCatalogCard("fixmyslop")?.settings ?? [];

  it("fills defaults and drops unknown keys", () => {
    expect(parseSettings(fields, { failOn: "medium", evil: true })).toEqual({
      failOn: "medium",
      minSeverity: "low",
      staticAnalysis: false,
      only: [],
    });
  });

  it("rejects values outside the options", () => {
    expect(() => parseSettings(fields, { failOn: "sometimes" })).toThrow();
    expect(() => parseSettings(fields, { staticAnalysis: "yes" })).toThrow();
  });
});

const SARIF = {
  version: "2.1.0",
  runs: [
    {
      tool: { driver: { name: "eslint" } },
      results: [
        {
          ruleId: "no-eval",
          level: "error",
          message: { text: "eval can be harmful." },
          locations: [{ physicalLocation: { artifactLocation: { uri: "file://src/a.js" }, region: { startLine: 3 } } }],
        },
        {
          ruleId: "no-unused-vars",
          level: "warning",
          message: { text: "x is unused." },
          locations: [{ physicalLocation: { artifactLocation: { uri: "./src/b.js" }, region: { startLine: 9 } } }],
        },
        { message: { text: "No location, summary only." } },
      ],
    },
  ],
};

describe("output adapters", () => {
  it("turns SARIF into inline comments and fails on errors", () => {
    const result = fromSarif(SARIF, "Lint");
    expect(result.conclusion).toBe("failure");
    expect(result.title).toBe("Lint: 3 findings");
    expect(result.comments).toEqual([
      { path: "src/a.js", line: 3, severity: "high", body: "`no-eval` · eval can be harmful." },
      { path: "src/b.js", line: 9, severity: "medium", body: "`no-unused-vars` · x is unused." },
    ]);
  });

  it("detects the reply shape", () => {
    expect(toAgentResult(JSON.stringify(SARIF), "Lint").comments).toHaveLength(2);
    const native = { conclusion: "success", title: "All good", summary: "", comments: [] };
    expect(toAgentResult(JSON.stringify(native), "X")).toMatchObject({ conclusion: "success", title: "All good" });
    expect(toAgentResult("Looks fine to me.", "Bot")).toMatchObject({
      conclusion: "neutral",
      summary: "Looks fine to me.",
    });
  });

  it("explains invalid JSON results", () => {
    expect(() => toAgentResult(JSON.stringify({ conclusion: "maybe" }), "X")).toThrow(/conclusion/);
    expect(() => toAgentResult("{oops", "X", "application/json")).toThrow(/not valid JSON/);
  });
});
