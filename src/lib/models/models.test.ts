import { afterEach, describe, expect, it, vi } from "vitest";

import { completeModel, DEFAULT_MODEL, promptOverride, resolveModel, secretFor } from "./index";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("resolveModel", () => {
  it("defaults to Claude and accepts any model id", () => {
    expect(resolveModel({})).toEqual({ provider: "anthropic", model: DEFAULT_MODEL.anthropic });
    expect(resolveModel({ provider: "openai", model: "gpt-4.1-mini" })).toEqual({
      provider: "openai",
      model: "gpt-4.1-mini",
    });
    expect(resolveModel({ provider: "grok" }).model).toBe(DEFAULT_MODEL.grok);
  });

  it("rejects a provider we do not call", () => {
    expect(() => resolveModel({ provider: "google" })).toThrow(/Unknown model provider/);
  });

  it("names the secret for the chosen provider", () => {
    expect(secretFor("anthropic")).toBe("ANTHROPIC_API_KEY");
    expect(secretFor("openai")).toBe("OPENAI_API_KEY");
    expect(secretFor("grok")).toBe("XAI_API_KEY");
  });

  it("keeps a blank prompt override on the module default", () => {
    expect(promptOverride("review the diff", "  ")).toBe("review the diff");
    expect(promptOverride("review the diff", "flag missing tests")).toBe("flag missing tests");
  });
});

describe("completeModel", () => {
  it("posts the same prompt to Claude, OpenAI, and Grok", async () => {
    const seen: { url: string; body: Record<string, unknown>; keyHeader: string }[] = [];
    vi.stubGlobal("fetch", async (url: string, init: RequestInit) => {
      const headers = new Headers(init.headers);
      seen.push({
        url,
        body: JSON.parse(String(init.body)),
        keyHeader: headers.get("x-api-key") ?? headers.get("authorization") ?? "",
      });
      if (String(url).includes("anthropic")) {
        return Response.json({
          content: [{ type: "text", text: '{"conclusion":"success","title":"Ok","summary":""}' }],
          usage: { input_tokens: 3, output_tokens: 4 },
        });
      }
      return Response.json({
        choices: [{ message: { content: '{"conclusion":"success","title":"Ok","summary":""}' } }],
        usage: { prompt_tokens: 5, completion_tokens: 6 },
      });
    });

    const prompt = { system: "reply json", user: "diff" };
    const claude = await completeModel({ provider: "anthropic", model: "claude-haiku-4" }, "sk-ant", prompt);
    const openai = await completeModel({ provider: "openai", model: "gpt-4.1-nano" }, "sk-oai", prompt);
    const grok = await completeModel({ provider: "grok", model: "grok-3" }, "sk-xai", prompt);

    expect(claude).toMatchObject({ inputTokens: 3, outputTokens: 4, model: "claude-haiku-4" });
    expect(openai).toMatchObject({ inputTokens: 5, outputTokens: 6, model: "gpt-4.1-nano" });
    expect(grok.model).toBe("grok-3");
    expect(seen.map((call) => call.url)).toEqual([
      "https://api.anthropic.com/v1/messages",
      "https://api.openai.com/v1/chat/completions",
      "https://api.x.ai/v1/chat/completions",
    ]);
    expect(seen[0]?.body.system).toBe("reply json");
    expect(seen[1]?.body.model).toBe("gpt-4.1-nano");
    expect(seen[2]?.keyHeader).toBe("Bearer sk-xai");
  });
});
