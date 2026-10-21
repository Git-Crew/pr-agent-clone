import { describe, expect, it } from "vitest";

import { actionPowers, performActions } from "@/lib/agents/actions";
import type { AgentResult } from "@/lib/agents/contract";
import type { GitHubClient } from "@/lib/github/client";

const result: AgentResult = {
  conclusion: "failure",
  title: "Null crash",
  summary: "Guard the name.",
  comments: [],
  labels: ["bug"],
  rebase: true,
  rerunCi: true,
  writes: [{ path: "src/label.ts", content: 'export const label = "";\n' }],
  patch: { diff: "diff", message: "Guard the name" },
};

function fakeGitHub() {
  const calls: string[] = [];
  const github = {
    addLabels: async () => {
      calls.push("label");
    },
    updatePullBranch: async () => {
      calls.push("rebase");
    },
    rerunWorkflows: async () => {
      calls.push("rerun");
      return 1;
    },
    createDraftPull: async () => {
      calls.push("draft");
      return { number: 2 };
    },
  };
  return { calls, github: github as unknown as GitHubClient };
}

describe("action powers", () => {
  it("keeps writes off until the step turns them on", () => {
    expect(actionPowers({}, false)).toEqual({ label: false, draftPr: false, rebase: false, rerunCi: false });
    expect(actionPowers({ allowLabel: true, allowDraftPr: true }, false).label).toBe(true);
  });

  it("refuses writes from a fork even when the step asked", async () => {
    const { calls, github } = fakeGitHub();
    await performActions(github, {
      fullName: "octo/app",
      prNumber: 1,
      baseRef: "main",
      headSha: "abc",
      stepId: "12345678-aaaa",
      isFork: true,
      config: { allowLabel: true, allowDraftPr: true, allowRebase: true, allowRerunCi: true },
      result,
    });
    expect(calls).toEqual([]);
  });

  it("performs only the switches that are on", async () => {
    const { calls, github } = fakeGitHub();
    await performActions(github, {
      fullName: "octo/app",
      prNumber: 1,
      baseRef: "main",
      headSha: "abc",
      stepId: "12345678-aaaa",
      isFork: false,
      config: { allowLabel: true, allowDraftPr: true },
      result,
    });
    expect(calls).toEqual(["label", "draft"]);
  });
});
