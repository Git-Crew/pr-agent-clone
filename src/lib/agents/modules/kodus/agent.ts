import type { AgentResult } from "@/lib/agents/contract";

import { resultFromModelText, reviewMessages } from "../prompt";
import type { AgentModule, ReviewContext } from "../types";

export const kodus: AgentModule = {
  id: "kodus",
  checkout: "shared",
  memory: false,
  terminal: false,
  run: runKodus,
};

export async function runKodus(ctx: ReviewContext): Promise<AgentResult> {
  const prompt = reviewMessages(ctx.instructions, ctx.files, ctx.system);
  const reply = await ctx.complete(prompt);
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
