"use client";

import { useState, useTransition } from "react";

import { ArrowUpRight, Plug } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { connectHttpAgent } from "@/server/agent-actions";

import { SecretReveal } from "./secret-reveal";
import { TestAgentButton } from "./test-agent-button";

const GUIDE_URL = "https://github.com/MrSpideyNihal/Pr-agent/blob/main/docs/CONNECT-AN-AGENT.md";

type Step = "name" | "url" | "done";

/** Three small steps: name it, say where it lives, copy the secret and test it. */
export function ConnectAgentDialog({ installations }: { installations: { id: number; accountLogin: string }[] }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [url, setUrl] = useState("");
  const [installationId, setInstallationId] = useState(String(installations[0]?.id ?? ""));
  const [connected, setConnected] = useState<{ agentId: string; secret: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const reset = () => {
    setStep("name");
    setName("");
    setTagline("");
    setUrl("");
    setConnected(null);
  };

  const connect = () =>
    startTransition(async () => {
      const result = await connectHttpAgent({ installationId: Number(installationId), name, tagline, url });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setConnected({ agentId: result.agentId, secret: result.secret });
      setStep("done");
    });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button disabled={installations.length === 0}>
          <Plug data-icon="inline-start" />
          Connect your own agent
        </Button>
      </DialogTrigger>
      <DialogContent>
        {step === "name" ? (
          <>
            <DialogHeader>
              <DialogTitle>Connect your own agent · 1 of 3</DialogTitle>
              <DialogDescription>What should people see on their pull requests?</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="agent-name">Name</FieldLabel>
                <Input
                  id="agent-name"
                  placeholder="Security Bot"
                  value={name}
                  maxLength={40}
                  onChange={(e) => setName(e.target.value)}
                />
                <FieldDescription>Shown as the check name: GitCrew / {name || "Security Bot"}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="agent-tagline">What does it do? (optional)</FieldLabel>
                <Input
                  id="agent-tagline"
                  placeholder="Checks login and payment code for security problems"
                  value={tagline}
                  maxLength={120}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </Field>
              {installations.length > 1 ? (
                <Field>
                  <FieldLabel htmlFor="agent-account">For which account?</FieldLabel>
                  <NativeSelect
                    id="agent-account"
                    value={installationId}
                    onChange={(e) => setInstallationId(e.target.value)}
                  >
                    {installations.map((i) => (
                      <NativeSelectOption key={i.id} value={String(i.id)}>
                        {i.accountLogin}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Field>
              ) : null}
            </FieldGroup>
            <DialogFooter>
              <Button disabled={name.trim().length < 2} onClick={() => setStep("url")}>
                Next
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {step === "url" ? (
          <>
            <DialogHeader>
              <DialogTitle>Connect your own agent · 2 of 3</DialogTitle>
              <DialogDescription>
                Where does it live? GitCrew sends every pull request to this address and posts what it answers.
              </DialogDescription>
            </DialogHeader>
            <Field>
              <FieldLabel htmlFor="agent-url">Agent URL</FieldLabel>
              <Input
                id="agent-url"
                type="url"
                placeholder="https://my-agent.example.com/review"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <FieldDescription>
                Must start with https://. Any service that answers a web request works: a Vercel or Netlify function, a
                Cloudflare Worker, n8n, Zapier, a small server.{" "}
                <a href={GUIDE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center underline">
                  How to build one
                  <ArrowUpRight className="size-3" />
                </a>
              </FieldDescription>
            </Field>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("name")}>
                Back
              </Button>
              <Button disabled={!url.trim() || pending} onClick={connect}>
                {pending ? "Connecting…" : "Connect"}
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {step === "done" && connected ? (
          <>
            <DialogHeader>
              <DialogTitle>Connect your own agent · 3 of 3</DialogTitle>
              <DialogDescription>
                {name} is connected. Give it the secret below, then send a test pull request to check it answers.
              </DialogDescription>
            </DialogHeader>
            <SecretReveal secret={connected.secret} />
            <TestAgentButton agentId={connected.agentId} />
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
