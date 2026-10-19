"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cancelRunAction } from "@/server/dashboard-actions";

export function CancelRunButton({ runId }: { runId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="destructive"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await cancelRunAction(runId);
          if (result.ok) toast.success(result.message);
          else toast.error(result.error);
        })
      }
    >
      {pending ? "Cancelling…" : "Cancel run"}
    </Button>
  );
}
