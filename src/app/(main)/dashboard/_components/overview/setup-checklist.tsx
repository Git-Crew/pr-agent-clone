import Link from "next/link";

import { CircleCheck, CircleDashed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { appConfigured: boolean; installed: boolean; hasRepos: boolean; firstRun: boolean };

export function SetupChecklist({ appConfigured, installed, hasRepos, firstRun }: Props) {
  const steps = [
    {
      done: appConfigured,
      title: "Create the GitHub App",
      description: "One click on GitHub creates it with the right permissions and webhook.",
      action: (
        <Button asChild size="sm" variant="outline">
          <Link prefetch={false} href="/dashboard/setup">
            Set up
          </Link>
        </Button>
      ),
    },
    {
      done: installed && hasRepos,
      title: "Install GitCrew on your repositories",
      description: "Pick the repos agents may run on. New repos start with the FixMySlop agent.",
      action: (
        <Button asChild size="sm" variant="outline">
          <a href="/api/auth/github/install">Install</a>
        </Button>
      ),
    },
    {
      // The card hides once a runner reports back, so while it shows this step is still open.
      done: false,
      title: "Add the workflow file",
      description: "Commit .github/workflows/agent-pr.yml to the default branch. Agents run there, in your Actions.",
      action: (
        <Button asChild size="sm" variant="outline">
          <Link prefetch={false} href="/dashboard/repos">
            Get the file
          </Link>
        </Button>
      ),
    },
    {
      done: firstRun,
      title: "Open a pull request",
      description: "GitCrew posts a check run per agent and a review with inline comments.",
      action: null,
    },
  ];
  const completed = steps.filter((s) => s.done).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get set up</CardTitle>
        <CardDescription>
          {completed} of {steps.length} done. This card disappears after your first agent reports back.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="grid gap-3 md:grid-cols-2">
          {steps.map((step) => (
            <li key={step.title} className="flex items-start gap-3 rounded-lg border p-3">
              {step.done ? (
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" aria-label="Done" />
              ) : (
                <CircleDashed className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-label="To do" />
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-medium text-sm">{step.title}</span>
                <span className="text-muted-foreground text-xs">{step.description}</span>
              </div>
              {step.done ? null : step.action}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
