import { Ban, CircleCheck, CircleDashed, CircleMinus, CircleX, LoaderCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Conclusion, RunStatus, StepStatus } from "@/lib/db/schema";

type Tone = "success" | "failure" | "neutral" | "running" | "muted";

const TONE_CLASS: Record<Tone, string> = {
  success:
    "border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300",
  failure: "border-destructive/20 bg-destructive/10 text-destructive",
  neutral:
    "border-amber-200 bg-amber-500/10 text-amber-700 dark:border-amber-900/40 dark:bg-amber-500/15 dark:text-amber-300",
  running: "border-sky-200 bg-sky-500/10 text-sky-700 dark:border-sky-900/40 dark:bg-sky-500/15 dark:text-sky-300",
  muted: "text-muted-foreground",
};

function describe(status: RunStatus | StepStatus, conclusion: Conclusion | null) {
  if (status === "queued" || status === "pending")
    return { tone: "muted" as const, label: "Queued", Icon: CircleDashed };
  if (status === "running") return { tone: "running" as const, label: "Running", Icon: LoaderCircle };
  if (status === "cancelled" || conclusion === "cancelled")
    return { tone: "muted" as const, label: "Cancelled", Icon: Ban };
  if (status === "skipped" || conclusion === "skipped")
    return { tone: "muted" as const, label: "Skipped", Icon: CircleMinus };
  if (conclusion === "failure") return { tone: "failure" as const, label: "Failed", Icon: CircleX };
  if (conclusion === "neutral") return { tone: "neutral" as const, label: "Findings", Icon: CircleMinus };
  return { tone: "success" as const, label: "Passed", Icon: CircleCheck };
}

export function StatusBadge({ status, conclusion }: { status: RunStatus | StepStatus; conclusion: Conclusion | null }) {
  const { tone, label, Icon } = describe(status, conclusion);
  return (
    <Badge variant="outline" className={TONE_CLASS[tone]}>
      <Icon className={status === "running" ? "animate-spin" : undefined} aria-hidden />
      {label}
    </Badge>
  );
}
