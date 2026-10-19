import { z } from "zod";

// Shared by the pipeline editor (client) and the save action (server). Keep this file dependency-free.

/** Parse a textarea / comma list of globs into a clean array. */
export function parseGlobList(input: string): string[] {
  return input
    .split(/[\n,]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

const globList = z.array(z.string().trim().min(1).max(200)).max(50);

export const pipelineStepInputSchema = z.object({
  agentId: z.uuid(),
  stage: z.number().int().min(1).max(20),
  enabled: z.boolean(),
  blocking: z.boolean(),
  includePaths: globList,
  excludePaths: globList,
  branches: globList,
  runOnDrafts: z.boolean(),
  runOnForks: z.boolean(),
  config: z.record(z.string(), z.unknown()),
});

export const pipelineInputSchema = z.array(pipelineStepInputSchema).max(20);

export type PipelineStepInput = z.infer<typeof pipelineStepInputSchema>;

export const secretInputSchema = z.object({
  installationId: z.number().int().positive(),
  repositoryId: z.number().int().positive().nullable(),
  name: z
    .string()
    .trim()
    .regex(/^[A-Z][A-Z0-9_]{1,63}$/, "Use UPPER_SNAKE_CASE, e.g. ANTHROPIC_API_KEY"),
  value: z.string().min(1).max(10_000),
});

export type SecretInput = z.infer<typeof secretInputSchema>;
