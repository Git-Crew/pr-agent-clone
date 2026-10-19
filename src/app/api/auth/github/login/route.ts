import { NextResponse } from "next/server";

import { getAppUrl } from "@/lib/env";
import { getGitHubAppConfig } from "@/lib/server/deps";

import { createOAuthState } from "../oauth-state";

/** Start "Sign in with GitHub" (the GitHub App's user authorization flow). */
export async function GET() {
  const config = await getGitHubAppConfig();
  if (!config) return NextResponse.redirect(new URL("/auth/v1/login?error=github_not_configured", getAppUrl()));
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", config.GITHUB_APP_CLIENT_ID);
  url.searchParams.set("redirect_uri", `${getAppUrl()}/api/auth/github/callback`);
  url.searchParams.set("state", await createOAuthState());
  return NextResponse.redirect(url);
}
