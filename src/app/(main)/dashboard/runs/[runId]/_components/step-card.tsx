import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AgentComment } from "@/lib/agents/contract";
import type { RunStep } from "@/lib/db/schema";

import { StatusBadge } from "../../../_components/status-badge";

const METRIC_LABELS: Record<string, string> = {
  grade: "Grade",
  slopScore: "Slop score",
  scannedFiles: "Files scanned",
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

function findings(step: RunStep): AgentComment[] {
  const comments = (step.result as { comments?: AgentComment[] } | null)?.comments;
  return Array.isArray(comments) ? comments : [];
}

export function StepCard({ step }: { step: RunStep }) {
  const metrics = Object.keys(METRIC_LABELS)
    .filter((key) => step.metrics?.[key] !== undefined)
    .map((key) => [key, step.metrics?.[key]] as const);
  const items = findings(step);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {step.agentName}
          {step.blocking ? <Badge>Blocking</Badge> : null}
        </CardTitle>
        <CardDescription>{step.title ?? step.skipReason ?? "Waiting for the runner"}</CardDescription>
        <CardAction>
          <StatusBadge status={step.status} conclusion={step.conclusion} />
        </CardAction>
      </CardHeader>
      {metrics.length > 0 || items.length > 0 || step.summary ? (
        <CardContent className="flex flex-col gap-4">
          {metrics.length > 0 ? (
            <dl className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {metrics.map(([key, value]) => (
                <div key={key} className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground text-xs">{METRIC_LABELS[key]}</dt>
                  <dd className="font-medium text-lg leading-none">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {step.summary && metrics.length === 0 ? (
            <p className="whitespace-pre-wrap text-muted-foreground text-sm">{step.summary}</p>
          ) : null}

          {items.length > 0 ? (
            <div className="max-h-96 overflow-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Finding</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={`${item.path}:${item.line}:${item.body.slice(0, 40)}`}>
                      <TableCell className="align-top font-mono text-xs">
                        {item.path}:{item.line}
                      </TableCell>
                      <TableCell className="whitespace-normal text-xs">
                        {item.body.split("\n")[0].replaceAll("**", "").replaceAll("`", "")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </CardContent>
      ) : null}
    </Card>
  );
}
