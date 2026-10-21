"use client";

import { useState, useTransition } from "react";

import Link from "next/link";

import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { defaultSettings, type SettingField } from "@/lib/agents/card";
import { checkRunName } from "@/lib/pipeline/naming";
import { type PipelineStepInput, parseGlobList, pipelineInputSchema } from "@/lib/pipeline/schema";
import { savePipeline } from "@/server/dashboard-actions";

import { CardSettingsFields } from "./card-settings-fields";

export type EditorAgent = { id: string; slug: string; name: string; tagline: string; settings: SettingField[] };
type EditorStep = PipelineStepInput & { key: string };
type Strictness = "comment" | "request_changes" | "block";

let nextKey = 0;
const withKey = (step: PipelineStepInput): EditorStep => ({ ...step, key: `step-${nextKey++}` });

function newStep(agent: EditorAgent, stage: number): EditorStep {
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
    trigger: "every_push",
    triggerLabel: null,
    reviewMode: "comment",
    commentStyle: "inline",
    maxComments: 30,
    config: defaultSettings(agent.settings),
  });
}

function strictnessOf(step: PipelineStepInput): Strictness {
  if (step.blocking) return "block";
  return step.reviewMode === "request_changes" ? "request_changes" : "comment";
}

const STRICTNESS: Record<Strictness, { label: string; help: string }> = {
  comment: { label: "Just comment", help: "Leaves comments. Never stops anyone." },
  request_changes: {
    label: "Ask for changes when it fails",
    help: "Marks its review as “changes requested”. People can still merge.",
  },
  block: {
    label: "Block merging when it fails",
    help: "Its check fails and later stages are skipped. Make the check required in branch protection to enforce it.",
  },
};

function ToggleField(props: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Field orientation="horizontal">
      <Switch id={props.id} checked={props.checked} onCheckedChange={props.onChange} />
      <div className="flex flex-col gap-0.5">
        <FieldLabel htmlFor={props.id}>{props.label}</FieldLabel>
        <FieldDescription className="text-xs">{props.description}</FieldDescription>
      </div>
    </Field>
  );
}

function Question({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <FieldSet className="gap-3">
      <FieldLegend variant="label" className="flex items-center gap-2">
        <span className="flex size-5 items-center justify-center rounded-full bg-muted text-xs">{number}</span>
        {title}
      </FieldLegend>
      {children}
    </FieldSet>
  );
}

