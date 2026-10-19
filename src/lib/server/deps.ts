import "server-only";

import { db } from "@/lib/db/drizzle";
import { getAppUrl, getGitHubAppEnv } from "@/lib/env";
import { GitHubApp } from "@/lib/github/client";
import type { OrchestratorDeps } from "@/lib/pipeline/orchestrator";

let app: GitHubApp | null = null;

export function getGitHubApp(): GitHubApp {
  if (!app) {
    const env = getGitHubAppEnv();
    app = new GitHubApp(env.GITHUB_APP_ID, env.GITHUB_APP_PRIVATE_KEY);
  }
  return app;
}

export function getOrchestratorDeps(): OrchestratorDeps {
  const githubApp = getGitHubApp();
  return { db, github: (installationId) => githubApp.forInstallation(installationId), appUrl: getAppUrl() };
}
