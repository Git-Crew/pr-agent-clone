import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db/drizzle";
import { getUser } from "@/lib/db/queries";
import { canManageGitHubApp, getAppUrl } from "@/lib/env";
import { saveGitHubAppFromManifest } from "@/lib/github/app-config";
import { convertManifestCode } from "@/lib/github/manifest";
import { getGitHubAppConfig, resetGitHubAppCache } from "@/lib/server/deps";

import { consumeOAuthState } from "../oauth-state";

/** GitHub redirects here after the user created the App from our manifest (redirect_url). */
export async function GET(request: NextRequest) {
  const appUrl = getAppUrl();
  const back = (query: string) => NextResponse.redirect(new URL(`/dashboard/setup?${query}`, appUrl));

  const user = await getUser().catch(() => null);
  if (!user) return NextResponse.redirect(new URL("/auth/v1/login", appUrl));
  if (!(await consumeOAuthState(request.nextUrl.searchParams.get("state")))) return back("error=state_mismatch");
  if (!canManageGitHubApp(user)) return back("error=not_admin");

  const existing = await getGitHubAppConfig();
  if (existing?.source === "env") return back("error=env_configured");

  const code = request.nextUrl.searchParams.get("code");
  if (!code) return back("error=missing_code");

  try {
    const app = await convertManifestCode(code);
    await saveGitHubAppFromManifest(db, app, user.id);
    resetGitHubAppCache();
    return back("created=1");
  } catch (error) {
    console.error("GitHub App manifest conversion failed", error);
    return back("error=conversion_failed");
  }
}
