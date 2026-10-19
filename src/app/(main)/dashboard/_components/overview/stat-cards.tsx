import { CircleCheck, CircleX, GitPullRequestArrow, SquareLibrary } from "lucide-react";

import { Card, CardAction, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

type Stats = { activeRepos: number; runs7d: number; passRate: number | null; failing7d: number };

export function StatCards({ stats }: { stats: Stats }) {
  const items = [
    { label: "Active repositories", value: stats.activeRepos, hint: "with agents enabled", Icon: SquareLibrary },
    { label: "Runs this week", value: stats.runs7d, hint: "completed in the last 7 days", Icon: GitPullRequestArrow },
    {
      label: "Pass rate",
      value: stats.passRate === null ? "—" : `${stats.passRate}%`,
      hint: "runs with no blocking failure",
      Icon: CircleCheck,
    },
    { label: "Blocked PRs", value: stats.failing7d, hint: "runs a blocking agent failed", Icon: CircleX },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, hint, Icon }) => (
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
  );
}
