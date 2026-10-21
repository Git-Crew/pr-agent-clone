import { z } from "zod";

// One-click GitHub App creation with the App manifest flow:
// https://docs.github.com/en/apps/sharing-github-apps/registering-a-github-app-from-a-manifest

export const APP_PERMISSIONS = {
  actions: "write", // workflow_dispatch of agent-pr.yml
  checks: "write", // one check run per agent
  contents: "read",
  metadata: "read",
  pull_requests: "write", // changed files + reviews
} as const;

export const APP_EVENTS = ["pull_request"] as const;

/** GitHub only delivers webhooks to public URLs and rejects localhost when the App is created. */
export function isLocalUrl(appUrl: string): boolean {
  const host = new URL(appUrl).hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".localhost");
}

export function buildAppManifest(appUrl: string, name: string) {
  const base = appUrl.replace(/\/+$/, "");
  const local = isLocalUrl(base);
  return {
    name,
    url: base,
    description: "AI agents on your pull requests: reviews, inline comments and merge checks.",
    // Local mode: no webhook, so sign-in and installs work on localhost. PR runs need a public URL.
    ...(local ? {} : { hook_attributes: { url: `${base}/api/github/webhook`, active: true } }),
    redirect_url: `${base}/api/auth/github/app-created`,
    callback_urls: [`${base}/api/auth/github/callback`],
    setup_url: `${base}/api/auth/github/callback`,
    setup_on_update: true,
    request_oauth_on_install: true,
    // A local test App stays private to its owner.
    public: !local,
    default_permissions: APP_PERMISSIONS,
    ...(local ? {} : { default_events: APP_EVENTS }),
  };
}

/** Where the manifest form is posted: the user's account, or an organization they administer. */
export function manifestFormAction(organization: string | null, state: string): string {
  const path = organization
    ? `/organizations/${encodeURIComponent(organization)}/settings/apps/new`
    : "/settings/apps/new";
  return `https://github.com${path}?state=${encodeURIComponent(state)}`;
}

export const ORG_NAME = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;

const conversionSchema = z.object({
  id: z.number().int(),
  slug: z.string().min(1),
  client_id: z.string().min(1),
  client_secret: z.string().min(1),
  webhook_secret: z.string().min(1),
  pem: z.string().min(1),
  html_url: z.string().url(),
  owner: z.object({ login: z.string() }).nullable().optional(),
});

export type ManifestConversion = z.infer<typeof conversionSchema>;

/** Exchange the one-hour code for the new App's credentials. The endpoint needs no authentication. */
export async function convertManifestCode(code: string, fetchImpl: typeof fetch = fetch): Promise<ManifestConversion> {
  if (!/^[\w-]{1,100}$/.test(code)) throw new Error("Invalid manifest code");
  const res = await fetchImpl(`https://api.github.com/app-manifests/${code}/conversions`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "agent-pr",
    },
    cache: "no-store",
  });
  if (!res.ok)
    throw new Error(`GitHub could not convert the manifest code (${res.status}): ${(await res.text()).slice(0, 200)}`);
  return conversionSchema.parse(await res.json());
}
