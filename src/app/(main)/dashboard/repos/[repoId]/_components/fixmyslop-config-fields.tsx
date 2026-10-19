"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";

const SEVERITY_OPTIONS = ["critical", "high", "medium", "low"] as const;

export function FixMySlopConfigFields({
  idPrefix,
  config,
  onChange,
}: {
  idPrefix: string;
  config: Record<string, unknown>;
  onChange: (config: Record<string, unknown>) => void;
}) {
  const set = (key: string, value: unknown) => onChange({ ...config, [key]: value });
  const id = (name: string) => `${idPrefix}-fms-${name}`;

  return (
    <FieldSet>
      <FieldLegend variant="label">FixMySlop settings</FieldLegend>
      <FieldGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field>
          <FieldLabel htmlFor={id("fail-on")}>Fail on</FieldLabel>
          <NativeSelect
            id={id("fail-on")}
            value={String(config.failOn ?? "high")}
            onChange={(e) => set("failOn", e.target.value)}
          >
            {SEVERITY_OPTIONS.map((s) => (
              <NativeSelectOption key={s} value={s}>
                {s} and above
              </NativeSelectOption>
            ))}
            <NativeSelectOption value="none">never</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel htmlFor={id("min-severity")}>Report from</FieldLabel>
          <NativeSelect
            id={id("min-severity")}
            value={String(config.minSeverity ?? "low")}
            onChange={(e) => set("minSeverity", e.target.value)}
          >
            {SEVERITY_OPTIONS.map((s) => (
              <NativeSelectOption key={s} value={s}>
                {s}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel htmlFor={id("max-comments")}>Inline comments (max)</FieldLabel>
          <Input
            id={id("max-comments")}
            type="number"
            min={0}
            max={100}
            value={Number(config.maxComments ?? 30)}
            onChange={(e) => set("maxComments", Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
          />
        </Field>
        <Field orientation="horizontal">
          <Switch
            id={id("static")}
            checked={config.staticAnalysis === true}
            onCheckedChange={(value) => set("staticAnalysis", value)}
          />
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={id("static")}>Static analysis</FieldLabel>
            <FieldDescription className="text-xs">Also run ruff, bandit and semgrep (slower)</FieldDescription>
          </div>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
