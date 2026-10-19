# Deploy Agent PR to Vercel

About 10 minutes, all in the browser. You need a GitHub account, a Vercel account and a Postgres database
(the steps use Neon through Vercel's integration).

## 1. Import the repo

1. Vercel → **Add New… → Project** → import `MrSpideyNihal/Pr-agent`.
2. Keep the defaults. `vercel.json` runs the database migrations, then `next build`.
3. Don't deploy yet. Do step 2 first, because the build needs the database.

## 2. Add a database

In the new project: **Storage → Create Database → Neon (Postgres)** → connect it to the project for all
environments. This sets `DATABASE_URL` and `DATABASE_URL_UNPOOLED`, and Agent PR reads both.

## 3. Environment variables

Project → **Settings → Environment Variables** (Production):

| Name | Value |
| --- | --- |
| `AUTH_SECRET` | output of `openssl rand -base64 32` |
| `ENCRYPTION_KEY` | output of `openssl rand -base64 32` (a different value). Keep it: losing it makes stored secrets unreadable |
| `ADMIN_EMAILS` | your GitHub login and/or email, e.g. `MrSpideyNihal` |
| `APP_URL` | optional: your domain, e.g. `https://pr-agent.vercel.app`. Defaults to the Vercel production domain |

No `openssl`? Run `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` instead.

## 4. Deploy

Press **Deploy**. The build log should show `migrations applied successfully` before the Next.js build.

## 5. Create the GitHub App (one click)

1. Open `https://<your-domain>/auth/v1/register` and create an account with an email in `ADMIN_EMAILS`.
   GitHub sign-in doesn't exist until the App does.
2. Go to **GitHub App** in the sidebar (`/dashboard/setup`), keep or change the name, and click
   **Create the App on GitHub**.
3. On GitHub, click **Create GitHub App**. You come back to Agent PR with the App saved (encrypted in the
   database).
4. Click **Install on repositories** and pick a test repo. You are signed in with GitHub, and the repo shows
   up under **Repositories** with the FixMySlop agent.

## 6. First real run

1. **Repositories → your repo → Setup**: copy `agent-pr.yml` and commit it to the default branch at
   `.github/workflows/agent-pr.yml` (the "Create the file on GitHub" button opens the editor).
2. Open a pull request that changes a few files.
3. You should see an `Agent PR / FixMySlop` check on the PR, an Actions run named "Agent PR", a review with
   inline comments if FixMySlop found anything, and the run under **Runs** in the dashboard.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| No run appears | GitHub App → Advanced → Recent Deliveries. A 503 means the App isn't saved; a 401 means a webhook secret mismatch |
| Check says "Could not start the Agent PR workflow" | `agent-pr.yml` must be on the default branch |
| Actions job fails at "Fetch the job" with 401 | `APP_URL` must match the URL the workflow calls (the file embeds it; re-copy it after changing domains) |
| Build fails at migrations | The database is not connected to the project, or `DATABASE_URL_UNPOOLED` is missing |
