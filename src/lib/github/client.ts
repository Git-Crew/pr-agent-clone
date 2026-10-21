import { SignJWT } from "jose";

import { createPrivateKey } from "node:crypto";

// A small typed wrapper around the GitHub REST endpoints Agent PR uses. Every endpoint here is documented at
// https://docs.github.com/en/rest (API version 2022-11-28).

const API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const USER_AGENT = "agent-pr";

type FetchLike = typeof fetch;

export class GitHubApiError extends Error {
  constructor(
    readonly status: number,
    readonly method: string,
    readonly path: string,
    readonly body: string,
  ) {
    super(`GitHub API ${method} ${path} failed with ${status}: ${body.slice(0, 300)}`);
    this.name = "GitHubApiError";
  }
}

async function request<T>(
  fetchImpl: FetchLike,
  token: string,
  method: string,
  path: string,
  body?: unknown,
  scheme: "Bearer" | "token" = "Bearer",
): Promise<T> {
  const res = await fetchImpl(`${API}${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `${scheme} ${token}`,
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": USER_AGENT,
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new GitHubApiError(res.status, method, path, await res.text());
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// ─── App authentication ────────────────────────────────────────────────────

/** RS256 JWT that authenticates as the App. GitHub accepts PKCS#1 and PKCS#8 keys; Node parses both. */
export async function createAppJwt(appId: string, privateKeyPem: string, now = Date.now()): Promise<string> {
  const seconds = Math.floor(now / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: "RS256" })
    .setIssuer(appId)
    .setIssuedAt(seconds - 60) // allow for clock drift
    .setExpirationTime(seconds + 9 * 60) // GitHub's max is 10 minutes
    .sign(createPrivateKey(privateKeyPem));
}

export type GitHubAccount = { id: number; login: string; type: string; avatar_url: string };

export type InstallationInfo = {
  id: number;
  account: GitHubAccount;
  suspended_at: string | null;
};

export type InstallationRepository = {
  id: number;
  full_name: string;
  private: boolean;
  default_branch: string;
};

export type PullFile = {
  filename: string;
  status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
  additions: number;
  deletions: number;
  patch?: string;
  previous_filename?: string;
};

export type CheckRunConclusion = "success" | "failure" | "neutral" | "cancelled" | "skipped" | "action_required";

export type CheckRunInput = {
  name?: string;
  head_sha?: string;
  details_url?: string;
  external_id?: string;
  status?: "queued" | "in_progress" | "completed";
  conclusion?: CheckRunConclusion;
  started_at?: string;
  completed_at?: string;
  output?: { title: string; summary: string; text?: string };
};

export type ReviewComment = { path: string; line: number; side: "RIGHT"; body: string };

export type ReviewInput = {
  commit_id: string;
  body: string;
  event: "COMMENT" | "REQUEST_CHANGES" | "APPROVE";
  comments: ReviewComment[];
};

/** Everything the orchestrator needs from GitHub for one installation. Tests swap in a fake. */
export interface GitHubClient {
  listPullFiles(fullName: string, prNumber: number): Promise<PullFile[]>;
  createCheckRun(fullName: string, input: CheckRunInput & { name: string; head_sha: string }): Promise<{ id: number }>;
  updateCheckRun(fullName: string, checkRunId: number, input: CheckRunInput): Promise<void>;
  createReview(fullName: string, prNumber: number, input: ReviewInput): Promise<{ id: number }>;
  dispatchWorkflow(fullName: string, workflowFile: string, ref: string, inputs: Record<string, string>): Promise<void>;
  workflowExists(fullName: string, workflowFile: string): Promise<boolean>;
  listRepositories(): Promise<InstallationRepository[]>;
  contentsToken(): Promise<string>;
  addLabels(fullName: string, issueNumber: number, labels: string[]): Promise<void>;
  updatePullBranch(fullName: string, prNumber: number): Promise<void>;
  rerunWorkflows(fullName: string, headSha: string): Promise<number>;
  createDraftPull(
    fullName: string,
    input: {
      title: string;
      body: string;
      head: string;
      base: string;
      headSha: string;
      writes: { path: string; content: string }[];
    },
  ): Promise<{ number: number }>;
}

const MAX_PR_FILES_PAGES = 30; // GitHub returns at most 3000 files (30 × 100)

export class InstallationClient implements GitHubClient {
  constructor(
    private readonly getToken: () => Promise<string>,
    private readonly fetchImpl: FetchLike = fetch,
  ) {}

  private async call<T>(method: string, path: string, body?: unknown): Promise<T> {
    return request<T>(this.fetchImpl, await this.getToken(), method, path, body);
  }

  async listPullFiles(fullName: string, prNumber: number): Promise<PullFile[]> {
    const files: PullFile[] = [];
    for (let page = 1; page <= MAX_PR_FILES_PAGES; page++) {
      const batch = await this.call<PullFile[]>(
        "GET",
        `/repos/${fullName}/pulls/${prNumber}/files?per_page=100&page=${page}`,
      );
      files.push(...batch);
      if (batch.length < 100) break;
    }
    return files;
  }

  async createCheckRun(fullName: string, input: CheckRunInput & { name: string; head_sha: string }) {
    const res = await this.call<{ id: number }>("POST", `/repos/${fullName}/check-runs`, input);
    return { id: res.id };
  }

  async updateCheckRun(fullName: string, checkRunId: number, input: CheckRunInput) {
    await this.call("PATCH", `/repos/${fullName}/check-runs/${checkRunId}`, input);
  }

  async createReview(fullName: string, prNumber: number, input: ReviewInput) {
    const res = await this.call<{ id: number }>("POST", `/repos/${fullName}/pulls/${prNumber}/reviews`, input);
    return { id: res.id };
  }

  async dispatchWorkflow(fullName: string, workflowFile: string, ref: string, inputs: Record<string, string>) {
    await this.call("POST", `/repos/${fullName}/actions/workflows/${encodeURIComponent(workflowFile)}/dispatches`, {
      ref,
      inputs,
    });
  }

  async workflowExists(fullName: string, workflowFile: string) {
    try {
      await this.call("GET", `/repos/${fullName}/actions/workflows/${encodeURIComponent(workflowFile)}`);
      return true;
    } catch (error) {
      if (error instanceof GitHubApiError && error.status === 404) return false;
      throw error;
    }
  }

  async listRepositories(): Promise<InstallationRepository[]> {
    const repos: InstallationRepository[] = [];
    for (let page = 1; page <= 100; page++) {
      const res = await this.call<{ total_count: number; repositories: InstallationRepository[] }>(
        "GET",
        `/installation/repositories?per_page=100&page=${page}`,
      );
      repos.push(...res.repositories);
      if (res.repositories.length < 100 || repos.length >= res.total_count) break;
    }
    return repos;
  }

  async contentsToken() {
    return this.getToken();
  }

  async addLabels(fullName: string, issueNumber: number, labels: string[]) {
    await this.call("POST", `/repos/${fullName}/issues/${issueNumber}/labels`, { labels });
  }

  async updatePullBranch(fullName: string, prNumber: number) {
    await this.call("PUT", `/repos/${fullName}/pulls/${prNumber}/update-branch`, {});
  }

  async rerunWorkflows(fullName: string, headSha: string) {
    const res = await this.call<{ workflow_runs?: { id: number }[] }>(
      "GET",
      `/repos/${fullName}/actions/runs?head_sha=${encodeURIComponent(headSha)}&per_page=20`,
    );
    for (const run of res.workflow_runs ?? []) {
      await this.call("POST", `/repos/${fullName}/actions/runs/${run.id}/rerun`);
    }
    return res.workflow_runs?.length ?? 0;
  }

  async createDraftPull(
    fullName: string,
    input: {
      title: string;
      body: string;
      head: string;
      base: string;
      headSha: string;
      writes: { path: string; content: string }[];
    },
  ) {
    const ref = `refs/heads/${input.head}`;
    try {
      await this.call("POST", `/repos/${fullName}/git/refs`, { ref, sha: input.headSha });
    } catch (error) {
      if (!(error instanceof GitHubApiError && error.status === 422)) throw error;
    }
    for (const write of input.writes) {
      const encoded = write.path.split("/").map(encodeURIComponent).join("/");
      let sha: string | undefined;
      try {
        const existing = await this.call<{ sha: string }>(
          "GET",
          `/repos/${fullName}/contents/${encoded}?ref=${encodeURIComponent(input.head)}`,
        );
        sha = existing.sha;
      } catch (error) {
        if (!(error instanceof GitHubApiError && error.status === 404)) throw error;
      }
      await this.call("PUT", `/repos/${fullName}/contents/${encoded}`, {
        message: input.title,
        content: Buffer.from(write.content).toString("base64"),
        branch: input.head,
        ...(sha ? { sha } : {}),
      });
    }
    const pull = await this.call<{ number: number }>("POST", `/repos/${fullName}/pulls`, {
      title: input.title,
      head: input.head,
      base: input.base,
      body: input.body,
      draft: true,
    });
    return { number: pull.number };
  }
}

// ─── App-level calls and token cache ───────────────────────────────────────

export class GitHubApp {
  private readonly tokens = new Map<number, { token: string; expiresAt: number }>();

  constructor(
    private readonly appId: string,
    private readonly privateKeyPem: string,
    private readonly fetchImpl: FetchLike = fetch,
  ) {}

  private async appRequest<T>(method: string, path: string): Promise<T> {
    return request<T>(this.fetchImpl, await createAppJwt(this.appId, this.privateKeyPem), method, path);
  }

  /** The App itself: its current name and slug change when it is renamed on GitHub. */
  async getAppInfo(): Promise<{ slug: string; name: string; html_url: string }> {
    return this.appRequest("GET", "/app");
  }

  async getInstallation(installationId: number): Promise<InstallationInfo> {
    return this.appRequest<InstallationInfo>("GET", `/app/installations/${installationId}`);
  }

  /** Installation access tokens last one hour; reuse them until a minute before expiry. */
  async getInstallationToken(installationId: number): Promise<string> {
    const cached = this.tokens.get(installationId);
    if (cached && cached.expiresAt - 60_000 > Date.now()) return cached.token;
    const res = await this.appRequest<{ token: string; expires_at: string }>(
      "POST",
      `/app/installations/${installationId}/access_tokens`,
    );
    this.tokens.set(installationId, { token: res.token, expiresAt: Date.parse(res.expires_at) });
    return res.token;
  }

  forInstallation(installationId: number): GitHubClient {
    return new InstallationClient(() => this.getInstallationToken(installationId), this.fetchImpl);
  }
}

// ─── User OAuth (sign in with GitHub) ──────────────────────────────────────

export type GitHubUser = { id: number; login: string; name: string | null; email: string | null; avatar_url: string };

export async function exchangeOAuthCode(
  params: { clientId: string; clientSecret: string; code: string; redirectUri: string },
  fetchImpl: FetchLike = fetch,
): Promise<string> {
  const res = await fetchImpl("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json", "User-Agent": USER_AGENT },
    body: JSON.stringify({
      client_id: params.clientId,
      client_secret: params.clientSecret,
      code: params.code,
      redirect_uri: params.redirectUri,
    }),
    cache: "no-store",
  });
  const data = (await res.json()) as { access_token?: string; error?: string; error_description?: string };
  if (!res.ok || !data.access_token) {
    throw new Error(`GitHub OAuth failed: ${data.error_description ?? data.error ?? res.status}`);
  }
  return data.access_token;
}

export async function getAuthenticatedUser(userToken: string, fetchImpl: FetchLike = fetch): Promise<GitHubUser> {
  return request<GitHubUser>(fetchImpl, userToken, "GET", "/user");
}

/** Installations of this App that the user can access. */
export async function listUserInstallations(userToken: string, fetchImpl: FetchLike = fetch) {
  const installations: InstallationInfo[] = [];
  for (let page = 1; page <= 20; page++) {
    const res = await request<{ total_count: number; installations: InstallationInfo[] }>(
      fetchImpl,
      userToken,
      "GET",
      `/user/installations?per_page=100&page=${page}`,
    );
    installations.push(...res.installations);
    if (res.installations.length < 100 || installations.length >= res.total_count) break;
  }
  return installations;
}
