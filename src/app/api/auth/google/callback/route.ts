import { type NextRequest, NextResponse } from "next/server";

import { exchangeGoogleCode, fetchGoogleProfile, readGoogleOAuthEnv, upsertGoogleUser } from "@/lib/auth/google";
import { getSession, setSession } from "@/lib/auth/session";
import { db } from "@/lib/db/drizzle";
import { getAppUrl } from "@/lib/env";

import { consumeOAuthState } from "../../github/oauth-state";

export const maxDuration = 30;

/**
 * Google OAuth callback. Signs the user in without needing the GitHub App.
 * Connecting repositories still happens later via the GitHub App install.
 */
export async function GET(request: NextRequest) {
  const appUrl = getAppUrl();
  const fail = (reason: string) => NextResponse.redirect(new URL(`/auth/v1/login?error=${reason}`, appUrl));

  if (!(await consumeOAuthState(request.nextUrl.searchParams.get("state"), "/api/auth/google"))) {
    return fail("state_mismatch");
  }
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return fail("missing_code");

  const google = readGoogleOAuthEnv();
  if (!google) return fail("google_not_configured");

  let stage: "exchange" | "profile" | "db" | "session" = "exchange";
  try {
    const accessToken = await exchangeGoogleCode({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
      code,
      redirectUri: `${appUrl}/api/auth/google/callback`,
    });
    stage = "profile";
    const profile = await fetchGoogleProfile(accessToken);
    stage = "db";
    const session = await getSession().catch(() => null);
    const user = await upsertGoogleUser(db, profile, session?.user.id ?? null);
    stage = "session";
    await setSession(user);
    return NextResponse.redirect(new URL("/dashboard", appUrl));
  } catch (error) {
    console.error(`Google sign-in failed at ${stage}`, error);
    const message = error instanceof Error ? error.message : String(error);
    if (stage === "db" || /google_id|column|relation|does not exist|migrate/i.test(message)) {
      return fail("google_db");
    }
    if (
      stage === "exchange" ||
      stage === "profile" ||
      /token exchange|userinfo|incomplete|not verified|401|400/i.test(message)
    ) {
      return fail("google_token");
    }
    return fail("google_failed");
  }
}
