import { z } from "zod";

// Read lazily so `next build` and tests work without every variable set. Each getter throws a clear error
// the first time a feature that needs the variable is used.

const githubAppSchema = z.object({
  GITHUB_APP_ID: z.string().min(1),
  GITHUB_APP_SLUG: z.string().min(1),
  GITHUB_APP_PRIVATE_KEY: z.string().min(1),
  GITHUB_APP_CLIENT_ID: z.string().min(1),
  GITHUB_APP_CLIENT_SECRET: z.string().min(1),
  GITHUB_WEBHOOK_SECRET: z.string().min(16),
});

export type GitHubAppEnv = z.infer<typeof githubAppSchema>;

export function getGitHubAppEnv(): GitHubAppEnv {
  const parsed = githubAppSchema.safeParse(process.env);
  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`GitHub App is not configured. Check these environment variables: ${missing}`);
  }
  return {
    ...parsed.data,
    // Env files often store the PEM on one line with literal "\n".
    GITHUB_APP_PRIVATE_KEY: parsed.data.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}

export function isGitHubAppConfigured(): boolean {
  return githubAppSchema.safeParse(process.env).success;
}

/** Public base URL of this deployment, without a trailing slash. Also the OIDC audience for the runner. */
export function getAppUrl(): string {
  const url = process.env.APP_URL ?? process.env.BASE_URL;
  if (!url) throw new Error("APP_URL is not set");
  return url.replace(/\/+$/, "");
}
