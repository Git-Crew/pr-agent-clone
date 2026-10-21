import { Plus, SquareLibrary } from "lucide-react";
import type { Metadata } from "next";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { listRepos, requireUser } from "@/lib/db/dashboard";

import { PageHeader } from "../_components/page-header";
import { ReposTable } from "./_components/repos-table";

export const metadata: Metadata = { title: "Repositories · GitCrew" };

export default async function Page({ searchParams }: { searchParams: Promise<{ installed?: string }> }) {
  const user = await requireUser();
  const [repos, { installed }] = await Promise.all([listRepos(user.id), searchParams]);

  const installButton = (
    <Button asChild>
      <a href="/api/auth/github/install">
        <Plus data-icon="inline-start" />
        Add repositories
      </a>
    </Button>
  );

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Repositories"
        description="Choose which repositories run agents, and roll one pipeline out to many repos at once."
        actions={repos.length > 0 ? installButton : null}
      />

      {installed ? (
        <Alert>
          <AlertTitle>GitCrew is installed</AlertTitle>
          <AlertDescription>
            New repositories start with the FixMySlop agent. Open a repository to add the workflow file and tune its
            pipeline.
          </AlertDescription>
        </Alert>
      ) : null}

      {repos.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SquareLibrary />
            </EmptyMedia>
            <EmptyTitle>No repositories yet</EmptyTitle>
            <EmptyDescription>
              Install the GitCrew GitHub App on your account or organization and pick the repositories agents may run
              on.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>{installButton}</EmptyContent>
        </Empty>
      ) : (
        <Card>
          <CardContent>
            <ReposTable repos={repos} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
