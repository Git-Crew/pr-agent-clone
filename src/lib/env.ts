import { z } from "zod";

// Read lazily so `next build` and tests work without every variable set.

const githubAppSchema = z.object({
  GITHUB_APP_ID: z.string().min(1),
  GITHUB_APP_SLUG: z.string().min(1),
  GITHUB_APP_PRIVATE_KEY: z.string().min(1),
  GITHUB_APP_CLIENT_ID: z.string().min(1),
  GITHUB_APP_CLIENT_SECRET: z.string().min(1),
  GITHUB_WEBHOOK_SECRET: z.string().min(16),
});

export type GitHubAppEnv = z.infer<typeof githubAppSchema>;

/** GitHub App credentials from GITHUB_APP_* variables, or null when they are not all set. */
export function readGitHubAppEnv(env: NodeJS.ProcessEnv = process.env): GitHubAppEnv | null {
  const parsed = githubAppSchema.safeParse(env);
  if (!parsed.success) return null;
  return {
    ...parsed.data,
    // Env files often store the PEM on one line with literal "\n".
    GITHUB_APP_PRIVATE_KEY: parsed.data.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}

/**
 * Public base URL of this deployment, without a trailing slash. Also the OIDC audience for the runner.
 * On Vercel it falls back to the production domain so a fresh deploy works before APP_URL is set.
 */
export function getAppUrl(env: NodeJS.ProcessEnv = process.env): string {
  const url =
    env.APP_URL ??
    env.BASE_URL ??
    (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);
  if (!url) throw new Error("APP_URL is not set");
  return url.replace(/\/+$/, "");
}

/**
 * Who may create or replace the GitHub App from the setup page. In development any signed-in user may;
 * in production only the emails or GitHub logins listed in ADMIN_EMAILS (comma-separated).
 */
export function canManageGitHubApp(
  user: { email: string; githubLogin: string | null },
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  if (env.NODE_ENV === "development") return true;
  const admins = (env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return (
    admins.includes(user.email.toLowerCase()) || (!!user.githubLogin && admins.includes(user.githubLogin.toLowerCase()))
  );
}
