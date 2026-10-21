import type { ModelReply } from "./kodus";

// The model is a setting on the step. The harness and the system prompt are not.
// Any model id the provider accepts can be typed in. These three are the defaults.

export const PROVIDERS = ["anthropic", "openai", "grok"] as const;
export type ModelProvider = (typeof PROVIDERS)[number];

export type ModelSpec = { provider: ModelProvider; model: string };

export const DEFAULT_MODEL: Record<ModelProvider, string> = {
  anthropic: "claude-sonnet-4-5",
  openai: "gpt-4.1",
  grok: "grok-4",
};

const SECRET_NAME: Record<ModelProvider, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  grok: "XAI_API_KEY",
};

const CHAT_URL: Record<Exclude<ModelProvider, "anthropic">, string> = {
  openai: "https://api.openai.com/v1/chat/completions",
  grok: "https://api.x.ai/v1/chat/completions",
};

export function isProvider(value: string): value is ModelProvider {
  return (PROVIDERS as readonly string[]).includes(value);
}

/** Provider and model id from a step. A blank model id uses that provider's default. */
export function resolveModel(config: Record<string, unknown>): ModelSpec {
  const raw = typeof config.provider === "string" && config.provider.trim() ? config.provider.trim() : "anthropic";
  if (!isProvider(raw)) throw new Error(`Unknown model provider "${raw}". Use anthropic, openai, or grok.`);
  const named = typeof config.model === "string" ? config.model.trim() : "";
  return { provider: raw, model: named || DEFAULT_MODEL[raw] };
}

export function secretFor(provider: ModelProvider): string {
  return SECRET_NAME[provider];
}

/** Set on the step, or the harness default when the field is blank. */
export function promptOverride(fallback: string, value: unknown): string {
  const custom = typeof value === "string" ? value.trim() : "";
  return custom || fallback;
}

/** Provider and model for an Actions job, only when the step actually chose one. */
export function modelJobFields(config: Record<string, unknown>): Record<string, string> {
  const pickedProvider = typeof config.provider === "string" && config.provider.trim();
  const pickedModel = typeof config.model === "string" && config.model.trim();
  if (!pickedProvider && !pickedModel) return {};
  const spec = resolveModel(config);
  return { provider: spec.provider, model: spec.model };
}

type ChatBody = {
  choices?: { message?: { content?: string | null } }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number };
};

/** One completion. The caller supplies the key for the chosen provider. */
export async function completeModel(
  spec: ModelSpec,
  apiKey: string,
  prompt: { system: string; user: string },
): Promise<ModelReply> {
  if (spec.provider === "anthropic") return completeAnthropic(spec.model, apiKey, prompt);
  return completeChat(spec, apiKey, prompt);
}

async function completeAnthropic(
  model: string,
  apiKey: string,
  prompt: { system: string; user: string },
): Promise<ModelReply> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      system: prompt.system,
      messages: [{ role: "user", content: prompt.user }],
    }),
  });
  const body = (await readModelBody(response)) as {
    content?: { type?: string; text?: string }[];
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  return {
    text: body.content?.find((block) => block.type === "text")?.text ?? "",
    inputTokens: body.usage?.input_tokens,
    outputTokens: body.usage?.output_tokens,
    model,
  };
}

async function completeChat(
  spec: ModelSpec & { provider: Exclude<ModelProvider, "anthropic"> },
  apiKey: string,
  prompt: { system: string; user: string },
): Promise<ModelReply> {
  const response = await fetch(CHAT_URL[spec.provider], {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: spec.model,
      max_tokens: 2000,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
    }),
  });
  const body = (await readModelBody(response)) as ChatBody;
  const content = body.choices?.[0]?.message?.content;
  return {
    text: typeof content === "string" ? content : "",
    inputTokens: body.usage?.prompt_tokens,
    outputTokens: body.usage?.completion_tokens,
    model: spec.model,
  };
}

async function readModelBody(response: Response): Promise<unknown> {
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 180);
    throw new Error(`Model request failed (${response.status})${detail ? `: ${detail}` : ""}`);
  }
  return response.json();
}
