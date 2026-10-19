import Link from "next/link";

import { ArrowRight, ArrowUpRight, Bot, Plug, ScanSearch, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { LandingThemeSwitcher } from "./_components/landing-theme-switcher";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "Agent PR · AI agents on every pull request",
  description:
    "Install a GitHub App, pick the agents that run on your pull requests, and get inline reviews and merge checks. Agents run in your own GitHub Actions.",
  alternates: {
    canonical: "/",
  },
};

const agents = [
  {
    name: "FixMySlop",
    badge: "Available",
    Icon: ScanSearch,
    description:
      "Scans the changed files for AI slop, leaked keys, swallowed errors and hallucinated packages, then reviews the PR inline with a slop score and grade.",
    features: ["Inline review", "Slop score + grade", "Merge gate"],
    url: "https://github.com/MrSpideyNihal/FixMySlop",
  },
  {
    name: "PR Review",
    badge: "Next",
    Icon: Bot,
    description:
      "An LLM reads the diff and leaves a summary and review comments, with your own provider key stored encrypted.",
    features: ["Summary", "Review comments", "Bring your own LLM"],
    url: null,
  },
  {
    name: "Your own agent",
    badge: "Next",
    Icon: Plug,
    description:
      "Point Agent PR at any HTTPS endpoint. It receives a signed request with the PR context and answers with a verdict and comments.",
    features: ["Any language", "Signed requests", "Same dashboard"],
    url: null,
  },
];

const facts = [
  { value: "1", label: "workflow file to add" },
  { value: "0", label: "secrets in your repo" },
  { value: "Actions", label: "runs in your own GitHub Actions" },
  { value: "Fork-safe", label: "no pull_request_target" },
];

const steps = [
  {
    step: "01",
    title: "Install the GitHub App",
    description: "Pick the repositories agents may run on. Every new repo starts with the FixMySlop agent.",
  },
  {
    step: "02",
    title: "Build a pipeline",
    description:
      "Choose agents, their order and the paths they watch. Mark the ones that should block a merge, then roll the pipeline out to many repos at once.",
  },
  {
    step: "03",
    title: "Reviews on every PR",
    description:
      "Each agent posts a check run and an inline review on every push. Runs, findings and logs stay in your dashboard.",
  },
];

export default function Home() {
  return (
    <main className={`${styles.landing} min-h-screen bg-background text-foreground`} data-landing-page>
      <div className="mx-auto flex w-full max-w-4xl flex-col p-4 sm:p-6 md:p-8">
        <header className="flex items-center justify-between py-4">
          <Link className="font-semibold text-sm tracking-tight" href="/" aria-label="Agent PR home" prefetch={false}>
            pr/agents
          </Link>
          <div className="flex items-center gap-3">
            <LandingThemeSwitcher />
            <Button asChild size="sm" variant="outline">
              <Link href="/auth/v1/login" prefetch={false}>
                Sign in
              </Link>
            </Button>
          </div>
        </header>

        <section className="flex flex-col items-center py-24 text-center sm:py-32 md:py-40">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-muted-foreground text-xs">
            <Sparkles className="size-3" />
            Early access
          </div>
          <h1 className="mx-auto max-w-2xl text-balance font-medium text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            AI agents on every pull request
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-base text-muted-foreground leading-relaxed sm:text-lg">
            Choose which agents review your PRs, in what order and on which paths. They comment inline and gate merges,
            and they run in your own GitHub Actions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href="/api/auth/github/login">
                Sign in with GitHub
                <ArrowRight className="ml-1 size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://github.com/MrSpideyNihal/FixMySlop" target="_blank" rel="noreferrer">
                About FixMySlop
                <ArrowUpRight className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </section>

        <Separator />

        <section className="grid grid-cols-2 gap-8 py-16 sm:py-20 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 text-center">
              <span className="font-semibold text-3xl tracking-tight">{fact.value}</span>
              <span className="text-muted-foreground text-xs">{fact.label}</span>
            </div>
          ))}
        </section>

        <Separator />

        <section className="py-16 sm:py-20">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">Agents</p>
            <h2 className="mx-auto max-w-md text-balance font-medium text-2xl tracking-tight sm:text-3xl">
              One contract. Built-in or your own.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {agents.map((agent) => {
              const body = (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-foreground/5">
                        <agent.Icon className="size-4" />
                      </div>
                      <span className="font-medium text-sm">{agent.name}</span>
                    </div>
                    <span className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
                      {agent.badge}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{agent.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {agent.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-md bg-foreground/5 px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              );
              return agent.url ? (
                <a
                  key={agent.name}
                  href={agent.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-4 rounded-lg border p-6 transition-colors hover:bg-accent/50"
                >
                  {body}
                </a>
              ) : (
                <div key={agent.name} className="flex flex-col gap-4 rounded-lg border border-dashed p-6">
                  {body}
                </div>
              );
            })}
          </div>
        </section>

        <Separator />

        <section className="py-16 sm:py-20">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">How it works</p>
            <h2 className="mx-auto max-w-md text-balance font-medium text-2xl tracking-tight sm:text-3xl">
              From install to inline review
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span className="font-mono text-muted-foreground text-xs">{item.step}</span>
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <h2 className="mx-auto max-w-md text-balance font-medium text-2xl tracking-tight sm:text-3xl">
            Ship cleaner pull requests.
          </h2>
          <p className="max-w-sm text-muted-foreground text-sm">Free during early access.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href="/api/auth/github/login">
                Get started
                <ArrowRight className="ml-1 size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard/pricing" prefetch={false}>
                View pricing
              </Link>
            </Button>
          </div>
        </section>

        <Separator />

        <footer className="flex items-center justify-between py-8 text-muted-foreground text-xs">
          <span>&copy; {new Date().getFullYear()} pr/agents</span>
          <div className="flex gap-4">
            <Link href="/dashboard" className="transition-colors hover:text-foreground" prefetch={false}>
              Dashboard
            </Link>
            <Link href="/dashboard/pricing" className="transition-colors hover:text-foreground" prefetch={false}>
              Pricing
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
