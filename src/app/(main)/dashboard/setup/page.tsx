import { ArrowUpRight, CircleCheck, Plus } from "lucide-react";
import type { Metadata } from "next";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/db/dashboard";
import { canManageGitHubApp, getAppUrl } from "@/lib/env";
import { APP_EVENTS, APP_PERMISSIONS } from "@/lib/github/manifest";
import { getGitHubAppConfig } from "@/lib/server/deps";

import { PageHeader } from "../_components/page-header";
import { CreateAppForm } from "./_components/create-app-form";

export const metadata: Metadata = { title: "GitHub App · Agent PR" };

const ERRORS: Record<string, string> = {
  state_mismatch: "The setup link expired. Start again.",
  not_admin: "Only admins listed in ADMIN_EMAILS can create the App.",
  env_configured: "The App is already configured with environment variables.",
  missing_code: "GitHub did not send back a code. Start again.",
  conversion_failed:
    "GitHub created the App, but we could not fetch its credentials. Delete it on GitHub and try again.",
};

function defaultAppName(appUrl: string) {
  const host = new URL(appUrl).hostname.split(".")[0] ?? "local";
  return `Agent PR ${host}`.slice(0, 34);
}

export default async function Page({ searchParams }: { searchParams: Promise<{ created?: string; error?: string }> }) {
  const user = await requireUser();
  const [config, params] = await Promise.all([getGitHubAppConfig(), searchParams]);
  const appUrl = getAppUrl();
  const isAdmin = canManageGitHubApp(user);
  const error = params.error ? (ERRORS[params.error] ?? "Something went wrong.") : null;
  const reachable = !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(appUrl);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="GitHub App"
        description="Agent PR talks to GitHub through one GitHub App: webhooks, check runs, reviews and workflow dispatch."
      />

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Setup did not finish</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {params.created ? (
        <Alert>
          <AlertTitle>The GitHub App is ready</AlertTitle>
          <AlertDescription>Now install it on the repositories agents should run on.</AlertDescription>
        </Alert>
      ) : null}

      {config ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleCheck className="size-4 text-green-600 dark:text-green-400" aria-hidden />
              {config.GITHUB_APP_SLUG}
            </CardTitle>
            <CardDescription>
              App ID {config.GITHUB_APP_ID} · credentials from{" "}
              {config.source === "env" ? "environment variables" : "the one-click setup (encrypted in the database)"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild>
              <a href="/api/auth/github/install">
                <Plus data-icon="inline-start" />
                Install on repositories
              </a>
            </Button>
            {config.htmlUrl ? (
              <Button asChild variant="outline">
                <a href={config.htmlUrl} target="_blank" rel="noreferrer">
                  View on GitHub
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create the GitHub App</CardTitle>
            <CardDescription>
              One click on GitHub creates the App with the right permissions, webhook and callback URLs for{" "}
              <code>{appUrl}</code>. Its credentials come back here and are stored encrypted.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {reachable ? null : (
              <Alert>
                <AlertTitle>This deployment runs on localhost</AlertTitle>
                <AlertDescription>
                  GitHub cannot deliver webhooks to localhost, and the runner cannot reach it. Deploy (or set APP_URL to
                  a public tunnel URL) before creating the App.
                </AlertDescription>
              </Alert>
            )}
            {isAdmin ? (
              <CreateAppForm defaultName={defaultAppName(appUrl)} />
            ) : (
              <p className="text-muted-foreground text-sm">
                Ask an admin to finish setup. Admins are the emails or GitHub logins in ADMIN_EMAILS.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>What the App can do</CardTitle>
          <CardDescription>Least privilege: only what the agents need.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {Object.entries(APP_PERMISSIONS).map(([name, level]) => (
            <Badge key={name} variant="outline">
              {name.replace("_", " ")}: {level}
            </Badge>
          ))}
          {APP_EVENTS.map((event) => (
            <Badge key={event} variant="secondary">
              event: {event.replace("_", " ")}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
