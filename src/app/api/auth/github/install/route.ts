import { NextResponse } from "next/server";

import { getAppUrl } from "@/lib/env";
import { getGitHubAppConfig } from "@/lib/server/deps";

import { createOAuthState } from "../oauth-state";

/** Send the user to install the GitHub App. GitHub returns `state` to the setup URL (our callback). */
export async function GET() {
  const config = await getGitHubAppConfig();
  if (!config) return NextResponse.redirect(new URL("/dashboard/setup", getAppUrl()));
  const url = new URL(`https://github.com/apps/${config.GITHUB_APP_SLUG}/installations/new`);
  url.searchParams.set("state", await createOAuthState());
  return NextResponse.redirect(url);
}
