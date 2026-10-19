import type { InstallationInfo } from "@/lib/github/client";

import {
  markInstallationDeleted,
  markRepositoriesRemoved,
  type OrchestratorDeps,
  type PullRequestEvent,
  setInstallationSuspended,
  startRunForPullRequest,
  syncInstallation,
} from "./orchestrator";

// Routes a verified GitHub webhook to the orchestrator. GitHub Apps always receive `installation` and
// `installation_repositories`; `pull_request` comes from the App's event subscription.

type InstallationEvent = { action: string; installation: InstallationInfo };
type InstallationRepositoriesEvent = InstallationEvent & { repositories_removed?: { id: number }[] };

export async function handleWebhookEvent(deps: OrchestratorDeps, event: string, payload: unknown): Promise<void> {
  switch (event) {
    case "installation": {
      const { action, installation } = payload as InstallationEvent;
      if (action === "deleted") await markInstallationDeleted(deps.db, installation.id);
      else if (action === "suspend") await setInstallationSuspended(deps.db, installation.id, true);
      else if (action === "unsuspend") await setInstallationSuspended(deps.db, installation.id, false);
      else await syncInstallation(deps, installation);
      return;
    }
    case "installation_repositories": {
      const { action, installation, repositories_removed } = payload as InstallationRepositoriesEvent;
      if (action === "removed")
        await markRepositoriesRemoved(
          deps.db,
          (repositories_removed ?? []).map((r) => r.id),
        );
      // The "added" payload lacks default_branch, so re-list the installation's repos.
      else await syncInstallation(deps, installation);
      return;
    }
    case "pull_request":
      await startRunForPullRequest(deps, payload as PullRequestEvent);
      return;
    default:
      return;
  }
}
