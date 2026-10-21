# Connect your own agent

Anything that can answer a web request can be a GitCrew agent: a serverless function (Vercel, Netlify, Cloudflare
Workers), an n8n or Zapier webhook, or a small server. GitCrew sends it the pull request, it answers with what it
found, and GitCrew posts that on the pull request as a check and review comments. Your agent never gets a GitHub token.

## In the dashboard (no code)

1. Open **Agents → Connect your own agent**.
2. Give it a name and a one-line description, then paste its URL. It must start with `https://`.
3. Copy the **secret** it shows you. It is shown once. Put it in your agent's settings (for example an environment
   variable `GITCREW_SECRET`). You can make a new one later with **New secret**.
4. Press **Send a test pull request**. GitCrew sends a fake pull request and tells you in plain words whether the reply
   worked.
5. Press **Add to repositories** and pick the repos. On each repo's page you then answer four questions for the agent:
   when it runs, which files it looks at, how strict it is, and how many comments it may post.

## What GitCrew sends

A `POST` with a JSON body and these headers:

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `User-Agent` | `GitCrew` |
| `X-GitCrew-Signature` | `sha256=` + the HMAC-SHA256 of the raw body, keyed with your secret, in hex |

```json
{
  "version": 1,
  "runId": "5f0c…",
  "stepId": "9a1e…",
  "agent": { "slug": "my-agent", "config": {} },
  "repository": { "id": 123, "fullName": "octo/example", "defaultBranch": "main", "private": false },
  "pullRequest": {
    "number": 42,
    "title": "Add login",
    "url": "https://github.com/octo/example/pull/42",
    "author": "octocat",
    "headSha": "…",
    "baseSha": "…",
    "headRef": "feature",
    "baseRef": "main",
    "isFork": false
  },
  "changedFiles": [
    {
      "path": "src/app.ts",
      "status": "modified",
      "additions": 2,
      "deletions": 0,
      "patch": "@@ -1,1 +1,3 @@\n export function greet(name) {\n+  console.log(name);\n+  return name.trim();"
    }
  ],
  "callbackUrl": "https://your-gitcrew.example.com/api/agents/steps/9a1e…/result"
}
```

* `changedFiles` holds only the files that match the step's "Which files?" answer.
* `patch` is GitHub's unified diff for the file. It is left out for binary files, very large files, and once the
  request reaches about 400 KB of diffs.
* Lines that start with `+` are new. The `+N` in each `@@ … +N,M @@` header is the line number of the first line in the
  new file, which is the number to use in a comment.

### Check the signature

Always check `X-GitCrew-Signature` before you trust the body. Use the raw body bytes, not re-serialized JSON.

```js
import { createHmac, timingSafeEqual } from "node:crypto";

export function isFromGitCrew(rawBody, header, secret) {
  const expected = Buffer.from(`sha256=${createHmac("sha256", secret).update(rawBody, "utf8").digest("hex")}`);
  const received = Buffer.from(header ?? "");
  return expected.length === received.length && timingSafeEqual(expected, received);
}
```

```python
import hashlib, hmac

def is_from_gitcrew(raw_body: bytes, header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, header or "")
```

## What your agent answers

Answer within **25 seconds** with status `200` and one of three shapes. GitCrew recognizes which one you sent.

### 1. GitCrew result JSON (most control)

```json
{
  "conclusion": "failure",
  "title": "1 security problem",
  "summary": "Found a hard-coded key.",
  "comments": [
    { "path": "src/app.ts", "line": 2, "severity": "high", "body": "Move this key to an environment variable." }
  ],
  "metrics": { "issues": 1 }
}
```

| Field | Required | Meaning |
| --- | --- | --- |
| `conclusion` | yes | `success`, `failure` or `neutral` |
| `title` | yes | One line, up to 200 characters, shown on the check |
| `summary` | yes | Markdown, shown on the check and at the top of the review |
| `comments` | no | Up to 500. `path` and `line` point into the new version of the file; `severity` is `critical`, `high`, `medium` or `low` |
| `metrics` | no | Small key/value facts shown in the dashboard |

### 2. SARIF

If your tool already writes [SARIF 2.1.0](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) (ESLint,
Semgrep, Ruff, CodeQL and many more can), send it as is. Each result becomes a comment: `error` is high, `warning`
is medium, `note` is low. Any `error` makes the conclusion `failure`.

