import { type NextRequest, NextResponse } from "next/server";

import { syncUserInstallations, upsertGitHubUser } from "@/lib/auth/github";
import { getSession, setSession } from "@/lib/auth/session";
import { getAppUrl } from "@/lib/env";
import { exchangeOAuthCode, getAuthenticatedUser, listUserInstallations } from "@/lib/github/client";
import { getOrchestratorDeps, requireGitHubAppConfig } from "@/lib/server/deps";

import { consumeOAuthState } from "../oauth-state";

export const maxDuration = 60;

/**
 * OAuth callback and GitHub App setup URL. Both "Sign in with GitHub" and "Install" land here with a `code`
 * (the App requests user authorization during installation). We sign the user in, then record which
 * installations they can access. The user token is used for this request only and never stored.
 */
export async function GET(request: NextRequest) {
  const appUrl = getAppUrl();
  const fail = (reason: string) => NextResponse.redirect(new URL(`/auth/v1/login?error=${reason}`, appUrl));

  const params = request.nextUrl.searchParams;
  const code = params.get("code");
  if (!(await consumeOAuthState(params.get("state")))) {
    // Installs started on github.com (not from our Install button) carry no state. Don't trust that code;
    // run a normal sign-in instead, which is instant for a user who already authorized the App.
    if (params.has("installation_id")) return NextResponse.redirect(new URL("/api/auth/github/login", appUrl));
    return fail("state_mismatch");
  }
  if (!code) return fail("missing_code");

  try {
    const env = await requireGitHubAppConfig();
    const token = await exchangeOAuthCode({
      clientId: env.GITHUB_APP_CLIENT_ID,
      clientSecret: env.GITHUB_APP_CLIENT_SECRET,
      code,
      redirectUri: `${appUrl}/api/auth/github/callback`,
    });
    const [ghUser, userInstallations] = await Promise.all([getAuthenticatedUser(token), listUserInstallations(token)]);

    const deps = await getOrchestratorDeps();
    const session = await getSession().catch(() => null);
    const user = await upsertGitHubUser(deps.db, ghUser, session?.user.id ?? null);
    await syncUserInstallations(deps, user.id, userInstallations);
    await setSession(user);

    const installed = params.get("setup_action") === "install" || params.get("setup_action") === "update";
    return NextResponse.redirect(new URL(installed ? "/dashboard/repos?installed=1" : "/dashboard", appUrl));
  } catch (error) {
    console.error("GitHub sign-in failed", error);
    return fail("github_failed");
  }
}
