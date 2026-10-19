import { describe, expect, it } from "vitest";

import { renderWorkflow } from "./workflow";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const REFERENCE = fileURLToPath(new URL("../../../runner/agent-pr.yml", import.meta.url));

describe("agent-pr.yml", () => {
  const yaml = renderWorkflow("https://agent-pr.example.com/");

  it("matches the reference copy in runner/agent-pr.yml", () => {
    expect(readFileSync(REFERENCE, "utf8")).toBe(yaml);
  });

  it("fills in the Agent PR URL without a trailing slash", () => {
    expect(yaml).toContain("AGENT_PR_URL: https://agent-pr.example.com\n");
    expect(yaml).not.toContain("__AGENT_PR_URL__");
  });

  it("keeps the fork-safety guarantees", () => {
    expect(yaml).toContain("workflow_dispatch:");
    const code = yaml
      .split("\n")
      .filter((line) => !line.trimStart().startsWith("#"))
      .join("\n");
    expect(code).not.toMatch(/pull_request_target|secrets\./);
    expect(yaml).toContain("persist-credentials: false");
    expect(yaml).toMatch(/permissions:\n {2}contents: read\n {2}id-token: write/);
    // Workflow inputs only reach shell scripts through env vars, never as ${{ }} inside run blocks.
    const runBlocks = yaml.split(/\n\s+run: \|\n/).slice(1);
    for (const block of runBlocks) {
      const script = block.split(/\n {6}- name:/)[0];
      expect(script).not.toContain("${{");
    }
  });

  it("uses GitHub Actions expressions literally (not JS interpolation)", () => {
    expect(yaml).toContain("RUN_ID: ${{ inputs.run_id }}");
    expect(yaml).toContain('"fixmyslop${extra}==$FMS_VERSION"');
  });
});
