import { describe, expect, it } from "vitest";

import { actionSpec, capabilitiesFor, jobFields, placeForSlug } from "./agents";
import { resultFromModelText, reviewMessages, runKodusHarness } from "./kodus";

describe("agent harnesses", () => {
  it("keeps kodus on the server and shares Actions for hermes and openclaw", () => {
    expect(placeForSlug("plain-words")).toBe("process");
    expect(placeForSlug("ponytail")).toBe("process");
    expect(placeForSlug("hermes")).toBe("actions");
    expect(placeForSlug("openclaw")).toBe("actions");
    expect(placeForSlug("fixmyslop", "actions")).toBe("actions");
    expect(placeForSlug("a-customer-agent")).toBe("http");
  });

  it("sends a command and a prompt only to the Actions harnesses", () => {
    expect(actionSpec("plain-words")).toEqual({});
    expect(actionSpec("hermes")).toMatchObject({ harness: "hermes", command: "hermes" });
    expect(actionSpec("openclaw").command).toBe("openclaw");
    expect(actionSpec("hermes").prompt).toContain("JSON");
  });

  it("changes the prompt and the model without changing the harness", () => {
    expect(placeForSlug("hermes")).toBe("actions");
    expect(
      jobFields("hermes", { provider: "openai", model: "gpt-4.1", system: "Be brief.", instructions: "Flag secrets." }),
    ).toEqual({
      provider: "openai",
      model: "gpt-4.1",
      prompt: "Be brief.\n\nFlag secrets.",
    });
    expect(jobFields("plain-words", { provider: "grok", model: "grok-4" })).toEqual({});
  });

  it("does not give a fork a checkout or a secret", () => {
    expect(capabilitiesFor("hermes", true)).toEqual(["read_diff"]);
    expect(capabilitiesFor("openclaw", false)).toEqual(["read_diff", "read_tree", "exec"]);
    expect(capabilitiesFor("plain-words", false)).toEqual(["read_diff"]);
  });

  it("asks the kodus harness for JSON comments on the diff", async () => {
    const messages = reviewMessages("Flag missing tests.", [{ path: "src/a.ts", patch: "+export const n = 1" }]);
    expect(messages.user).toContain("src/a.ts");
    expect(messages.user).toContain("Flag missing tests.");

    const result = await runKodusHarness({
      instructions: "Flag missing tests.",
      files: [{ path: "src/a.ts", patch: "+export const n = 1" }],
      complete: async () => ({
        text: '```json\n{"conclusion":"failure","title":"No test","summary":"Adds code without a test.","comments":[{"path":"src/a.ts","line":1,"body":"Add a test.","severity":"medium"}]}\n```',
        inputTokens: 20,
        outputTokens: 11,
        model: "crew-test",
      }),
    });
    expect(result.comments[0]).toMatchObject({ path: "src/a.ts", line: 1 });
    expect(result.metrics).toMatchObject({ inputTokens: 20, outputTokens: 11, model: "crew-test" });
  });

  it("rejects a reply that is not a review result", () => {
    expect(() => resultFromModelText("looks fine")).toThrow(/not JSON/);
  });
});
