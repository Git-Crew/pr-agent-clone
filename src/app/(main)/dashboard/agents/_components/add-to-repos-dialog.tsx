"use client";

import { type ReactNode, useState, useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { addAgentToRepos } from "@/server/agent-actions";

export type RepoOption = { id: number; fullName: string };

/** Pick repositories and add an agent to each one's pipeline with its default settings. */
export function AddToReposDialog({
  agentId,
  agentName,
  repos,
  trigger,
}: {
  agentId: string;
  agentName: string;
  repos: RepoOption[];
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [pending, startTransition] = useTransition();
  const addLabel = selected.size === 0 ? "Add" : `Add to ${selected.size} repo${selected.size === 1 ? "" : "s"}`;

  const toggle = (id: number, on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {agentName} to repositories</DialogTitle>
          <DialogDescription>
            It runs on every pull request with sensible defaults. Fine-tune it later in each repository&apos;s pipeline.
          </DialogDescription>
        </DialogHeader>
        {repos.length === 0 ? (
          <p className="text-muted-foreground text-sm">Install the GitHub App on a repository first.</p>
        ) : (
          <div className="flex max-h-72 flex-col gap-2 overflow-auto">
            <div className="flex items-center gap-2 border-b pb-2">
              <Checkbox
                id={`all-${agentId}`}
                checked={selected.size === repos.length}
                onCheckedChange={(on) => setSelected(on ? new Set(repos.map((r) => r.id)) : new Set())}
              />
              <Label htmlFor={`all-${agentId}`}>All repositories</Label>
            </div>
            {repos.map((repo) => (
              <div key={repo.id} className="flex items-center gap-2">
                <Checkbox
                  id={`${agentId}-${repo.id}`}
                  checked={selected.has(repo.id)}
                  onCheckedChange={(on) => toggle(repo.id, on === true)}
                />
                <Label htmlFor={`${agentId}-${repo.id}`} className="font-normal">
                  {repo.fullName}
                </Label>
              </div>
            ))}
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={selected.size === 0 || pending}
            onClick={() =>
              startTransition(async () => {
                const result = await addAgentToRepos({ agentId, repoIds: [...selected] });
                if (result.ok) {
                  toast.success(result.message);
                  setOpen(false);
                  setSelected(new Set());
                } else toast.error(result.error);
              })
            }
          >
            {pending ? "Adding…" : addLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
