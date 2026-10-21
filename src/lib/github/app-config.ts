import { eq } from "drizzle-orm";

import { decryptSecret, encryptSecret } from "@/lib/crypto/secrets";
import { appConfig } from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";
import { type GitHubAppEnv, readGitHubAppEnv } from "@/lib/env";

import type { ManifestConversion } from "./manifest";

// Where the GitHub App credentials come from: GITHUB_APP_* environment variables first, otherwise the App
// created with the one-click setup page (stored encrypted in app_config).

export type AppConfigSource = "env" | "database";
export type ResolvedAppConfig = GitHubAppEnv & { source: AppConfigSource; htmlUrl: string | null };

export async function loadGitHubAppConfig(
  db: Db,
  env: NodeJS.ProcessEnv = process.env,
): Promise<ResolvedAppConfig | null> {
  const fromEnv = readGitHubAppEnv(env);
  if (fromEnv) return { ...fromEnv, source: "env", htmlUrl: `https://github.com/apps/${fromEnv.GITHUB_APP_SLUG}` };

  const [row] = await db.select().from(appConfig).where(eq(appConfig.id, 1)).limit(1);
  if (!row) return null;
  const key = env.ENCRYPTION_KEY;
  return {
    GITHUB_APP_ID: row.appId,
    GITHUB_APP_SLUG: row.slug,
    GITHUB_APP_CLIENT_ID: row.clientId,
    GITHUB_APP_CLIENT_SECRET: decryptSecret(row.clientSecret, key),
    GITHUB_APP_PRIVATE_KEY: decryptSecret(row.privateKey, key),
    GITHUB_WEBHOOK_SECRET: decryptSecret(row.webhookSecret, key),
    source: "database",
    htmlUrl: row.htmlUrl,
  };
}

export async function saveGitHubAppFromManifest(
  db: Db,
  app: ManifestConversion,
  createdBy: number | null,
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> {
  const key = env.ENCRYPTION_KEY;
  const values = {
    id: 1,
    appId: String(app.id),
    slug: app.slug,
    clientId: app.client_id,
    clientSecret: encryptSecret(app.client_secret, key),
    privateKey: encryptSecret(app.pem, key),
    webhookSecret: encryptSecret(app.webhook_secret, key),
    htmlUrl: app.html_url,
    ownerLogin: app.owner?.login ?? null,
    createdBy,
  };
  await db.insert(appConfig).values(values).onConflictDoUpdate({ target: appConfig.id, set: values });
}

/** Keep the stored slug and URL in step with GitHub after the App is renamed there. */
export async function updateAppIdentity(db: Db, identity: { slug: string; htmlUrl: string }): Promise<void> {
  await db.update(appConfig).set({ slug: identity.slug, htmlUrl: identity.htmlUrl }).where(eq(appConfig.id, 1));
}
