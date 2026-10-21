"use client";

import { useState, useTransition } from "react";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { checkRunName } from "@/lib/pipeline/naming";
import { type PipelineStepInput, parseGlobList, pipelineInputSchema } from "@/lib/pipeline/schema";
import { savePipeline } from "@/server/dashboard-actions";

import { FixMySlopConfigFields } from "./fixmyslop-config-fields";

type AgentOption = { id: string; slug: string; name: string; defaultConfig: Record<string, unknown> };
type EditorStep = PipelineStepInput & { key: string };

let nextKey = 0;
const withKey = (step: PipelineStepInput): EditorStep => ({ ...step, key: `step-${nextKey++}` });

function newStep(agent: AgentOption, stage: number): EditorStep {
  return withKey({
    agentId: agent.id,
    stage,
    enabled: true,
    blocking: false,
    includePaths: [],
    excludePaths: [],
    branches: [],
    runOnDrafts: false,
    runOnForks: true,
    config: { ...agent.defaultConfig },
  });
}

function ToggleField({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Field orientation="horizontal">
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
      <div className="flex flex-col gap-0.5">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <FieldDescription className="text-xs">{description}</FieldDescription>
      </div>
    </Field>
  );
}

export function PipelineEditor({
  repoId,
  agents,
  initialSteps,
}: {
  repoId: number;
  agents: AgentOption[];
  initialSteps: PipelineStepInput[];
}) {
  const [steps, setSteps] = useState<EditorStep[]>(() => initialSteps.map(withKey));
  const [dirty, setDirty] = useState(false);
  const [pending, startTransition] = useTransition();
  const agentById = new Map(agents.map((a) => [a.id, a]));

  const update = (key: string, patch: Partial<PipelineStepInput>) => {
    setSteps((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));
    setDirty(true);
  };
  const remove = (key: string) => {
    setSteps((prev) => prev.filter((s) => s.key !== key));
    setDirty(true);
  };
  const move = (key: string, delta: -1 | 1) => {
    setSteps((prev) => {
      const index = prev.findIndex((s) => s.key === key);
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setDirty(true);
  };
  const add = () => {
    const agent = agents[0];
    if (!agent) return;
    const lastStage = steps.reduce((max, s) => Math.max(max, s.stage), 0);
    setSteps((prev) => [...prev, newStep(agent, Math.max(1, lastStage))]);
    setDirty(true);
  };

  const save = () => {
    const payload = steps.map(({ key: _key, ...step }) => step);
    const parsed = pipelineInputSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the pipeline settings");
      return;
    }
    startTransition(async () => {
      const result = await savePipeline(repoId, parsed.data);
      if (result.ok) {
        toast.success(result.message);
        setDirty(false);
      } else toast.error(result.error);
    });
  };

  const stages = [...new Set(steps.map((s) => s.stage))].sort((a, b) => a - b);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          Steps in the same stage run in parallel. Stages run in order, and a failing <strong>blocking</strong> step
          stops later stages and fails its check.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={add} disabled={agents.length === 0}>
            <Plus data-icon="inline-start" />
            Add agent
          </Button>
          <Button onClick={save} disabled={!dirty || pending}>
            {pending ? "Saving…" : "Save pipeline"}
          </Button>
        </div>
      </div>

      {steps.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyTitle>No agents in this pipeline</EmptyTitle>
            <EmptyDescription>Add an agent to run it on this repository&apos;s pull requests.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={add} disabled={agents.length === 0}>
              <Plus data-icon="inline-start" />
              Add agent
            </Button>
          </EmptyContent>
        </Empty>
      ) : null}

      {stages.map((stage) => (
        <section key={stage} className="flex flex-col gap-3" aria-label={`Stage ${stage}`}>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Stage {stage}</Badge>
            <span className="text-muted-foreground text-xs">
              {steps.filter((s) => s.stage === stage).length > 1 ? "These run together" : null}
            </span>
          </div>
          {steps
            .filter((s) => s.stage === stage)
            .map((step) => {
              const agent = agentById.get(step.agentId);
              const index = steps.findIndex((s) => s.key === step.key);
              const id = (name: string) => `${step.key}-${name}`;
              return (
                <Card key={step.key} className={step.enabled ? undefined : "opacity-70"}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {agent?.name ?? "Unknown agent"}
                      {step.blocking ? <Badge>Blocking</Badge> : null}
                      {step.enabled ? null : <Badge variant="outline">Off</Badge>}
                    </CardTitle>
                    <CardDescription>
                      Check name: <code>{checkRunName(agent?.name ?? "?")}</code>
                    </CardDescription>
                    <CardAction className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Move up"
                        disabled={index === 0}
                        onClick={() => move(step.key, -1)}
                      >
                        <ArrowUp />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Move down"
                        disabled={index === steps.length - 1}
                        onClick={() => move(step.key, 1)}
                      >
                        <ArrowDown />
                      </Button>
                      <Button variant="ghost" size="icon-sm" aria-label="Remove step" onClick={() => remove(step.key)}>
                        <Trash2 />
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <FieldGroup className="grid gap-4 md:grid-cols-3">
                      <Field>
                        <FieldLabel htmlFor={id("agent")}>Agent</FieldLabel>
                        <NativeSelect
                          id={id("agent")}
                          value={step.agentId}
                          onChange={(e) => {
                            const next = agentById.get(e.target.value);
                            update(step.key, { agentId: e.target.value, config: { ...(next?.defaultConfig ?? {}) } });
                          }}
                        >
                          {agents.map((a) => (
                            <NativeSelectOption key={a.id} value={a.id}>
                              {a.name}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor={id("stage")}>Stage</FieldLabel>
                        <Input
                          id={id("stage")}
                          type="number"
                          min={1}
                          max={20}
                          value={step.stage}
                          onChange={(e) =>
                            update(step.key, { stage: Math.max(1, Math.min(20, Number(e.target.value) || 1)) })
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor={id("branches")}>Target branches</FieldLabel>
                        <Input
                          id={id("branches")}
                          placeholder="All branches"
                          defaultValue={step.branches.join(", ")}
                          onBlur={(e) => update(step.key, { branches: parseGlobList(e.target.value) })}
                        />
                      </Field>
                    </FieldGroup>

                    <FieldGroup className="grid gap-4 md:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor={id("include")}>Only these paths</FieldLabel>
                        <Textarea
                          id={id("include")}
                          rows={3}
                          placeholder={"src/**\napps/web/**"}
                          defaultValue={step.includePaths.join("\n")}
                          onBlur={(e) => update(step.key, { includePaths: parseGlobList(e.target.value) })}
                        />
                        <FieldDescription>Glob per line. Empty runs on every PR.</FieldDescription>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor={id("exclude")}>Ignore these paths</FieldLabel>
                        <Textarea
                          id={id("exclude")}
                          rows={3}
                          placeholder={"**/*.md\ndocs/**"}
                          defaultValue={step.excludePaths.join("\n")}
                          onBlur={(e) => update(step.key, { excludePaths: parseGlobList(e.target.value) })}
                        />
                        <FieldDescription>Matching files are not scanned or counted.</FieldDescription>
                      </Field>
                    </FieldGroup>

                    <FieldGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <ToggleField
                        id={id("enabled")}
                        label="Enabled"
                        description="Run this step"
                        checked={step.enabled}
                        onChange={(enabled) => update(step.key, { enabled })}
                      />
                      <ToggleField
                        id={id("blocking")}
                        label="Blocking"
                        description="Fail the check and stop later stages"
                        checked={step.blocking}
                        onChange={(blocking) => update(step.key, { blocking })}
                      />
                      <ToggleField
                        id={id("drafts")}
                        label="Run on drafts"
                        description="Include draft PRs"
                        checked={step.runOnDrafts}
                        onChange={(runOnDrafts) => update(step.key, { runOnDrafts })}
                      />
                      <ToggleField
                        id={id("forks")}
                        label="Run on forks"
                        description="Read-only scan of fork PRs"
                        checked={step.runOnForks}
                        onChange={(runOnForks) => update(step.key, { runOnForks })}
                      />
                    </FieldGroup>

                    {agent?.slug === "fixmyslop" ? (
                      <FixMySlopConfigFields
                        idPrefix={step.key}
                        config={step.config}
                        onChange={(config) => update(step.key, { config })}
                      />
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
        </section>
      ))}
    </div>
  );
}
