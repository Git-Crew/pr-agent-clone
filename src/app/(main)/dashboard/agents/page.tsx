import { ArrowUpRight, Plus } from "lucide-react";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { CATALOG } from "@/lib/agents/catalog";
import { listAgents, listInstallations, listRepos, requireUser } from "@/lib/db/dashboard";
import { db } from "@/lib/db/drizzle";
import { ensureBuiltinAgents } from "@/lib/pipeline/orchestrator";

import { PageHeader } from "../_components/page-header";
import { AddToReposDialog } from "./_components/add-to-repos-dialog";
import { ConnectAgentDialog } from "./_components/connect-agent-dialog";
import { CustomAgentCard } from "./_components/custom-agent-card";

export const metadata: Metadata = { title: "Agents · GitCrew" };

const GUIDE_URL = "https://github.com/MrSpideyNihal/Pr-agent/blob/main/docs/CONNECT-AN-AGENT.md";

const REPLY_EXAMPLE = `{
  "conclusion": "failure",
  "title": "1 security problem",
  "summary": "Found a hard-coded key.",
  "comments": [
    { "path": "src/app.ts", "line": 2, "severity": "high", "body": "Move this key to an environment variable." }
  ]
}`;

export default async function Page() {
  const user = await requireUser();
  await ensureBuiltinAgents(db);
  const [agents, repos, installations] = await Promise.all([
    listAgents(user.id),
    listRepos(user.id),
    listInstallations(user.id),
  ]);
  const repoOptions = repos.map((r) => ({ id: r.id, fullName: r.fullName }));
  const builtinIds = new Map(agents.filter((a) => a.installationId === null).map((a) => [a.slug, a.id]));
  const accounts = new Map(installations.map((i) => [i.id, i.accountLogin]));
  const custom = agents
    .filter((a) => a.kind === "http" && a.installationId !== null)
    .map((a) => ({
      id: a.id,
      name: a.name,
      tagline: a.tagline,
      host: a.endpointUrl ? new URL(a.endpointUrl).host : "no URL",
      accountLogin: accounts.get(a.installationId ?? 0) ?? "",
    }));

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Agents"
        description="Pick ready-made agents or connect your own. Every agent reports the same way: a check on the pull request and comments on the lines it cares about."
        actions={
          <ConnectAgentDialog installations={installations.map((i) => ({ id: i.id, accountLogin: i.accountLogin }))} />
        }
      />

      <section className="flex flex-col gap-3" aria-labelledby="ready-made">
        <h2 id="ready-made" className="font-medium text-lg">
          Ready-made
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CATALOG.map((card) => {
            const agentId = builtinIds.get(card.slug);
            const available = card.status === "available" && agentId;
            return (
              <Card key={card.slug} className={available ? undefined : "border-dashed"}>
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                  <CardDescription>{card.tagline}</CardDescription>
                  <CardAction>
                    {available ? (
                      <Badge variant="secondary">Ready</Badge>
                    ) : (
                      <Badge variant="outline">Coming soon</Badge>
                    )}
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  <p className="text-muted-foreground">{card.description}</p>
                  {card.by ? <p className="text-muted-foreground text-xs">By {card.by}</p> : null}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {available ? (
                    <AddToReposDialog
                      agentId={agentId}
                      agentName={card.name}
                      repos={repoOptions}
                      trigger={
                        <Button size="sm">
                          <Plus data-icon="inline-start" />
                          Add to repositories
                        </Button>
                      }
                    />
                  ) : null}
                  {card.docsUrl ? (
                    <Button asChild size="sm" variant="ghost">
                      <a href={card.docsUrl} target="_blank" rel="noreferrer">
                        About {card.name}
                        <ArrowUpRight data-icon="inline-end" />
                      </a>
                    </Button>
                  ) : null}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="yours">
        <h2 id="yours" className="font-medium text-lg">
          Your agents
        </h2>
        {custom.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyTitle>No agents of your own yet</EmptyTitle>
              <EmptyDescription>
                Anything that answers a web request can be an agent: a serverless function, n8n, Zapier, or a small
                server. Use “Connect your own agent” and paste its URL.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {custom.map((agent) => (
              <CustomAgentCard key={agent.id} agent={agent} repos={repoOptions} />
            ))}
          </div>
        )}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>How your own agent answers</CardTitle>
          <CardDescription>
            GitCrew sends the pull request (title, changed files and their diffs) to your URL. Reply with JSON like
            this, with SARIF from any linter, or with plain text, and GitCrew posts it on the pull request.
          </CardDescription>
          <CardAction>
            <Button asChild variant="outline" size="sm">
              <a href={GUIDE_URL} target="_blank" rel="noreferrer">
                Full guide
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CodeBlock size="sm">
            <CodeBlockHeader>
              <CodeBlockTitle>Reply</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value={REPLY_EXAMPLE} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent>{REPLY_EXAMPLE}</CodeBlockContent>
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