### 3. Plain text

Anything that is not JSON is posted as the review summary with a `neutral` conclusion. Handy for LLM agents that
answer in prose.

### What GitCrew does with the answer

The step's settings decide, not your agent:

* **How strict?** "Just comment" never fails the check. "Ask for changes when it fails" turns a `failure` into a review that asks
  for changes. "Block merging when it fails" fails the check run `GitCrew / <agent name>`, and skips later stages; make it a required check to enforce it.
* **How chatty?** "Comment on the lines it finds" posts inline comments (up to the limit you set); "One summary comment only" posts only the
  summary with the findings listed in it. Comments on lines outside the diff are always listed in the summary,
  because GitHub only accepts inline comments on changed lines.

## Slow agents: answer later

If your agent needs more than 25 seconds, answer `202 Accepted` right away, do the work, then `POST` the result to the
`callbackUrl` from the request. Sign your body the same way, with the same secret, in `X-GitCrew-Signature`.

```bash
body='{"conclusion":"success","title":"All good","summary":"Nothing found."}'
sig="sha256=$(printf '%s' "$body" | openssl dgst -sha256 -hmac "$GITCREW_SECRET" -hex | sed 's/^.* //')"
curl -X POST "$CALLBACK_URL" -H "Content-Type: application/json" -H "X-GitCrew-Signature: $sig" -d "$body"
```

The callback answers `200` once the result is posted, `401` for a wrong signature, and `409` if the step already
finished (for example because a newer push cancelled the run). Bodies over 2 MB are rejected.

## Examples

### A Vercel function (Node)

`api/agent.js` in any Vercel project, with `GITCREW_SECRET` set as an environment variable:

```js
import { createHmac, timingSafeEqual } from "node:crypto";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");

  const expected = Buffer.from(
    `sha256=${createHmac("sha256", process.env.GITCREW_SECRET).update(raw, "utf8").digest("hex")}`,
  );
  const received = Buffer.from(req.headers["x-gitcrew-signature"] ?? "");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return res.status(401).send("bad signature");
  }

  const pr = JSON.parse(raw);
  const comments = [];
  for (const file of pr.changedFiles) {
    let line = 0;
    for (const text of (file.patch ?? "").split("\n")) {
      const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)/.exec(text);
      if (hunk) {
        line = Number(hunk[1]);
        continue;
      }
      if (text.startsWith("+")) {
        if (text.includes("console.log(")) {
          comments.push({ path: file.path, line, severity: "low", body: "Remove this debug log." });
        }
        line++;
      } else if (text.startsWith(" ")) line++;
    }
  }

  res.status(200).json({
    conclusion: comments.length ? "failure" : "success",
    title: comments.length ? `${comments.length} debug log(s)` : "No debug logs",
    summary: "Checks new lines for console.log.",
    comments,
  });
}
```

### n8n

1. Add a **Webhook** node (method `POST`, respond "Using 'Respond to Webhook' node") and turn on "Raw body".
2. Add a **Crypto** node: action *Hmac*, type *SHA256*, secret = your GitCrew secret, value = the raw body. Compare
   `sha256=` + its output with the `x-gitcrew-signature` header in an **If** node.
3. Do the work (for example an **AI Agent** node that reads `changedFiles`).
4. End with **Respond to Webhook**, returning the result JSON above, or plain text.

Use the n8n webhook's production URL as the agent URL in GitCrew.

## Agents from other projects (Hermes, OpenClaw and others)

Agents such as Hermes Agent or OpenClaw run on your own machine or server. To use one with GitCrew today, put a small
HTTP wrapper in front of it like the Vercel example: check the signature, pass the diff to the agent, and return its
answer as result JSON or plain text. They are listed under **Ready-made → Coming soon**; one-click versions that need
no wrapper are planned.

## Limits and safety

* Agent URLs must be public `https://` addresses. Private networks, `localhost` and raw IP addresses are refused.
  (In local development, `http://localhost` is allowed so you can test.)
* GitCrew does not follow redirects, waits at most 25 seconds, and reads at most 2 MB of the reply.
* Your agent sees the diff of the files it is pointed at, including on private repositories. Only connect agents you
  trust with that code.
