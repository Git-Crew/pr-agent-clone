import "server-only";

import { db } from "@/lib/db/drizzle";
import { getAppUrl } from "@/lib/env";
import { loadGitHubAppConfig, type ResolvedAppConfig, updateAppIdentity } from "@/lib/github/app-config";
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

/**
 * Ask GitHub for the App's current name and slug (they change when it is renamed) and store them.
 * Best effort: on any error the stored values are kept.
 */
export async function syncGitHubAppIdentity(): Promise<ResolvedAppConfig | null> {
  const config = await getGitHubAppConfig();
  if (!config || config.source !== "database" || !cached) return config;
  try {
    const info = await cached.app.getAppInfo();
    if (info.slug !== config.GITHUB_APP_SLUG || info.html_url !== config.htmlUrl) {
      await updateAppIdentity(db, { slug: info.slug, htmlUrl: info.html_url });
      resetGitHubAppCache();
      return getGitHubAppConfig();
    }
  } catch (error) {
    console.warn("Could not refresh the GitHub App identity", error);
  }
  return config;
}

export async function getOrchestratorDeps(): Promise<OrchestratorDeps> {
  await requireGitHubAppConfig();
  const app = cached?.app as GitHubApp;
  return { db, github: (installationId) => app.forInstallation(installationId), appUrl: getAppUrl() };
}
