import { notFound } from "next/navigation";

import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BUILTIN_AGENTS } from "@/lib/agents/registry";
import { getPipeline, getRepo, listAgents, listRuns, requireUser } from "@/lib/db/dashboard";
import { getAppUrl } from "@/lib/env";
import { checkRunName } from "@/lib/pipeline/orchestrator";
import { renderWorkflow, WORKFLOW_PATH } from "@/lib/runner/workflow";

import { PageHeader } from "../../_components/page-header";
import { RunsTable } from "../../_components/runs-table";
import { PipelineEditor } from "./_components/pipeline-editor";
import { WorkflowSetup } from "./_components/workflow-setup";

export const metadata: Metadata = { title: "Repository · Agent PR" };

export default async function Page({ params }: { params: Promise<{ repoId: string }> }) {
  const user = await requireUser();
  const { repoId } = await params;
  const repo = await getRepo(user.id, Number(repoId));
  if (!repo) notFound();

  const [pipeline, agents, recent] = await Promise.all([
    getPipeline(repo.id),
    listAgents(user.id),
    listRuns(user.id, { repoId: repo.id, limit: 10 }),
  ]);
  const blockingChecks = pipeline.filter(({ step }) => step.blocking && step.enabled).map(({ agent }) => agent.name);
  const runnableAgents = agents.filter((agent) => BUILTIN_AGENTS.some((b) => b.slug === agent.slug));

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title={repo.fullName}
        description={`Agents run on pull requests into this repository. Default branch: ${repo.defaultBranch}.`}
        actions={
          <Button asChild variant="outline">
            <a href={`https://github.com/${repo.fullName}/pulls`} target="_blank" rel="noreferrer">
              Pull requests
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant={repo.enabled ? "secondary" : "outline"}>{repo.enabled ? "Enabled" : "Paused"}</Badge>
          {repo.private ? <Badge variant="outline">Private</Badge> : null}
        </div>
      </PageHeader>

      <Tabs defaultValue="pipeline" className="gap-4">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="runs">Runs</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline">
          <PipelineEditor
            repoId={repo.id}
            agents={runnableAgents.map((a) => ({
              id: a.id,
              slug: a.slug,
              name: a.name,
              defaultConfig: a.defaultConfig,
            }))}
            initialSteps={pipeline.map(({ step }) => ({
              agentId: step.agentId,
              stage: step.stage,
              enabled: step.enabled,
              blocking: step.blocking,
              includePaths: step.includePaths,
              excludePaths: step.excludePaths,
              branches: step.branches,
              runOnDrafts: step.runOnDrafts,
              runOnForks: step.runOnForks,
              config: step.config,
            }))}
          />
        </TabsContent>

        <TabsContent value="setup">
          <WorkflowSetup
            repoFullName={repo.fullName}
            defaultBranch={repo.defaultBranch}
            workflowPath={WORKFLOW_PATH}
            workflow={renderWorkflow(getAppUrl())}
            requiredChecks={blockingChecks.map(checkRunName)}
          />
        </TabsContent>

        <TabsContent value="runs">
          <Card>
            <CardHeader>
              <CardTitle>Recent runs</CardTitle>
              <CardDescription>The last 10 runs on this repository.</CardDescription>
            </CardHeader>
            <CardContent>
              <RunsTable runs={recent.runs} showRepo={false} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
