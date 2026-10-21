import { afterEach, describe, expect, it } from "vitest";

import { capabilitiesFor, moduleForSlug, placeForSlug } from "@/lib/agents/modules";
import { kodus } from "@/lib/agents/modules/kodus/agent";
import { prepareSpace } from "@/lib/space/prepare";

import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const roots: string[] = [];

afterEach(async () => {
  await Promise.all(roots.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("agent modules", () => {
  it("sends cards to a loop and FixMySlop to Actions", () => {
    expect(moduleForSlug("plain-words")?.id).toBe("kodus");
    expect(moduleForSlug("ponytail")?.id).toBe("kodus");
    expect(placeForSlug("hermes")).toBe("worker");
    expect(placeForSlug("openclaw")).toBe("worker");
    expect(placeForSlug("fixmyslop")).toBe("actions");
    expect(placeForSlug("a-customer-agent")).toBe("http");
  });

  it("gives a fork the diff only, and a terminal only to loops that declare one", () => {
    expect(capabilitiesFor("hermes", true)).toEqual(["read_diff"]);
    expect(capabilitiesFor("openclaw", false)).toEqual(["read_diff", "read_tree", "exec"]);
    expect(capabilitiesFor("plain-words", false)).toEqual(["read_diff", "read_tree"]);
  });

  it("asks kodus for JSON comments on the diff", async () => {
    const result = await kodus.run?.({
      instructions: "Flag missing tests.",
      files: [{ path: "src/a.ts", patch: "+export const n = 1" }],
      model: { provider: "openai", model: "gpt-4.1" },
      apiKey: "sk-test",
      isFork: false,
      complete: async (prompt) => {
        expect(prompt.user).toContain("src/a.ts");
        return {
          text: '{"conclusion":"failure","title":"No test","summary":"Adds code without a test.","comments":[{"path":"src/a.ts","line":1,"body":"Add a test.","severity":"medium"}]}',
          inputTokens: 20,
          outputTokens: 11,
          model: "crew-test",
        };
      },
    });
    expect(result?.comments[0]).toMatchObject({ path: "src/a.ts", line: 1 });
    expect(result?.metrics).toMatchObject({ inputTokens: 20, outputTokens: 11, model: "crew-test" });
  });
});

describe("shared space", () => {
  it("opens one checkout for every shared loop and a memory folder only for loops that keep one", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "gitcrew-"));
    roots.push(root);
    const hermes = moduleForSlug("hermes");
    const openclaw = moduleForSlug("openclaw");
    if (!hermes || !openclaw) throw new Error("missing loop");
    const space = await prepareSpace({
      modules: [kodus, hermes, openclaw],
      runId: "run-1",
      installationId: 7,
      repositoryId: 9,
      isFork: false,
      root,
    });
    expect(space.checkoutDir).toBe(path.join(root, "checkouts", "run-1"));
    expect(space.memoryDir("hermes")).toBe(path.join(root, "memory", "hermes", "7", "9"));
    expect(space.memoryDir("openclaw")).toBe(path.join(root, "memory", "openclaw", "7", "9"));
    expect(space.memoryDir("kodus")).toBeUndefined();
    await space.close();
  });

  it("keeps the checkout for a fork and writes no memory", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "gitcrew-"));
    roots.push(root);
    const hermes = moduleForSlug("hermes");
    if (!hermes) throw new Error("missing loop");
    const space = await prepareSpace({
      modules: [hermes],
      runId: "run-2",
      installationId: 7,
      repositoryId: 9,
      isFork: true,
      root,
    });
    expect(space.checkoutDir).toBeUndefined();
    expect(space.memoryDir("hermes")).toBeUndefined();
    await space.close();
  });
});
