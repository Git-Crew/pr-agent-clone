import { type AgentResult, agentResultSchema } from "@/lib/agents/contract";

// The in-process review loop. It sees the diff, not a checkout.
// Hermes and OpenClaw do not use this. They run in the repo's one Actions job.

const SYSTEM = `You review a pull request. Reply with one JSON object and nothing else:
{"conclusion":"success"|"failure"|"neutral","title":"one line","summary":"markdown","comments":[{"path":"file","line":1,"body":"what to change","severity":"critical"|"high"|"medium"|"low"}]}
Only comment on lines in the diff. No patch unless you were told to suggest a minimal one.`;

export type ChangedSlice = { path: string; patch?: string };

export type ModelReply = {
  text: string;
  inputTokens?: number;
  outputTokens?: number;
  model?: string;
};

export function reviewMessages(instructions: string, files: ChangedSlice[]): { system: string; user: string } {
  const diff = files.map((file) => `### ${file.path}\n${file.patch ?? "(no patch)"}`).join("\n\n");
  return {
    system: SYSTEM,
    user: `${instructions.trim()}\n\n${diff || "(no changed files)"}`,
  };
}

/** Pull the JSON object out of a model reply, including a fenced block. */
export function resultFromModelText(text: string): AgentResult {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = (fenced?.[1] ?? text).trim();
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("The review reply was not JSON");
  const parsed = agentResultSchema.parse(JSON.parse(body.slice(start, end + 1)));
  return {
    ...parsed,
    metrics: parsed.metrics,
  };
}

export async function runKodusHarness(input: {
  instructions: string;
  files: ChangedSlice[];
  complete: (prompt: { system: string; user: string }) => Promise<ModelReply>;
}): Promise<AgentResult> {
  const prompt = reviewMessages(input.instructions, input.files);
  const reply = await input.complete(prompt);
  const result = resultFromModelText(reply.text);
  return {
    ...result,
    metrics: {
      ...result.metrics,
      ...(reply.model ? { model: reply.model } : {}),
      ...(reply.inputTokens !== undefined ? { inputTokens: reply.inputTokens } : {}),
      ...(reply.outputTokens !== undefined ? { outputTokens: reply.outputTokens } : {}),
    },
  };
}

/** One model call for the kodus harness. The key is an installation secret, never an Actions secret. */
export async function completeAnthropic(
  apiKey: string,
  prompt: { system: string; user: string },
  model = process.env.GITCREW_MODEL || "claude-sonnet-4-5",
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
  if (!response.ok) throw new Error(`Model request failed (${response.status})`);
  const body = (await response.json()) as {
    content?: { type?: string; text?: string }[];
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  const text = body.content?.find((block) => block.type === "text")?.text ?? "";
  return {
    text,
    inputTokens: body.usage?.input_tokens,
    outputTokens: body.usage?.output_tokens,
    model,
  };
}
