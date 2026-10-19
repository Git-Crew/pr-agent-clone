# Agent PR architecture

Agent PR is a dashboard for AI agents that run on pull requests. You install a GitHub App on your repos, build a
pipeline of agents per repo (which agents, in what order, on which paths, which ones can block a merge), and the
agents review, comment, gate and (later) fix PRs. Built-in agents and your own agents share the same contract and
the same dashboard.

This document is the design. The README has the short version and the setup steps.

## Decisions at a glance

| Question | Decision | Why |
| --- | --- | --- |
| How do we talk to GitHub? | One **GitHub App** with webhooks + Checks + Reviews | Per-repo install, short-lived tokens, check runs (only Apps can create them), least privilege |
| Who are the users? | Developers and teams on github.com, multi-tenant | One tenant = one GitHub App installation (a user or an org account) |
| How do users sign in? | **Sign in with GitHub** (the App's user OAuth). Email/password stays as a fallback | GitHub already knows which installations a user can see |
| Where do agents run? | **GitHub Actions in the user's repo**, dispatched by us | No timeouts, PR code never runs on our servers, free minutes for the user |
| How does a third party plug in? | **HTTP agent** (signed webhook, sync or async result) | Language-agnostic, nothing of theirs runs on our infra |
| "Army of agents" | **Fleet**: apply one pipeline to many repos in one action | Org-wide rollout from the repos page |
| Merge gating | One check run per agent; blocking agents fail their check | Users mark `Agent PR / <agent>` as a required status check |
| Fixes | Minimal-diff fixes only ("ponytail" rule), never on fork PRs | Small reviewable patches, no write access to untrusted branches |

## System overview

```
                    ┌──────────────────────── GitHub ─────────────────────────┐
  pull_request ───► │  webhook  (X-Hub-Signature-256)                          │
                    │  Checks API · Reviews API · workflow_dispatch · OIDC    │
                    └────▲────────────┬─────────────────────▲────────────────┘
                         │            │ webhook              │ OIDC JWT + results
             check runs, │            ▼                      │
             reviews     │   ┌─────────────────────┐   ┌─────┴──────────────────────┐
                         └───┤  Agent PR (Next.js) │◄──┤  agent-pr.yml workflow in  │
                             │  on Vercel          │   │  the user's repo (runner)  │
                             │  - webhook handler  ├──►│  - checks out the PR head  │
                             │  - orchestrator     │   │    as data, no credentials │
                             │  - runner API       │   │  - runs fixmyslop scan     │
                             │  - dashboard        │   │  - posts JSON back         │
                             └─────────┬───────────┘   └────────────────────────────┘
                                       │ signed AgentRequest / AgentResult
                                       ▼
                             ┌─────────────────────┐        ┌──────────────┐
                             │ HTTP agents (yours) │        │  Postgres    │
                             └─────────────────────┘        │  (Drizzle)   │
                                                            └──────────────┘
```

The Next.js app never executes PR code. It only receives webhooks, decides what should run, dispatches work and turns
agent output into GitHub check runs and reviews.

## 1. The GitHub App

### Permissions (least privilege)

| Permission | Level | Used for |
| --- | --- | --- |
| Metadata | read | Mandatory |
| Pull requests | read & write | List changed files, post reviews with inline comments |
| Checks | read & write | One check run per agent step |
| Actions | read & write | `POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches` |
| Contents | read | Read `agent-pr.yml` presence; compare refs |

Contents **write** is only requested later, for the optional fix loop, and only on same-repo PRs.

### Events

`pull_request` (opened, synchronize, reopened, ready_for_review), `installation`, `installation_repositories`.

### Webhook handling (`POST /api/github/webhook`)

1. Read the raw body and verify `X-Hub-Signature-256` (HMAC-SHA256 with the webhook secret, constant-time compare).
2. Store `X-GitHub-Delivery` in `webhook_deliveries`. A duplicate delivery id returns `200` and does nothing.
3. `installation*` events sync the `installations` and `repositories` tables.
4. `pull_request` events start a run (see section 3). Slow work runs in `after()` so GitHub gets its 2xx fast.

### Authentication against GitHub

* App JWT: RS256, signed with the App private key (PKCS#1 or PKCS#8 PEM), `iat` 60s in the past, `exp` 9 minutes.
* Installation token: `POST /app/installations/{installation_id}/access_tokens`, cached in memory until 1 minute
  before expiry.
* User sign-in: `GET https://github.com/login/oauth/authorize` then `POST https://github.com/login/oauth/access_token`,
  then `GET /user` and `GET /user/installations`. We store which installations each user can access and throw the
  user token away. "Refresh access" re-runs the OAuth redirect (instant for an already-authorized user).

### Forks and `pull_request_target`

We **never use `pull_request_target`**. The runner workflow is triggered by `workflow_dispatch` on the default branch,
so the workflow file that runs is always the reviewed one on the default branch, never the one in the PR. The PR head
is checked out as data with `persist-credentials: false`, after FixMySlop is installed, and is only read by a static
analyzer. The job has `permissions: contents: read, id-token: write` and no repository secrets. Fork PRs never get the
fix loop and never receive LLM keys.

## 2. The agent contract

Every agent, built-in or third-party, takes an `AgentRequest` and produces an `AgentResult`. The TypeScript types and
Zod schemas live in `src/lib/agents/contract.ts`.

```ts
type AgentRequest = {
  version: 1;
  runId: string;
  stepId: string;
  agent: { slug: string; config: Record<string, unknown> };
  repository: { id: number; fullName: string; defaultBranch: string; private: boolean };
  pullRequest: {
    number: number; title: string; body: string | null; url: string; author: string;
    headSha: string; baseSha: string; headRef: string; baseRef: string; isFork: boolean; draft: boolean;
  };
  changedFiles: { path: string; status: string; additions: number; deletions: number; patch?: string }[];
  callbackUrl: string; // for async results
};

type AgentResult = {
  conclusion: "success" | "failure" | "neutral";
  title: string;                      // one line, shown on the check run
  summary: string;                    // markdown, shown on the check run and the review body
  comments: { path: string; line: number; body: string; severity?: "critical" | "high" | "medium" | "low" }[];
  metrics?: Record<string, string | number>;  // e.g. { slopScore: 12.4, grade: "B" }
  patch?: { diff: string; message: string };  // optional unified diff (fix loop)
};
```

The platform owns everything GitHub-facing. Agents never get a GitHub token. From an `AgentResult` the orchestrator:

* completes the agent's check run (`success`; `failure` if the step is blocking, `neutral` otherwise),
* posts one PR review per agent. Comments on lines inside the diff become inline comments; the rest are listed in the
  review body (GitHub rejects inline comments outside the diff),
* stores the result, metrics and logs on the `run_steps` row for the dashboard.

### How a third-party agent plugs in

| Option | How it works | Pros | Cons |
| --- | --- | --- | --- |
| **HTTP agent** (recommended) | We `POST` the `AgentRequest` to your URL, signed with `X-Agent-PR-Signature: sha256=<hmac>`. Reply `200` with an `AgentResult`, or `202` and `POST` the result to `callbackUrl` later with the same signature | Any language or host, long jobs via callback, nothing runs on our infra, easy to test with curl | You host it; it sees the diff, not a checkout |
| Container image | We run your image in the user's runner with the PR mounted read-only | Full checkout, offline tools | Image supply chain risk, slower, needs a public registry |
| GitHub Action | Your action runs as a step in `agent-pr.yml` | Native to Actions | Every user must edit YAML per agent; no central management |

**Recommendation:** HTTP agents first. They match "manage it from the same dashboard": register a URL and a secret,
enable it per repo, done. Container agents are the next step for agents that need a full checkout. They reuse the
runner we already have, so they are an addition, not a redesign.

## 3. Where agents run

| Option | Timeouts | Runs PR code where | Cost | Ops | Fork safety |
| --- | --- | --- | --- | --- | --- |
| Vercel function only | 300 s max | Our servers (unsafe) | Ours | None | Bad |
| **GitHub Actions in user repo** | 6 h per job | User's runner | User's Actions minutes | None | Good with `workflow_dispatch` |
| Queue + worker (Inngest / Trigger.dev / QStash) | Long, step-based | Our worker, needs a sandbox | Ours | Medium | We must sandbox |
| Containers (Fly, Railway, ECS) | Unlimited | Our containers | Ours | High | Sandbox per job |

**Decision: GitHub Actions.** The user adds one workflow file (`runner/agent-pr.yml`, shown in the dashboard with a
copy button). Server-side agents that only need the diff (HTTP agents, the LLM review agent) run from our server and
use the async callback when they are slow. If we later need our own compute (paid tier, no YAML), we add Inngest as the
queue in front of the same orchestrator. The contract does not change.

### Run lifecycle

```
pull_request webhook
  └─► evaluate rules per pipeline entry (branch, draft, paths, fork policy)
      └─► runs row + run_steps rows (skipped steps keep their reason)
          └─► create a queued check run per active step
              └─► dispatch stage 1
                    action agents → workflow_dispatch(agent-pr.yml, inputs: run_id, stage)
                    http agents   → signed POST to the agent URL
runner job
  └─► GET  /api/runner/runs/{runId}/stages/{stage}  (Authorization: Bearer <GitHub OIDC token>)
  └─► runs the steps of that stage in parallel
  └─► POST /api/runner/steps/{stepId}/result         (raw output, e.g. FixMySlop JSON)
orchestrator
  └─► agent.finalize(raw) → AgentResult → check run + review
  └─► stage complete? → next stage, or stop if a blocking step failed → run conclusion
```

* **Order and parallelism:** pipeline entries have a `stage`. Steps in the same stage run together; stages run in
  order. "Run A then B" means A in stage 1 and B in stage 2. "Run A and B together" means both in stage 1.
* **New pushes:** a `synchronize` event cancels the PR's unfinished runs and starts a new run for the new head SHA.
* **Runner authentication:** the runner sends its GitHub Actions OIDC token. We verify it against GitHub's JWKS
  (`https://token.actions.githubusercontent.com/.well-known/jwks`), with issuer `https://token.actions.githubusercontent.com`,
  audience = our `APP_URL`, `repository_id` = the run's repo, `event_name` = `workflow_dispatch` and
  `ref` = the default branch. No shared secret ever lives in the user's repo. A step accepts one result only.

## 4. Built-in agents

### FixMySlop (MVP)

* Runner: `pip install fixmyslop==<pinned>`, then `fixmyslop scan --changed --base origin/<base> -f json --fail-on none`.
* `finalize`: map issues to inline comments (repo-relative paths, `line_start`), compute the conclusion from
  `failOn` severity (default `high`), and put `slop_score` and `grade` into metrics and the summary.
* Config: `failOn` (`critical|high|medium|low|none`), `minSeverity`, `maxComments` (default 30), `only` rule groups.

### Fix loop (next)

Same-repo PRs only, opt-in per repo. The runner exports `fixmyslop scan -f prompt`. The server sends it to the LLM with
the **minimal-change rule**: fix only the reported lines, no refactors, no new dependencies, keep the diff as small as
possible. The runner applies the returned unified diff, rescans, and pushes only if the slop score went down. The
result shows `score before → after`.

### PR review agent (next)

A server-side agent: diff in, summary review and inline comments out, through the LLM provider configured in the
installation's secrets.

## 5. Database schema (Drizzle, Postgres)

```
users ──< installation_members >── installations ──< repositories ──< pipeline_steps >── agents
                                         │                  │
                                         └──< secrets       └──< runs ──< run_steps ──< run_logs
webhook_deliveries (idempotency)
```

| Table | Key columns |
| --- | --- |
| `users` | existing table + `github_id` (unique), `github_login`, `avatar_url`; `password_hash` now nullable |
| `installations` | `id` = GitHub installation id, `account_login`, `account_type`, `account_avatar_url`, `suspended_at`, `deleted_at` |
| `installation_members` | (`user_id`, `installation_id`) primary key, `synced_at` |
| `repositories` | `id` = GitHub repo id, `installation_id`, `full_name`, `private`, `default_branch`, `enabled`, `removed_at` |
| `agents` | `id`, `slug` (unique), `name`, `description`, `kind` (`builtin`/`http`), `endpoint_url`, `signing_secret` (encrypted), `installation_id` (null = built-in), `default_config` |
| `pipeline_steps` | `id`, `repository_id`, `agent_id`, `stage`, `position`, `enabled`, `blocking`, `include_paths[]`, `exclude_paths[]`, `branches[]`, `run_on_drafts`, `run_on_forks`, `config` (jsonb) |
| `runs` | `id`, `repository_id`, `pr_number`, `pr_title`, `pr_author`, `head_sha`, `base_sha`, `head_ref`, `base_ref`, `is_fork`, `trigger`, `status`, `conclusion`, `current_stage`, timestamps |
| `run_steps` | `id`, `run_id`, `pipeline_step_id`, `agent_id`, `stage`, `status`, `conclusion`, `skip_reason`, `check_run_id`, `review_id`, `result` (jsonb), `metrics` (jsonb), timestamps |
| `run_logs` | `id`, `run_id`, `step_id`, `level`, `message`, `created_at` |
| `secrets` | `id`, `installation_id`, `repository_id` (null = installation-wide), `name`, `value` (encrypted), unique per scope |
| `webhook_deliveries` | `id` = `X-GitHub-Delivery`, `event`, `received_at` |
| `app_config` | single row: the GitHub App created by the one-click setup (`app_id`, `slug`, `client_id`, encrypted `client_secret`, `private_key`, `webhook_secret`). `GITHUB_APP_*` env vars take precedence |

**Encryption at rest:** AES-256-GCM via Node's `crypto`, with a 32-byte `ENCRYPTION_KEY` held only in the environment.
Stored as `v1:<iv>:<tag>:<ciphertext>` (base64), with a fresh random IV per value. Secrets are write-only in the UI: you
can replace or delete one, never read it back.

**Billing:** the existing `teams` and Razorpay columns stay as they are, for the paid plan later.

## 6. Dashboard pages

| Route | What it shows |
| --- | --- |
| `/dashboard` | Overview: installs, active repos, runs today, pass rate, recent runs, setup checklist |
| `/dashboard/repos` | Repos across installations, enabled toggle, pipeline summary, last run; bulk "apply pipeline" (fleet) |
| `/dashboard/repos/[repoId]` | Pipeline editor: stages, agents, blocking, path and branch rules, agent config; workflow file setup |
| `/dashboard/agents` | Agent catalog (built-in + your HTTP agents); register an HTTP agent |
| `/dashboard/runs` | Run history with filters (repo, status) |
| `/dashboard/runs/[runId]` | One run: stages, step status, metrics, findings, logs, links to the PR and check runs |
| `/dashboard/settings` | Installations, members, secrets (encrypted, write-only), GitHub App setup status |
| `/dashboard/pricing` | Existing Razorpay plans page, kept for the paid tier |

## 7. Security checklist

* Webhook HMAC verified on the raw body with a constant-time compare; deliveries deduplicated.
* Runner calls authenticated by GitHub OIDC; no long-lived secrets in user repos.
* PR code is never executed on our servers, and the runner never executes it either (static analysis only).
* No `pull_request_target`; `persist-credentials: false`; minimal job `permissions`.
* Secrets encrypted with AES-256-GCM; `.env.example` only in git.
* HTTP agents receive HMAC-signed requests and must sign callbacks; one result per step.
* Every dashboard query is scoped to the installations the signed-in user is a member of.

## 8. Roadmap

1. **MVP (this PR):** App install → webhook → FixMySlop on a PR → review + check run → run in the dashboard.
2. HTTP (bring-your-own) agents with async callbacks.
3. LLM PR review agent; LLM keys as encrypted installation secrets.
4. FixMySlop fix loop (minimal diffs, rescan proof, same-repo only).
5. Paid plans on the existing Razorpay scaffold (per-installation seats or run quotas).
6. Optional hosted runner (Inngest + sandboxed containers) for users who do not want a workflow file.
