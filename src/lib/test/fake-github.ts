import type { CheckRunInput, GitHubClient, InstallationRepository, PullFile, ReviewInput } from "@/lib/github/client";

// An in-memory GitHub for orchestrator tests: records check runs, reviews and workflow dispatches.

export const INSTALLATION = 1001;
export const REPO: InstallationRepository = { id: 42, full_name: "octo/app", private: false, default_branch: "main" };

export class FakeGitHub implements GitHubClient {
  files: PullFile[] = [
    {
      filename: "src/a.py",
      status: "modified",
      additions: 2,
      deletions: 0,
      patch: "@@ -1,1 +1,3 @@\n import os\n+x = 1\n+y = 2",
    },
    { filename: "docs/notes.md", status: "added", additions: 1, deletions: 0, patch: "@@ -0,0 +1 @@\n+hi" },
    { filename: "src/gone.py", status: "removed", additions: 0, deletions: 3 },
  ];
  checkRuns = new Map<number, CheckRunInput & { name: string; head_sha: string }>();
  checkUpdates: { id: number; input: CheckRunInput }[] = [];
  reviews: ReviewInput[] = [];
  dispatches: { fullName: string; file: string; ref: string; inputs: Record<string, string> }[] = [];
  dispatchError: Error | null = null;
  private nextId = 1;

  async listPullFiles() {
    return this.files;
  }
  async createCheckRun(_fullName: string, input: CheckRunInput & { name: string; head_sha: string }) {
    const id = this.nextId++;
    this.checkRuns.set(id, { ...input });
    return { id };
  }
  async updateCheckRun(_fullName: string, id: number, input: CheckRunInput) {
    this.checkUpdates.push({ id, input });
    this.checkRuns.set(id, {
      ...(this.checkRuns.get(id) as CheckRunInput & { name: string; head_sha: string }),
      ...input,
    });
  }
  async createReview(_fullName: string, _pr: number, input: ReviewInput) {
    this.reviews.push(input);
    return { id: 500 + this.reviews.length };
  }
  async dispatchWorkflow(fullName: string, file: string, ref: string, inputs: Record<string, string>) {
    if (this.dispatchError) throw this.dispatchError;
    this.dispatches.push({ fullName, file, ref, inputs });
  }
  async workflowExists() {
    return true;
  }
  async listRepositories() {
    return [REPO];
  }
  async contentsToken() {
    return "ghs_test";
  }
  async addLabels() {
    // Recorded by tests that care. The default fake ignores the call.
  }
  async updatePullBranch() {
    // Recorded by tests that care. The default fake ignores the call.
  }
  async rerunWorkflows() {
    return 0;
  }
  async createDraftPull() {
    return { number: 9 };
  }
  checkByName(name: string) {
    return [...this.checkRuns.values()].filter((c) => c.name === name);
  }
}
