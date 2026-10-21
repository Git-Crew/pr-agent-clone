import type { AgentResult } from "@/lib/agents/contract";
import type { ModelReply, ModelSpec } from "@/lib/models";

export type ChangedSlice = { path: string; patch?: string };

export type CheckoutKind = "shared" | "sandbox" | "actions" | "none";

/** Every loop implements this. Checkout and memory are provided by src/lib/space, not by the loop. */
export type AgentModule = {
  id: string;
  /** "shared" stays in this app. "sandbox" is one container on the worker. "actions" is the repository's Actions job. "none" is the customer's host. */
  checkout: CheckoutKind;
  /** A folder per repository, kept after the checkout is deleted. */
  memory: boolean;
  /** May run commands inside the checkout. Forced off for a fork. */
  terminal: boolean;
  run?: (ctx: ReviewContext) => Promise<AgentResult>;
};

export type ReviewContext = {
  instructions: string;
  system?: string;
  files: ChangedSlice[];
  model: ModelSpec;
  apiKey: string;
  isFork: boolean;
  checkoutDir?: string;
  memoryDir?: string;
  complete: (prompt: { system: string; user: string }) => Promise<ModelReply>;
};
