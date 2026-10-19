import { ArrowUpRight, Bot, Plug, ScanSearch } from "lucide-react";
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
import { BUILTIN_AGENTS } from "@/lib/agents/registry";
import { requireUser } from "@/lib/db/dashboard";

import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = { title: "Agents · Agent PR" };

const RESULT_EXAMPLE = `{
  "conclusion": "failure",
  "title": "2 risky changes",
  "summary": "Markdown shown on the check run.",
  "comments": [
    { "path": "src/app.ts", "line": 42, "severity": "high", "body": "Unvalidated input reaches the SQL query." }
  ],
  "metrics": { "risk": 7 }
}`;

const PLANNED = [
  {
    name: "PR Review",
    Icon: Bot,
    description:
      "An LLM reads the diff and posts a summary and review comments, using the provider key you store as an encrypted secret.",
  },
  {
    name: "Bring your own agent",
    Icon: Plug,
    description:
      "Register any HTTPS endpoint. Agent PR sends it a signed request with the PR context and turns its JSON reply into a check run and review.",
  },
];

export default async function Page() {
  await requireUser();

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Agents"
        description="Built-in agents and your own share one contract: PR context in, a verdict and comments out."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Available agents">
        {BUILTIN_AGENTS.map((agent) => (
          <Card key={agent.slug}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScanSearch className="size-4" aria-hidden />
                {agent.name}
              </CardTitle>
              <CardDescription>Built-in · runs in your GitHub Actions</CardDescription>
              <CardAction>
                <Badge variant="secondary">Available</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <p className="text-muted-foreground">{agent.description}</p>
              <dl className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(agent.configSchema.parse({})).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="font-mono">{Array.isArray(value) ? value.join(", ") || "—" : String(value)}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
            {agent.docsUrl ? (
              <CardFooter>
                <Button asChild variant="ghost" size="sm">
                  <a href={agent.docsUrl} target="_blank" rel="noreferrer">
                    Documentation
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Button>
              </CardFooter>
            ) : null}
          </Card>
        ))}

        {PLANNED.map(({ name, Icon, description }) => (
          <Card key={name} className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="size-4" aria-hidden />
                {name}
              </CardTitle>
              <CardDescription>On the roadmap</CardDescription>
              <CardAction>
                <Badge variant="outline">Next</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>The agent contract</CardTitle>
          <CardDescription>
            Every agent returns this shape. Agent PR, not the agent, posts it to GitHub: inline comments land on lines
            in the diff, and the conclusion drives the agent&apos;s check run. Blocking agents fail the check; others
            are neutral.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock size="sm">
            <CodeBlockHeader>
              <CodeBlockTitle>AgentResult</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value={RESULT_EXAMPLE} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent>{RESULT_EXAMPLE}</CodeBlockContent>
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
