import "server-only";

import { db } from "@/lib/db/drizzle";
import { getAppUrl } from "@/lib/env";
import { loadGitHubAppConfig, type ResolvedAppConfig } from "@/lib/github/app-config";
import { GitHubApp } from "@/lib/github/client";
import type { OrchestratorDeps } from "@/lib/pipeline/orchestrator";

export class GitHubAppNotConfiguredError extends Error {
  constructor() {
    super("The GitHub App is not set up yet. Open /dashboard/setup.");
    this.name = "GitHubAppNotConfiguredError";
  }
}

let cached: { config: ResolvedAppConfig; app: GitHubApp } | null = null;

/** The App's credentials (env or the one-click setup), or null. Cached once found. */
export async function getGitHubAppConfig(): Promise<ResolvedAppConfig | null> {
  if (cached) return cached.config;
  const config = await loadGitHubAppConfig(db);
  if (config) cached = { config, app: new GitHubApp(config.GITHUB_APP_ID, config.GITHUB_APP_PRIVATE_KEY) };
  return config;
}

export async function requireGitHubAppConfig(): Promise<ResolvedAppConfig> {
  const config = await getGitHubAppConfig();
  if (!config) throw new GitHubAppNotConfiguredError();
  return config;
}

/** Forget the cached credentials (after the setup page saves a new App). */
export function resetGitHubAppCache() {
  cached = null;
}

export async function getOrchestratorDeps(): Promise<OrchestratorDeps> {
  await requireGitHubAppConfig();
  const app = cached?.app as GitHubApp;
  return { db, github: (installationId) => app.forInstallation(installationId), appUrl: getAppUrl() };
}
