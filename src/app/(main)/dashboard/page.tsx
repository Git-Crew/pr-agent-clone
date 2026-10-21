import Link from "next/link";

import { ArrowRight, Plus } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getOverviewStats, listInstallations, listRuns, requireUser } from "@/lib/db/dashboard";
import { getGitHubAppConfig } from "@/lib/server/deps";

import { SetupChecklist } from "./_components/overview/setup-checklist";
import { StatCards } from "./_components/overview/stat-cards";
import { PageHeader } from "./_components/page-header";
import { RunsTable } from "./_components/runs-table";

export const metadata: Metadata = { title: "Overview · GitCrew" };

export default async function Page() {
  const user = await requireUser();
  const [installs, stats, recent, appConfig] = await Promise.all([
    listInstallations(user.id),
    getOverviewStats(user.id),
    listRuns(user.id, { limit: 8 }),
    getGitHubAppConfig(),
  ]);
  const runnerReported = recent.runs.some((run) => run.steps.some((step) => step.status === "completed"));

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title={`Welcome${user.githubLogin ? `, ${user.githubLogin}` : ""}`}
        description="Agents running on your pull requests, across every connected repository."
        actions={
          <Button asChild>
            <a href="/api/auth/github/install">
              <Plus data-icon="inline-start" />
              Install on GitHub
            </a>
          </Button>
        }
      />

      {runnerReported ? null : (
        <SetupChecklist
          appConfigured={appConfig !== null}
          installed={installs.length > 0}
          hasRepos={installs.some((i) => i.repoCount > 0)}
          firstRun={recent.total > 0}
        />
      )}

      <StatCards stats={stats} />

      <Card>
        <CardHeader>
          <CardTitle>Recent runs</CardTitle>
          <CardDescription>The latest pipeline runs across your repositories.</CardDescription>
          <CardAction>
            <Button asChild variant="ghost" size="sm">
              <Link prefetch={false} href="/dashboard/runs">
                All runs
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <RunsTable runs={recent.runs} />
        </CardContent>
      </Card>
    </div>
  );
}
