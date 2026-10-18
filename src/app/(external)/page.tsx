import Link from "next/link";

import { ArrowRight, ArrowUpRight, Bot, GitBranch, Shield, Sparkles, Zap } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { LandingThemeSwitcher } from "./_components/landing-theme-switcher";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "PR Agents - Personalized Agents for Code Reviews",
  description:
    "Deploy personalized AI agents for code reviews. Powered by Hermes, OpenClaw, and AntiSlop. Ship cleaner code, faster.",
  alternates: {
    canonical: "/",
  },
};

const agents = [
  {
    name: "Hermes",
    badge: "Self-improving",
    description:
      "A self-improving AI agent by Nous Research with a built-in learning loop. Creates skills from experience, improves them during use, and builds a deepening model of your codebase across sessions.",
    features: ["Closed learning loop", "Subagent delegation", "Model-agnostic"],
    url: "https://github.com/NousResearch/hermes-agent",
  },
  {
    name: "OpenClaw",
    badge: "Open source",
    description:
      "An open-source AI assistant that runs on your own hardware. Stewarded by the OpenClaw Foundation with no paid tier, no hosted service, and no token. Your data stays yours.",
    features: ["5,400+ community skills", "20+ integrations", "Zero data collection"],
    url: "https://github.com/openclaw/openclaw",
  },
  {
    name: "AntiSlop",
    badge: "Code quality",
    description:
      "A blazing-fast multi-language linter that detects AI-generated code slop -- placeholders, deferrals, hedging, stubs, and noise comments left behind by AI coding assistants.",
    features: ["17 languages", "Tree-sitter AST parsing", "CI/CD ready"],
    url: "https://github.com/skew202/antislop",
  },
];

const stats = [
  { value: "17+", label: "Languages supported" },
  { value: "5,400+", label: "Community skills" },
  { value: "<1ms", label: "Scan time" },
  { value: "0", label: "Data collected" },
];

export default function Home() {
  return (
    <main className={`${styles.landing} min-h-screen bg-background text-foreground`} data-landing-page>
      <div className="mx-auto flex w-full max-w-4xl flex-col p-4 sm:p-6 md:p-8">
        {/* Nav */}
        <header className="flex items-center justify-between py-4">
          <Link className="font-semibold text-sm tracking-tight" href="/" aria-label="PR Agents home" prefetch={false}>
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

        {/* Hero */}
        <section className="flex flex-col items-center py-24 text-center sm:py-32 md:py-40">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-muted-foreground text-xs">
            <Sparkles className="size-3" />
            Now in public beta
          </div>
          <h1 className="mx-auto max-w-2xl text-balance font-medium text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Personalized Agents for Code Reviews
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-muted-foreground text-base leading-relaxed sm:text-lg">
            Deploy AI agents that learn your codebase, enforce your standards, and catch what linters miss. Built on
            Hermes, OpenClaw, and AntiSlop.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/auth/v1/register" prefetch={false}>
                Get started
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard" prefetch={false}>
                Live demo
                <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Stats */}
        <section className="grid grid-cols-2 gap-8 py-16 sm:py-20 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 text-center">
              <span className="font-semibold text-3xl tracking-tight">{stat.value}</span>
              <span className="text-muted-foreground text-xs">{stat.label}</span>
            </div>
          ))}
        </section>

        <Separator />

        {/* Agents */}
        <section className="py-16 sm:py-20">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">Powered by</p>
            <h2 className="mx-auto max-w-md text-balance font-medium text-2xl tracking-tight sm:text-3xl">
              Three agents. One workflow.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {agents.map((agent) => (
              <a
                key={agent.name}
                href={agent.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-4 rounded-lg border p-6 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-md bg-foreground/5">
                      {agent.name === "Hermes" && <Bot className="size-4" />}
                      {agent.name === "OpenClaw" && <Shield className="size-4" />}
                      {agent.name === "AntiSlop" && <Zap className="size-4" />}
                    </div>
                    <span className="font-medium text-sm">{agent.name}</span>
                  </div>
                  <span className="rounded-full border px-2 py-0.5 text-muted-foreground text-[10px]">
                    {agent.badge}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{agent.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {agent.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-md bg-foreground/5 px-2 py-0.5 text-muted-foreground text-[11px]"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1 text-muted-foreground text-xs transition-colors group-hover:text-foreground">
                  <GitBranch className="size-3" />
                  View on GitHub
                  <ArrowUpRight className="size-3" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <Separator />

        {/* How it works */}
        <section className="py-16 sm:py-20">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">How it works</p>
            <h2 className="mx-auto max-w-md text-balance font-medium text-2xl tracking-tight sm:text-3xl">
              From push to review in seconds
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Connect your repo",
                description:
                  "Link your GitHub, GitLab, or Bitbucket repository. Agents get read access to your codebase.",
              },
              {
                step: "02",
                title: "Agents learn your patterns",
                description:
                  "Hermes learns your conventions. OpenClaw builds skills from your review history. AntiSlop maps your quality bar.",
              },
              {
                step: "03",
                title: "Reviews on every PR",
                description:
                  "Every pull request gets reviewed automatically. Inline comments, suggestions, and a quality score -- before any human looks at it.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span className="font-mono text-muted-foreground text-xs">{item.step}</span>
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* CTA */}
        <section className="flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <h2 className="mx-auto max-w-md text-balance font-medium text-2xl tracking-tight sm:text-3xl">
            Ship cleaner code, faster.
          </h2>
          <p className="max-w-sm text-muted-foreground text-sm">Start with the free tier. No credit card required.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/auth/v1/register" prefetch={false}>
                Get started free
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard/pricing" prefetch={false}>
                View pricing
              </Link>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Footer */}
        <footer className="flex items-center justify-between py-8 text-muted-foreground text-xs">
          <span>&copy; {new Date().getFullYear()} pr/agents</span>
          <div className="flex gap-4">
            <Link href="/dashboard" className="transition-colors hover:text-foreground" prefetch={false}>
              Dashboard
            </Link>
            <Link href="/dashboard/pricing" className="transition-colors hover:text-foreground" prefetch={false}>
              Pricing
            </Link>
            <a
              href="https://github.com/NousResearch/hermes-agent"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