export function PipelineEditor({
  repoId,
  agents,
  initialSteps,
}: {
  repoId: number;
  agents: EditorAgent[];
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
    const parsed = pipelineInputSchema.safeParse(steps.map(({ key: _key, ...step }) => step));
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
          Agents in the same stage run together; stages run one after another. More agents on the{" "}
          <Link prefetch={false} href="/dashboard/agents" className="underline">
            Agents page
          </Link>
          .
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
            <EmptyTitle>No agents on this repository</EmptyTitle>
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
            {steps.filter((s) => s.stage === stage).length > 1 ? (
              <span className="text-muted-foreground text-xs">These run together</span>
            ) : null}
          </div>
          {steps
            .filter((s) => s.stage === stage)
            .map((step) => {
              const agent = agentById.get(step.agentId);
              const index = steps.findIndex((s) => s.key === step.key);
              const id = (name: string) => `${step.key}-${name}`;
              const strictness = strictnessOf(step);
              const basicSettings = agent?.settings.filter((f) => !f.advanced) ?? [];
              const advancedSettings = agent?.settings.filter((f) => f.advanced) ?? [];
              return (
                <Card key={step.key} className={step.enabled ? undefined : "opacity-70"}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {agent?.name ?? "Unknown agent"}
                      {step.blocking ? <Badge>Blocks merging</Badge> : null}
                      {step.enabled ? null : <Badge variant="outline">Off</Badge>}
                    </CardTitle>
                    <CardDescription>
                      {agent?.tagline ? `${agent.tagline} · ` : ""}Shows as{" "}
                      <code>{checkRunName(agent?.name ?? "?")}</code>
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
                      <Button variant="ghost" size="icon-sm" aria-label="Remove agent" onClick={() => remove(step.key)}>
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
                            update(step.key, {
                              agentId: e.target.value,
                              config: next ? defaultSettings(next.settings) : {},
                            });
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
                      <ToggleField
                        id={id("enabled")}
                        label="On"
                        description="Turn off to pause this agent here"
                        checked={step.enabled}
                        onChange={(enabled) => update(step.key, { enabled })}
                      />
                    </FieldGroup>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <Question number={1} title="When should it run?">
                        <NativeSelect
                          aria-label="When should it run?"
                          value={step.trigger}
                          onChange={(e) =>
                            update(step.key, { trigger: e.target.value as PipelineStepInput["trigger"] })
                          }
                        >
                          <NativeSelectOption value="every_push">On every push to the pull request</NativeSelectOption>
                          <NativeSelectOption value="opened">Only when the pull request is opened</NativeSelectOption>
                          <NativeSelectOption value="label">
                            Only when a label is on the pull request
                          </NativeSelectOption>
                        </NativeSelect>
                        {step.trigger === "label" ? (
                          <Field>
                            <FieldLabel htmlFor={id("label")}>Label</FieldLabel>
                            <Input
                              id={id("label")}
                              placeholder="security-review"
                              value={step.triggerLabel ?? ""}
                              maxLength={50}
                              onChange={(e) => update(step.key, { triggerLabel: e.target.value })}
                            />
                            <FieldDescription className="text-xs">
                              Adding this label to a pull request starts the agent.
                            </FieldDescription>
                          </Field>
                        ) : null}
                      </Question>

                      <Question number={2} title="Which files?">
                        <Field>
                          <FieldLabel htmlFor={id("include")}>Only these paths</FieldLabel>
                          <Textarea
                            id={id("include")}
                            rows={2}
                            placeholder={"src/**\napps/web/**"}
                            defaultValue={step.includePaths.join("\n")}
                            onBlur={(e) => update(step.key, { includePaths: parseGlobList(e.target.value) })}
                          />
                          <FieldDescription className="text-xs">Empty means every changed file.</FieldDescription>
                        </Field>
                        <Field>
                          <FieldLabel htmlFor={id("exclude")}>Skip these paths</FieldLabel>
                          <Textarea
                            id={id("exclude")}
                            rows={2}
                            placeholder={"**/*.md\ndocs/**"}
                            defaultValue={step.excludePaths.join("\n")}
                            onBlur={(e) => update(step.key, { excludePaths: parseGlobList(e.target.value) })}
                          />
                        </Field>
                      </Question>

                      <Question number={3} title="How strict?">
                        <NativeSelect
                          aria-label="How strict?"
                          value={strictness}
                          onChange={(e) => {
                            const value = e.target.value as Strictness;
                            update(step.key, {
                              blocking: value === "block",
                              reviewMode: value === "request_changes" ? "request_changes" : "comment",
                            });
                          }}
                        >
                          {(Object.keys(STRICTNESS) as Strictness[]).map((value) => (
                            <NativeSelectOption key={value} value={value}>
                              {STRICTNESS[value].label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <FieldDescription className="text-xs">{STRICTNESS[strictness].help}</FieldDescription>
                      </Question>

                      <Question number={4} title="How chatty?">
                        <NativeSelect
                          aria-label="How chatty?"
                          value={step.commentStyle}
                          onChange={(e) =>
                            update(step.key, { commentStyle: e.target.value as PipelineStepInput["commentStyle"] })
                          }
                        >
                          <NativeSelectOption value="inline">Comment on the lines it finds</NativeSelectOption>
                          <NativeSelectOption value="summary">One summary comment only</NativeSelectOption>
                        </NativeSelect>
                        {step.commentStyle === "inline" ? (
                          <Field>
                            <FieldLabel htmlFor={id("max")}>At most this many line comments</FieldLabel>
                            <Input
                              id={id("max")}
                              type="number"
                              min={0}
                              max={100}
                              value={step.maxComments}
                              onChange={(e) =>
                                update(step.key, {
                                  maxComments: Math.max(0, Math.min(100, Number(e.target.value) || 0)),
                                })
                              }
                            />
                          </Field>
                        ) : null}
                      </Question>
                    </div>

                    {basicSettings.length > 0 ? (
                      <FieldSet>
                        <FieldLegend variant="label">{agent?.name} settings</FieldLegend>
                        <FieldGroup className="grid gap-4 md:grid-cols-2">
                          <CardSettingsFields
                            idPrefix={step.key}
                            fields={basicSettings}
                            values={step.config}
                            onChange={(config) => update(step.key, { config })}
                          />
                        </FieldGroup>
                      </FieldSet>
                    ) : null}

                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="-ml-2">
                          <ChevronDown data-icon="inline-start" />
                          Advanced
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="flex flex-col gap-4 pt-3">
                        <FieldGroup className="grid gap-4 md:grid-cols-3">
                          <Field>
                            <FieldLabel htmlFor={id("branches")}>Only pull requests into</FieldLabel>
                            <Input
                              id={id("branches")}
                              placeholder="Any branch"
                              defaultValue={step.branches.join(", ")}
                              onBlur={(e) => update(step.key, { branches: parseGlobList(e.target.value) })}
                            />
                          </Field>
                          <ToggleField
                            id={id("drafts")}
                            label="Run on drafts"
                            description="Include draft pull requests"
                            checked={step.runOnDrafts}
                            onChange={(runOnDrafts) => update(step.key, { runOnDrafts })}
                          />
                          <ToggleField
                            id={id("forks")}
                            label="Run on forks"
                            description="Pull requests from forks, without any secrets"
                            checked={step.runOnForks}
                            onChange={(runOnForks) => update(step.key, { runOnForks })}
                          />
                        </FieldGroup>
                        {advancedSettings.length > 0 ? (
                          <FieldGroup className="grid gap-4 md:grid-cols-2">
                            <CardSettingsFields
                              idPrefix={step.key}
                              fields={advancedSettings}
                              values={step.config}
                              onChange={(config) => update(step.key, { config })}
                            />
                          </FieldGroup>
                        ) : null}
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              );
            })}
        </section>
      ))}
    </div>
  );
}
