import { NextResponse } from "next/server";

import { getAppUrl, getGitHubAppEnv } from "@/lib/env";

import { createOAuthState } from "../oauth-state";

/** Send the user to install the GitHub App. GitHub returns `state` to the setup URL (our callback). */
export async function GET() {
  let slug: string;
  try {
    slug = getGitHubAppEnv().GITHUB_APP_SLUG;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/dashboard/settings?error=github_not_configured", getAppUrl()));
  }
  const url = new URL(`https://github.com/apps/${slug}/installations/new`);
  url.searchParams.set("state", await createOAuthState());
  return NextResponse.redirect(url);
}
