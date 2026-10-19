import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RunLog } from "@/lib/db/schema";

const LEVEL_CLASS: Record<RunLog["level"], string> = {
  info: "text-muted-foreground",
  warn: "text-amber-600 dark:text-amber-400",
  error: "text-destructive",
};

export function RunLogs({ logs }: { logs: RunLog[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logs</CardTitle>
        <CardDescription>
          What the orchestrator did for this run. Runner output lives in the Actions job.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-muted-foreground text-sm">No log lines yet.</p>
        ) : (
          <ol className="flex max-h-96 flex-col gap-1 overflow-auto rounded-lg bg-muted/50 p-3 font-mono text-xs">
            {logs.map((log) => (
              <li key={log.id} className="flex gap-3">
                <time className="shrink-0 text-muted-foreground" dateTime={log.createdAt.toISOString()}>
                  {log.createdAt.toISOString().slice(11, 19)}
                </time>
                <span className={LEVEL_CLASS[log.level]}>{log.message}</span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
