"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { SettingField } from "@/lib/agents/card";
import { parseGlobList } from "@/lib/pipeline/schema";

/** Renders an agent's settings straight from its card, so new agents need no form code. */
export function CardSettingsFields({
  idPrefix,
  fields,
  values,
  onChange,
}: {
  idPrefix: string;
  fields: SettingField[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
}) {
  const set = (key: string, value: unknown) => onChange({ ...values, [key]: value });

  return fields.map((field) => {
    const id = `${idPrefix}-${field.key}`;
    const value = values[field.key] ?? field.default;
    const help = field.help ? <FieldDescription className="text-xs">{field.help}</FieldDescription> : null;

    if (field.type === "boolean") {
      return (
        <Field key={field.key} orientation="horizontal">
          <Switch id={id} checked={value === true} onCheckedChange={(on) => set(field.key, on)} />
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={id}>{field.label}</FieldLabel>
            {help}
          </div>
        </Field>
      );
    }

    let control: React.ReactNode;
    if (field.type === "select") {
      control = (
        <NativeSelect id={id} value={String(value)} onChange={(e) => set(field.key, e.target.value)}>
          {(field.options ?? []).map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      );
    } else if (field.type === "number") {
      control = (
        <Input
          id={id}
          type="number"
          min={field.min}
          max={field.max}
          value={Number(value)}
          onChange={(e) => set(field.key, Number(e.target.value) || 0)}
        />
      );
    } else if (field.type === "list") {
      control = (
        <Input
          id={id}
          defaultValue={Array.isArray(value) ? value.join(", ") : ""}
          onBlur={(e) => set(field.key, parseGlobList(e.target.value))}
        />
      );
    } else if (field.type === "textarea") {
      control = (
        <Textarea id={id} rows={3} defaultValue={String(value)} onBlur={(e) => set(field.key, e.target.value)} />
      );
    } else {
      control = <Input id={id} defaultValue={String(value)} onBlur={(e) => set(field.key, e.target.value)} />;
    }

    return (
      <Field key={field.key}>
        <FieldLabel htmlFor={id}>{field.label}</FieldLabel>
        {control}
        {help}
      </Field>
    );
  });
}
