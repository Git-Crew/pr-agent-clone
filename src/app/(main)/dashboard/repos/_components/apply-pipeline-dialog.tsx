"use client";

import { type ReactNode, useState, useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { RepoListItem } from "@/lib/db/dashboard";
import { applyPipelineToRepos } from "@/server/dashboard-actions";

/** Fleet rollout: copy one repository's pipeline onto every selected repository. */
export function ApplyPipelineDialog({
  repos,
  targetIds,
  trigger,
  onApplied,
}: {
  repos: RepoListItem[];
  targetIds: number[];
  trigger: ReactNode;
  onApplied: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [sourceId, setSourceId] = useState<string>("");
  const [pending, startTransition] = useTransition();
  const sources = repos.filter((r) => r.steps.length > 0);
  const targets = targetIds.filter((id) => String(id) !== sourceId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply a pipeline</DialogTitle>
          <DialogDescription>
            Replace the pipeline of {targets.length} selected repositor{targets.length === 1 ? "y" : "ies"} with a copy
            of another repository&apos;s pipeline.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="pipeline-source">Copy the pipeline from</FieldLabel>
          <NativeSelect id="pipeline-source" value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
            <NativeSelectOption value="">Choose a repository…</NativeSelectOption>
            {sources.map((repo) => (
              <NativeSelectOption key={repo.id} value={String(repo.id)}>
                {repo.fullName} ({repo.steps.length} agent{repo.steps.length === 1 ? "" : "s"})
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldDescription>Existing pipelines on the selected repositories are replaced.</FieldDescription>
        </Field>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={!sourceId || targets.length === 0 || pending}
            onClick={() =>
              startTransition(async () => {
                const result = await applyPipelineToRepos(Number(sourceId), targets);
                if (result.ok) {
                  toast.success(result.message);
                  setOpen(false);
                  onApplied();
                } else toast.error(result.error);
              })
            }
          >
            {pending ? "Applying…" : `Apply to ${targets.length}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
