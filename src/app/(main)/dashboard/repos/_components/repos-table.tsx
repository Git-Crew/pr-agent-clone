"use client";

import { useState, useTransition } from "react";

import Link from "next/link";

import { Lock, Waypoints } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { RepoListItem } from "@/lib/db/dashboard";
import { setRepoEnabled } from "@/server/dashboard-actions";

import { StatusBadge } from "../../_components/status-badge";
import { ApplyPipelineDialog } from "./apply-pipeline-dialog";

function PipelineSummary({ steps }: { steps: RepoListItem["steps"] }) {
  const active = steps.filter((s) => s.enabled);
  if (active.length === 0) return <span className="text-muted-foreground text-xs">No agents</span>;
  const stages = [...new Set(active.map((s) => s.stage))].sort((a, b) => a - b);
  return (
    <div className="flex flex-wrap items-center gap-1">
      {stages.map((stage, index) => (
        <span key={stage} className="flex items-center gap-1">
          {index > 0 ? <span className="text-muted-foreground text-xs">→</span> : null}
          {active
            .filter((s) => s.stage === stage)
            .map((s) => (
              <Badge key={s.id} variant={s.blocking ? "default" : "secondary"}>
                {s.agentName}
              </Badge>
            ))}
        </span>
      ))}
    </div>
  );
}

function EnabledSwitch({ repo }: { repo: RepoListItem }) {
  const [enabled, setEnabled] = useState(repo.enabled);
  const [pending, startTransition] = useTransition();
  return (
    <Switch
      checked={enabled}
      disabled={pending}
      aria-label={`Run agents on ${repo.fullName}`}
      onCheckedChange={(value) => {
        setEnabled(value);
        startTransition(async () => {
          const result = await setRepoEnabled(repo.id, value);
          if (result.ok) toast.success(result.message);
          else {
            setEnabled(!value);
            toast.error(result.error);
          }
        });
      }}
    />
  );
}

export function ReposTable({ repos }: { repos: RepoListItem[] }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const allSelected = selected.size === repos.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggle = (id: number, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-8 flex-wrap items-center justify-between gap-2">
        <p className="text-muted-foreground text-sm">
          {selected.size > 0
            ? `${selected.size} selected`
            : `${repos.length} repositor${repos.length === 1 ? "y" : "ies"}`}
        </p>
        <ApplyPipelineDialog
          repos={repos}
          targetIds={[...selected]}
          onApplied={() => setSelected(new Set())}
          trigger={
            <Button variant="outline" size="sm" disabled={selected.size === 0}>
              <Waypoints data-icon="inline-start" />
              Apply a pipeline to selected
            </Button>
          }
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox
                aria-label="Select all repositories"
                checked={someSelected ? "indeterminate" : allSelected}
                onCheckedChange={(checked) => setSelected(checked ? new Set(repos.map((r) => r.id)) : new Set())}
              />
            </TableHead>
            <TableHead>Repository</TableHead>
            <TableHead className="hidden md:table-cell">Pipeline</TableHead>
            <TableHead className="hidden sm:table-cell">Last run</TableHead>
            <TableHead className="text-right">Enabled</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repos.map((repo) => (
            <TableRow key={repo.id} data-state={selected.has(repo.id) ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  aria-label={`Select ${repo.fullName}`}
                  checked={selected.has(repo.id)}
                  onCheckedChange={(checked) => toggle(repo.id, checked === true)}
                />
              </TableCell>
              <TableCell className="max-w-64">
                <Link
                  prefetch={false}
                  href={`/dashboard/repos/${repo.id}`}
                  className="flex items-center gap-1.5 font-medium hover:underline"
                >
                  <span className="truncate">{repo.fullName}</span>
                  {repo.private ? (
                    <Lock className="size-3 shrink-0 text-muted-foreground" aria-label="Private" />
                  ) : null}
                </Link>
                <span className="text-muted-foreground text-xs">{repo.defaultBranch}</span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <PipelineSummary steps={repo.steps} />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {repo.lastRun ? (
                  <Link
                    prefetch={false}
                    href={`/dashboard/runs/${repo.lastRun.id}`}
                    className="inline-flex items-center gap-2"
                  >
                    <StatusBadge status={repo.lastRun.status} conclusion={repo.lastRun.conclusion} />
                    <span className="text-muted-foreground text-xs">#{repo.lastRun.prNumber}</span>
                  </Link>
                ) : (
                  <span className="text-muted-foreground text-xs">Never</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <EnabledSwitch repo={repo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
