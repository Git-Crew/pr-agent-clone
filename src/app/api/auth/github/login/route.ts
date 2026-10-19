import { NextResponse } from "next/server";

import { getAppUrl, getGitHubAppEnv } from "@/lib/env";

import { createOAuthState } from "../oauth-state";

/** Start "Sign in with GitHub" (the GitHub App's user authorization flow). */
export async function GET() {
  let clientId: string;
  try {
    clientId = getGitHubAppEnv().GITHUB_APP_CLIENT_ID;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/auth/v1/login?error=github_not_configured", getAppUrl()));
  }
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", `${getAppUrl()}/api/auth/github/callback`);
  url.searchParams.set("state", await createOAuthState());
  return NextResponse.redirect(url);
}
