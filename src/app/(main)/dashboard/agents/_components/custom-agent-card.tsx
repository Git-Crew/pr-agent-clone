"use client";

import { useState, useTransition } from "react";

import { KeyRound, Plus, Trash2, Webhook } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { deleteAgent, rotateAgentSecret } from "@/server/agent-actions";

import { AddToReposDialog, type RepoOption } from "./add-to-repos-dialog";
import { SecretReveal } from "./secret-reveal";
import { TestAgentButton } from "./test-agent-button";

export type CustomAgent = { id: string; name: string; tagline: string; host: string; accountLogin: string };

export function CustomAgentCard({ agent, repos }: { agent: CustomAgent; repos: RepoOption[] }) {
  const [secret, setSecret] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="size-4" aria-hidden />
          {agent.name}
        </CardTitle>
        <CardDescription>{agent.tagline || `Hosted at ${agent.host}`}</CardDescription>
        <CardAction>
          <Badge variant="secondary">Your agent</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <p className="text-muted-foreground">
          Runs at <code>{agent.host}</code> · {agent.accountLogin}
        </p>
        <TestAgentButton agentId={agent.id} size="sm" />
        {secret ? <SecretReveal secret={secret} /> : null}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <AddToReposDialog
          agentId={agent.id}
          agentName={agent.name}
          repos={repos}
          trigger={
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Add to repositories
            </Button>
          }
        />
        <Button
          size="sm"
          variant="ghost"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const result = await rotateAgentSecret(agent.id);
              if (result.ok) {
                setSecret(result.secret);
                toast.success(result.message);
              } else toast.error(result.error);
            })
          }
        >
          <KeyRound data-icon="inline-start" />
          New secret
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="ghost">
              <Trash2 data-icon="inline-start" />
              Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove {agent.name}?</AlertDialogTitle>
              <AlertDialogDescription>
                It is taken out of every repository&apos;s pipeline. Past runs stay in the history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep it</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  startTransition(async () => {
                    const result = await deleteAgent(agent.id);
                    if (result.ok) toast.success(result.message);
                    else toast.error(result.error);
                  })
                }
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
