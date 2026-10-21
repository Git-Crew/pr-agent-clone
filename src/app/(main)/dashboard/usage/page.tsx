import { Activity, CircleX, Coins } from "lucide-react";
import type { Metadata } from "next";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getInstallationIds, requireUser } from "@/lib/db/dashboard";
import { db } from "@/lib/db/drizzle";
import { usageSummary } from "@/lib/observe/remember";

import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = { title: "Usage · GitCrew" };

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function tokens(value: number) {
  return value.toLocaleString("en-US");
}

function duration(ms: number) {
  if (ms < 1000) return `${ms} ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  return `${Math.floor(seconds / 60)} m ${Math.round(seconds % 60)} s`;
}

export default async function Page() {
  const user = await requireUser();
  const since = new Date(Date.now() - WEEK_MS);
  const usage = await usageSummary(db, await getInstallationIds(user.id), since);
  const cards = [
    { label: "Phases this week", value: tokens(usage.phases), hint: "finished agent steps", Icon: Activity },
    { label: "Input tokens", value: tokens(usage.inputTokens), hint: "0 until an agent reports them", Icon: Coins },
    { label: "Output tokens", value: tokens(usage.outputTokens), hint: "0 until an agent reports them", Icon: Coins },
    { label: "Failed phases", value: tokens(usage.failed), hint: "the agent reported a failure", Icon: CircleX },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Usage"
        description="Finished steps over the last 7 days. Run counts stay on Overview. Token totals appear here when an agent reports them."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, hint, Icon }) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardAction>
                <Icon className="size-4 text-muted-foreground" aria-hidden />
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-3xl leading-none tracking-tight">{value}</div>
              <p className="text-muted-foreground text-xs">{hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>By agent</CardTitle>
          <CardDescription>
            Each row is one agent across the repositories you can see. Duration is the time from start to finish.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {usage.agents.length === 0 ? (
            <Empty className="border border-dashed">
              <EmptyHeader>
                <EmptyTitle>No agent phases yet</EmptyTitle>
                <EmptyDescription>A phase is recorded when an agent finishes a pull request step.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead className="text-right">Phases</TableHead>
                  <TableHead className="text-right">Failed</TableHead>
                  <TableHead className="text-right">Input</TableHead>
                  <TableHead className="text-right">Output</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usage.agents.map((agent) => (
                  <TableRow key={agent.slug}>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell className="text-right">{tokens(agent.phases)}</TableCell>
                    <TableCell className="text-right">{tokens(agent.failed)}</TableCell>
                    <TableCell className="text-right">{tokens(agent.inputTokens)}</TableCell>
                    <TableCell className="text-right">{tokens(agent.outputTokens)}</TableCell>
                    <TableCell className="text-right">{duration(agent.durationMs)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
