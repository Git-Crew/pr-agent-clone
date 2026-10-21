# GitCrew

AI agents on your pull requests, managed from one dashboard.

Install the GitCrew GitHub App on your repos, pick which agents run on each repo's PRs, and the agents review, comment
and gate your PRs. Ready-made agents and your own agents work the same way and show up in the same dashboard.

* **FixMySlop agent:** runs [`fixmyslop`](https://github.com/MrSpideyNihal/FixMySlop) on the PR's changed files and
  posts the findings as a PR review with inline comments, a slop score and a grade.
* **Bring your own agent:** paste the URL of anything that answers a web request (a serverless function, n8n, Zapier,
  a small server). GitCrew signs each request, and your agent replies with JSON, SARIF from any linter, or plain text.
  Slow agents answer later through a callback. See [docs/CONNECT-AN-AGENT.md](docs/CONNECT-AN-AGENT.md).
* **Agent catalog:** ready-made agents are cards with their own settings, so the dashboard builds their forms.
  Coming soon: a plain-words agent (rules written in English), Ponytail (minimal-change fixes), Hermes Agent and
  OpenClaw.
* **Four plain questions per agent:** when should it run (every push, when the PR opens, or when a label is added),
  which files, how strict (just comment, ask for changes, or block merging), and how chatty (comments on lines or one
  summary, with a limit).

> Status: in use. FixMySlop and HTTP agents run end to end against a real GitHub App. The architecture is in
> [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## How it works

```
PR opened / pushed ──► GitHub App webhook ──► GitCrew (Next.js on Vercel)
                                                │ rules: paths, branches, drafts, forks
                                                │ one check run per agent
                                                ▼
                        workflow_dispatch ──► agent-pr.yml in your repo (GitHub Actions)
                                                │ checks out the PR head as data, runs fixmyslop
                                                ▼
                        results (OIDC-authenticated) ──► GitCrew ──► PR review + check runs
                                                                     └► run history in the dashboard
```

* **Ready-made agents run in GitHub Actions in your repo.** There are no serverless timeouts, and PR code never runs
  on our servers. Your own agents run wherever you host them; GitCrew calls them with the diff and a signature.
* **Fork-safe.** The workflow is triggered with `workflow_dispatch` (never `pull_request_target`), always runs the
  workflow file from your default branch, has no repository secrets, and only reads the PR checkout.
* **No shared secrets in your repo.** The runner proves who it is with a GitHub Actions OIDC token.
* **Merge gating.** Each agent gets its own check run, `GitCrew / <agent>`. Mark it as a required status check in
  branch protection to block merges when a blocking agent fails.
* **Pipelines.** Agents in the same stage run in parallel; stages run in order. Each step has its own path and branch
  filters, a draft/fork policy and a blocking flag. You can apply one pipeline to many repos at once.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (radix-nova), Drizzle ORM + Postgres, Zod,
React Hook Form, Zustand, TanStack Table, Biome, Husky, Vitest. The UI is built on the
[Studio Admin](https://github.com/arhamkhnz/next-shadcn-admin-dashboard) template.

## Deploy

[docs/DEPLOY.md](docs/DEPLOY.md) walks through Vercel + Neon in about 10 minutes. The GitHub App is created in one
click from the dashboard's **GitHub App** page (App manifest flow), so you never copy keys by hand.

## Getting started (local development)

### 1. Install and configure

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`. Every variable is described in [.env.example](.env.example).

### 2. Create the GitHub App

Easiest: open `/dashboard/setup` and click **Create the App on GitHub**. That needs a public `APP_URL` (a
deployment or a tunnel). To create it by hand instead:

GitHub → Settings → Developer settings → GitHub Apps → **New GitHub App**, then put the values in the `GITHUB_APP_*` variables:

| Setting | Value |
| --- | --- |
| Homepage URL | your `APP_URL` |
| Callback URL | `<APP_URL>/api/auth/github/callback` |
| Request user authorization (OAuth) during installation | on |
| Setup URL | `<APP_URL>/api/auth/github/callback` (redirect on update: on) |
| Webhook URL | `<APP_URL>/api/github/webhook` |
| Webhook secret | a long random string → `GITHUB_WEBHOOK_SECRET` |
| Repository permissions | Actions: read & write · Checks: read & write · Contents: read · Pull requests: read & write · Metadata: read |
| Subscribe to events | Pull request (installation events are always delivered) |

Then generate a private key and copy the App ID, slug, client id, client secret and private key into `.env.local`.
For local development, expose your dev server with a tunnel (for example `npx smee-client` or `cloudflared`) and use
the tunnel URL as `APP_URL`.

### 3. Database

```bash
npm run db:migrate
```

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000, sign in with GitHub, install the App on a repo, and add the workflow file the dashboard
shows you (`.github/workflows/agent-pr.yml`) to that repo's default branch. Open a PR and watch the run appear.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run check` / `npm run check:fix` | Biome lint + format |
| `npm test` | Unit and integration tests (Vitest, in-memory Postgres via PGlite) |
| `npm run db:generate` | Generate a migration from `src/lib/db/schema.ts` |
| `npm run db:migrate` | Apply migrations |

## Project layout

```
src/app/(main)/dashboard/   dashboard routes (overview, repos, agents, runs, settings, pricing)
src/app/api/github/         GitHub App webhook
src/app/api/runner/         endpoints the agent-pr.yml workflow calls (OIDC-authenticated)
src/app/api/auth/github/    sign in with GitHub + installation callback
src/lib/github/             App JWT, installation tokens, REST client, webhook + OIDC verification
src/lib/agents/             agent contract, registry, built-in agents (FixMySlop), diff-line mapping
src/lib/pipeline/           rules engine and run orchestrator
src/lib/crypto/             AES-256-GCM encryption for secrets at rest
src/lib/db/                 Drizzle schema, queries, migrations
runner/agent-pr.yml         the workflow users add to their repo
docs/ARCHITECTURE.md        the design
```

## Security

Secrets are encrypted at rest (AES-256-GCM) and are write-only in the UI. Webhooks are HMAC-verified and deduplicated.
Runner calls are authenticated with GitHub OIDC. Only `.env.example` is in git. See
[docs/ARCHITECTURE.md § Security checklist](docs/ARCHITECTURE.md#7-security-checklist).
