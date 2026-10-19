import Link from "next/link";

import { GitPullRequest } from "lucide-react";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Conclusion, RunStatus, StepStatus } from "@/lib/db/schema";

import { StatusBadge } from "./status-badge";
import { TimeAgo } from "./time-ago";

export type RunRow = {
  id: string;
  repoFullName: string;
  prNumber: number;
  prTitle: string;
  prAuthor: string;
  headSha: string;
  status: RunStatus;
  conclusion: Conclusion | null;
  createdAt: Date;
  steps: {
    id: string;
    agentName: string;
    status: StepStatus;
    conclusion: Conclusion | null;
    metrics: Record<string, string | number> | null;
  }[];
};

export function RunsTable({ runs, showRepo = true }: { runs: RunRow[]; showRepo?: boolean }) {
  if (runs.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <GitPullRequest />
          </EmptyMedia>
          <EmptyTitle>No runs yet</EmptyTitle>
          <EmptyDescription>
            Runs appear here when a pull request is opened or updated in an enabled repository.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pull request</TableHead>
          {showRepo ? <TableHead className="hidden md:table-cell">Repository</TableHead> : null}
          <TableHead>Status</TableHead>
          <TableHead className="hidden lg:table-cell">Agents</TableHead>
          <TableHead className="text-right">Started</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {runs.map((run) => (
          <TableRow key={run.id}>
            <TableCell className="max-w-72">
              <Link
                prefetch={false}
                href={`/dashboard/runs/${run.id}`}
                className="block truncate font-medium hover:underline"
              >
                #{run.prNumber} {run.prTitle}
              </Link>
              <span className="text-muted-foreground text-xs">
                {run.prAuthor ? `${run.prAuthor} · ` : ""}
                <code>{run.headSha.slice(0, 7)}</code>
              </span>
            </TableCell>
            {showRepo ? (
              <TableCell className="hidden text-muted-foreground md:table-cell">{run.repoFullName}</TableCell>
            ) : null}
            <TableCell>
              <StatusBadge status={run.status} conclusion={run.conclusion} />
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <div className="flex flex-wrap gap-1.5">
                {run.steps.map((step) => (
                  <span key={step.id} className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                    {step.agentName}
                    {typeof step.metrics?.grade === "string" ? (
                      <span className="font-medium text-foreground">{step.metrics.grade}</span>
                    ) : null}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              <TimeAgo date={run.createdAt} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
