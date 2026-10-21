import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowUpRight, GitBranch, GitCommitHorizontal } from "lucide-react";
import type { Metadata } from "next";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRun, requireUser } from "@/lib/db/dashboard";

import { PageHeader } from "../../_components/page-header";
import { StatusBadge } from "../../_components/status-badge";
import { TimeAgo } from "../../_components/time-ago";
import { CancelRunButton } from "./_components/cancel-run-button";
import { RunLogs } from "./_components/run-logs";
import { StepCard } from "./_components/step-card";

export const metadata: Metadata = { title: "Run · GitCrew" };

export default async function Page({ params }: { params: Promise<{ runId: string }> }) {
  const user = await requireUser();
  const { runId } = await params;
  if (!z.uuid().safeParse(runId).success) notFound();
  const data = await getRun(user.id, runId);
  if (!data) notFound();
  const { run, repo, steps, logs } = data;

  const stages = [...new Set(steps.map((s) => s.stage))].sort((a, b) => a - b);
  const active = run.status === "queued" || run.status === "running";

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title={`#${run.prNumber} ${run.prTitle}`}
        description={
          <>
            <Link prefetch={false} href={`/dashboard/repos/${repo.id}`} className="hover:underline">
              {repo.fullName}
            </Link>{" "}
            · {run.trigger.replace("pull_request.", "PR ")} by {run.prAuthor || "unknown"} ·{" "}
            <TimeAgo date={run.createdAt} />
          </>
        }
        actions={
          <>
            {active ? <CancelRunButton runId={run.id} /> : null}
            <Button asChild variant="outline">
              <a href={run.prUrl} target="_blank" rel="noreferrer">
                Open PR
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={run.status} conclusion={run.conclusion} />
          <Badge variant="outline" className="gap-1">
            <GitBranch />
            {run.headRef} → {run.baseRef}
          </Badge>
          <Badge variant="outline" className="gap-1 font-mono">
            <GitCommitHorizontal />
            {run.headSha.slice(0, 7)}
          </Badge>
          {run.isFork ? <Badge variant="outline">Fork</Badge> : null}
          {run.error ? <span className="text-muted-foreground text-xs">{run.error}</span> : null}
        </div>
      </PageHeader>

      {stages.map((stage) => (
        <section key={stage} className="flex flex-col gap-3" aria-label={`Stage ${stage}`}>
          <Badge variant="outline">Stage {stage}</Badge>
          <div className="grid gap-4 lg:grid-cols-2">
            {steps
              .filter((s) => s.stage === stage)
              .map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
          </div>
        </section>
      ))}

      <RunLogs logs={logs} />
    </div>
  );
}
