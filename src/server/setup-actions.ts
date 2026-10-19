"use server";

import { z } from "zod";

import { createOAuthState } from "@/app/api/auth/github/oauth-state";
import { requireUser } from "@/lib/db/dashboard";
import { canManageGitHubApp, getAppUrl } from "@/lib/env";
import { buildAppManifest, manifestFormAction, ORG_NAME } from "@/lib/github/manifest";
import { getGitHubAppConfig } from "@/lib/server/deps";

const inputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name the App (3–34 characters)")
    .max(34, "GitHub App names are at most 34 characters"),
  organization: z
    .string()
    .trim()
    .regex(ORG_NAME, "That is not a valid organization name")
    .or(z.literal(""))
    .transform((value) => value || null),
});

export type ManifestStart = { ok: true; action: string; manifest: string } | { ok: false; error: string };

/** Prepare the manifest form: sets the CSRF state cookie and returns where to post and what. */
export async function startGitHubAppSetup(input: { name: string; organization: string }): Promise<ManifestStart> {
  const user = await requireUser();
  if (!canManageGitHubApp(user)) return { ok: false, error: "Only admins listed in ADMIN_EMAILS can create the App." };
  const existing = await getGitHubAppConfig();
  if (existing?.source === "env") return { ok: false, error: "The App is configured by environment variables." };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const state = await createOAuthState();
  return {
    ok: true,
    action: manifestFormAction(parsed.data.organization, state),
    manifest: JSON.stringify(buildAppManifest(getAppUrl(), parsed.data.name)),
  };
}
