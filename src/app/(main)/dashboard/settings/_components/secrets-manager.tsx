"use client";

import { useState, useTransition } from "react";

import { KeyRound, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { secretInputSchema } from "@/lib/pipeline/schema";
import { deleteSecret, saveSecret } from "@/server/dashboard-actions";

type SecretRow = {
  id: string;
  name: string;
  accountLogin: string;
  repoFullName: string | null;
  updatedAt: Date;
};

export function SecretsManager({
  encryptionReady,
  installations,
  repos,
  secrets,
}: {
  encryptionReady: boolean;
  installations: { id: number; accountLogin: string }[];
  repos: { id: number; fullName: string; installationId: number }[];
  secrets: SecretRow[];
}) {
  const [installationId, setInstallationId] = useState(String(installations[0]?.id ?? ""));
  const [repositoryId, setRepositoryId] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();
  const scopedRepos = repos.filter((r) => String(r.installationId) === installationId);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = secretInputSchema.safeParse({
      installationId: Number(installationId),
      repositoryId: repositoryId ? Number(repositoryId) : null,
      name,
      value,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the secret");
      return;
    }
    startTransition(async () => {
      const result = await saveSecret(parsed.data);
      if (result.ok) {
        toast.success(result.message);
        setName("");
        setValue("");
      } else toast.error(result.error);
    });
  };

  const remove = (secret: SecretRow) => {
    startTransition(async () => {
      const result = await deleteSecret(secret.id);
      if (result.ok) toast.success(result.message);
      else toast.error(result.error);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secrets</CardTitle>
        <CardDescription>
          Encrypted with AES-256-GCM before they are stored, and never shown again. Agents that call an LLM (coming
          next) read their provider key from here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {encryptionReady ? null : (
          <Alert variant="destructive">
            <AlertTitle>ENCRYPTION_KEY is not set</AlertTitle>
            <AlertDescription>Generate one with: openssl rand -base64 32</AlertDescription>
          </Alert>
        )}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <FieldGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field>
              <FieldLabel htmlFor="secret-installation">Account</FieldLabel>
              <NativeSelect
                id="secret-installation"
                value={installationId}
                onChange={(e) => {
                  setInstallationId(e.target.value);
                  setRepositoryId("");
                }}
                disabled={installations.length === 0}
              >
                {installations.map((i) => (
                  <NativeSelectOption key={i.id} value={String(i.id)}>
                    {i.accountLogin}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="secret-scope">Scope</FieldLabel>
              <NativeSelect id="secret-scope" value={repositoryId} onChange={(e) => setRepositoryId(e.target.value)}>
                <NativeSelectOption value="">All repositories</NativeSelectOption>
                {scopedRepos.map((r) => (
                  <NativeSelectOption key={r.id} value={String(r.id)}>
                    {r.fullName}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="secret-name">Name</FieldLabel>
              <Input
                id="secret-name"
                placeholder="ANTHROPIC_API_KEY"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="secret-value">Value</FieldLabel>
              <Input
                id="secret-value"
                type="password"
                autoComplete="new-password"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <FieldDescription>Saving an existing name replaces its value.</FieldDescription>
            </Field>
          </FieldGroup>
          <div>
            <Button type="submit" disabled={pending || !encryptionReady || installations.length === 0}>
              {pending ? "Saving…" : "Save secret"}
            </Button>
          </div>
        </form>

        {secrets.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <KeyRound />
              </EmptyMedia>
              <EmptyTitle>No secrets yet</EmptyTitle>
              <EmptyDescription>FixMySlop needs none. LLM agents will.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead className="hidden sm:table-cell">Updated</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {secrets.map((secret) => (
                <TableRow key={secret.id}>
                  <TableCell className="font-mono text-xs">{secret.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {secret.repoFullName ?? `All of ${secret.accountLogin}`}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {new Date(secret.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete ${secret.name}`}
                      disabled={pending}
                      onClick={() => remove(secret)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
