"use client";

import { useRef, useState, useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { startGitHubAppSetup } from "@/server/setup-actions";

/** Posts the App manifest to GitHub. The server prepares it so the CSRF state cookie is set first. */
export function CreateAppForm({ defaultName }: { defaultName: string }) {
  const [name, setName] = useState(defaultName);
  const [organization, setOrganization] = useState("");
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const manifestRef = useRef<HTMLInputElement>(null);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      const result = await startGitHubAppSetup({ name, organization });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      if (!formRef.current || !manifestRef.current) return;
      formRef.current.action = result.action;
      manifestRef.current.value = result.manifest;
      formRef.current.submit();
    });
  };

  return (
    <>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <FieldGroup className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="app-name">App name</FieldLabel>
            <Input id="app-name" value={name} maxLength={34} onChange={(e) => setName(e.target.value)} />
            <FieldDescription>Must be unique on GitHub. You can rename it later.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="app-org">Organization (optional)</FieldLabel>
            <Input
              id="app-org"
              placeholder="Your personal account"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <FieldDescription>Owner of the App. You must be an admin of the organization.</FieldDescription>
          </Field>
        </FieldGroup>
        <div>
          <Button type="submit" disabled={pending}>
            {pending ? "Opening GitHub…" : "Create the App on GitHub"}
          </Button>
        </div>
      </form>
      {/* Submitted programmatically to github.com with the manifest. */}
      <form ref={formRef} method="post" className="hidden">
        <input ref={manifestRef} type="hidden" name="manifest" />
      </form>
    </>
  );
}
