import { z } from "zod";

// The one contract every agent implements: built-in, runner-executed or third-party HTTP.
// See docs/ARCHITECTURE.md §2. Agents never talk to GitHub; the orchestrator turns results into check runs and reviews.

export const SEVERITIES = ["critical", "high", "medium", "low"] as const;
export type Severity = (typeof SEVERITIES)[number];

export const severityRank: Record<Severity, number> = { critical: 4, high: 3, medium: 2, low: 1 };

export const agentCommentSchema = z.object({
  path: z.string().min(1),
  line: z.number().int().positive(),
  body: z.string().min(1).max(10_000),
  severity: z.enum(SEVERITIES).optional(),
});

export const agentResultSchema = z.object({
  conclusion: z.enum(["success", "failure", "neutral"]),
  title: z.string().min(1).max(200),
  summary: z.string().max(60_000),
  comments: z.array(agentCommentSchema).max(500).default([]),
  metrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  patch: z.object({ diff: z.string().max(200_000), message: z.string().max(200) }).optional(),
  writes: z
    .array(z.object({ path: z.string().min(1).max(500), content: z.string().max(100_000) }))
    .max(20)
    .optional(),
  labels: z.array(z.string().min(1).max(50)).max(10).optional(),
  rebase: z.boolean().optional(),
  rerunCi: z.boolean().optional(),
});

export type AgentComment = z.infer<typeof agentCommentSchema>;
export type AgentResult = z.infer<typeof agentResultSchema>;

export type AgentRequest = {
  version: 1;
  runId: string;
  stepId: string;
  agent: { slug: string; config: Record<string, unknown> };
  repository: { id: number; fullName: string; defaultBranch: string; private: boolean };
  pullRequest: {
    number: number;
    title: string;
    url: string;
    author: string;
    headSha: string;
    baseSha: string;
    headRef: string;
    baseRef: string;
    isFork: boolean;
  };
  changedFiles: { path: string; status: string; additions: number; deletions: number; patch?: string }[];
  callbackUrl: string;
};
