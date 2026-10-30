import { type NextRequest, NextResponse } from "next/server";

import { exchangeGoogleCode, fetchGoogleProfile, readGoogleOAuthEnv, upsertGoogleUser } from "@/lib/auth/google";
import { getSession, setSession } from "@/lib/auth/session";
import { getAppUrl } from "@/lib/env";
import { getOrchestratorDeps } from "@/lib/server/deps";

import { consumeOAuthState } from "../../github/oauth-state";

export const maxDuration = 30;

/** Google OAuth callback. Signs the user in; they still connect GitHub separately to see installations. */
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

  try {
    const accessToken = await exchangeGoogleCode({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
      code,
      redirectUri: `${appUrl}/api/auth/google/callback`,
    });
    const profile = await fetchGoogleProfile(accessToken);
    const deps = await getOrchestratorDeps();
    const session = await getSession().catch(() => null);
    const user = await upsertGoogleUser(deps.db, profile, session?.user.id ?? null);
    await setSession(user);
    return NextResponse.redirect(new URL("/dashboard", appUrl));
  } catch (error) {
    console.error("Google sign-in failed", error);
    return fail("google_failed");
  }
}
