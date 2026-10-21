import type { AgentResult } from "@/lib/agents/contract";
import type { GitHubClient } from "@/lib/github/client";

export type ActionPowers = {
  label: boolean;
  draftPr: boolean;
  rebase: boolean;
  rerunCi: boolean;
};

/** Commenting stays on. Writes stay off until the step turns each one on, and a fork cannot turn them on. */
export function actionPowers(config: Record<string, unknown>, isFork: boolean): ActionPowers {
  const on = (key: string) => !isFork && config[key] === true;
  return {
    label: on("allowLabel"),
    draftPr: on("allowDraftPr"),
    rebase: on("allowRebase"),
    rerunCi: on("allowRerunCi"),
  };
}

export async function performActions(
  github: GitHubClient,
  input: {
    fullName: string;
    prNumber: number;
    baseRef: string;
    headSha: string;
    stepId: string;
    isFork: boolean;
    config: Record<string, unknown>;
    result: AgentResult;
  },
): Promise<void> {
  const powers = actionPowers(input.config, input.isFork);
  if (powers.label && input.result.labels && input.result.labels.length > 0) {
    await github.addLabels(input.fullName, input.prNumber, input.result.labels);
  }
  if (powers.rebase && input.result.rebase) {
    await github.updatePullBranch(input.fullName, input.prNumber);
  }
  if (powers.rerunCi && input.result.rerunCi) {
    await github.rerunWorkflows(input.fullName, input.headSha);
  }
  if (powers.draftPr && input.result.writes && input.result.writes.length > 0) {
    await github.createDraftPull(input.fullName, {
      title: input.result.patch?.message || input.result.title,
      body: input.result.summary,
      head: `gitcrew/draft-${input.stepId.slice(0, 8)}`,
      base: input.baseRef,
      headSha: input.headSha,
      writes: input.result.writes,
    });
  }
}
