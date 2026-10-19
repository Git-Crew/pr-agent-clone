import { ArrowUpRight, Building2, Plus, RefreshCw, UserRound } from "lucide-react";
import type { Metadata } from "next";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { listInstallations, listRepos, listSecrets, requireUser } from "@/lib/db/dashboard";
import { isGitHubAppConfigured } from "@/lib/env";

import { PageHeader } from "../_components/page-header";
import { SecretsManager } from "./_components/secrets-manager";

export const metadata: Metadata = { title: "Settings · Agent PR" };

function installationSettingsUrl(accountType: string, accountLogin: string, installationId: number) {
  return accountType === "Organization"
    ? `https://github.com/organizations/${accountLogin}/settings/installations/${installationId}`
    : `https://github.com/settings/installations/${installationId}`;
}

export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const user = await requireUser();
  const [installs, repos, secrets, { error }] = await Promise.all([
    listInstallations(user.id),
    listRepos(user.id),
    listSecrets(user.id),
    searchParams,
  ]);
  const configured = isGitHubAppConfigured();
  const encryptionReady = Boolean(process.env.ENCRYPTION_KEY);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader title="Settings" description="GitHub installations, your account and encrypted secrets." />

      {error === "github_not_configured" || !configured ? (
        <Alert variant="destructive">
          <AlertTitle>The GitHub App is not configured</AlertTitle>
          <AlertDescription>
            Set GITHUB_APP_ID, GITHUB_APP_SLUG, GITHUB_APP_PRIVATE_KEY, GITHUB_APP_CLIENT_ID, GITHUB_APP_CLIENT_SECRET
            and GITHUB_WEBHOOK_SECRET on this deployment. The README lists the App settings.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Installations</CardTitle>
            <CardDescription>GitHub accounts where Agent PR is installed and you have access.</CardDescription>
            <CardAction>
              <Button asChild size="sm">
                <a href="/api/auth/github/install">
                  <Plus data-icon="inline-start" />
                  Install
                </a>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {installs.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No installations yet. Install the App to connect repositories.
              </p>
            ) : (
              <ItemGroup className="gap-2">
                {installs.map((install) => (
                  <Item key={install.id} variant="outline" size="sm">
                    <ItemMedia variant="icon">
                      {install.accountType === "Organization" ? <Building2 /> : <UserRound />}
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>
                        {install.accountLogin}
                        {install.suspendedAt ? <Badge variant="destructive">Suspended</Badge> : null}
                      </ItemTitle>
                      <ItemDescription>
                        {install.accountType} · {install.repoCount} repositor{install.repoCount === 1 ? "y" : "ies"}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button asChild variant="ghost" size="sm">
                        <a
                          href={installationSettingsUrl(install.accountType, install.accountLogin, install.id)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Configure
                          <ArrowUpRight data-icon="inline-end" />
                        </a>
                      </Button>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              {user.githubLogin
                ? `Signed in as ${user.githubLogin} on GitHub.`
                : "Link your GitHub account to see your installations."}
            </CardDescription>
            <CardAction>
              <Button asChild size="sm" variant="outline">
                <a href="/api/auth/github/login">
                  <RefreshCw data-icon="inline-start" />
                  {user.githubLogin ? "Refresh access" : "Link GitHub"}
                </a>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Access follows GitHub: you see the installations GitHub says you can access. After you gain or lose access
            to an organization, use “Refresh access”.
          </CardContent>
        </Card>
      </div>

      <SecretsManager
        encryptionReady={encryptionReady}
        installations={installs.map((i) => ({ id: i.id, accountLogin: i.accountLogin }))}
        repos={repos.map((r) => ({ id: r.id, fullName: r.fullName, installationId: r.installationId }))}
        secrets={secrets}
      />
    </div>
  );
}
