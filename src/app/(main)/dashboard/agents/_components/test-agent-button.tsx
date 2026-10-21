"use client";

import { useState, useTransition } from "react";

import { CircleCheck, CircleX, Send } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { type TestOutcome, testHttpAgent } from "@/server/agent-actions";

/** Sends a sample pull request to the agent and explains what came back. */
export function TestAgentButton({ agentId, size = "default" }: { agentId: string; size?: "default" | "sm" }) {
  const [outcome, setOutcome] = useState<TestOutcome | null>(null);
  const [pending, startTransition] = useTransition();
  const worked = outcome && outcome.kind !== "error";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Button
          variant="outline"
          size={size}
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const result = await testHttpAgent(agentId);
              if (result.ok) setOutcome(result.outcome);
              else toast.error(result.error);
            })
          }
        >
          <Send data-icon="inline-start" />
          {pending ? "Sending…" : "Send a test pull request"}
        </Button>
      </div>
      {outcome ? (
        <Alert variant={worked ? "default" : "destructive"}>
          {worked ? <CircleCheck /> : <CircleX />}
          <AlertTitle>{worked ? "It works" : "Not yet"}</AlertTitle>
          <AlertDescription>
            <p>{outcome.detail}</p>
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
