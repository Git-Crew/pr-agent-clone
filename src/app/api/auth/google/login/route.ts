import { NextResponse } from "next/server";

import { readGoogleOAuthEnv } from "@/lib/auth/google";
import { getAppUrl } from "@/lib/env";

import { createOAuthState } from "../../github/oauth-state";

/** Starts "Continue with Google". */
export async function GET() {
  const appUrl = getAppUrl();
  const google = readGoogleOAuthEnv();
  if (!google) return NextResponse.redirect(new URL("/auth/v1/login?error=google_not_configured", appUrl));

  const state = await createOAuthState("/api/auth/google");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", google.clientId);
  url.searchParams.set("redirect_uri", `${appUrl}/api/auth/google/callback`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("prompt", "select_account");
  return NextResponse.redirect(url);
}
