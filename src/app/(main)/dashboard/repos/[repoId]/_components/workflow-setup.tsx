import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";

export function WorkflowSetup({
  repoFullName,
  defaultBranch,
  workflowPath,
  workflow,
  requiredChecks,
}: {
  repoFullName: string;
  defaultBranch: string;
  workflowPath: string;
  workflow: string;
  requiredChecks: string[];
}) {
  const newFileUrl = `https://github.com/${repoFullName}/new/${encodeURIComponent(defaultBranch)}?filename=${encodeURIComponent(workflowPath)}`;

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <Card>
        <CardHeader>
          <CardTitle>1. Add the workflow file</CardTitle>
          <CardDescription>
            Agents run as a GitHub Actions job in this repository. Commit this file to <code>{defaultBranch}</code>. It
            only runs when Agent PR dispatches it, has no secrets, and never runs code from the pull request.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <CodeBlock size="sm">
            <CodeBlockHeader>
              <CodeBlockTitle>{workflowPath}</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value={workflow} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent className="max-h-96">{workflow}</CodeBlockContent>
          </CodeBlock>
          <div>
            <Button asChild variant="outline" size="sm">
              <a href={newFileUrl} target="_blank" rel="noreferrer">
                Create the file on GitHub
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>2. Block merges (optional)</CardTitle>
            <CardDescription>
              Each agent reports a check run. Mark the blocking ones as required status checks in branch protection.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            {requiredChecks.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {requiredChecks.map((name) => (
                  <li key={name}>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{name}</code>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No blocking agents yet. Turn on “Blocking” for a step first.</p>
            )}
            <div>
              <Button asChild variant="outline" size="sm">
                <a href={`https://github.com/${repoFullName}/settings/branches`} target="_blank" rel="noreferrer">
                  Branch protection
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>3. Open a pull request</CardTitle>
            <CardDescription>
              Every PR opened, reopened or pushed to starts a run. New pushes cancel the previous run.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
