import Link from "next/link";

import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listRepos, listRuns, requireUser } from "@/lib/db/dashboard";
import type { RunStatus } from "@/lib/db/schema";

import { PageHeader } from "../_components/page-header";
import { RunsTable } from "../_components/runs-table";
import { RunFilters } from "./_components/run-filters";

export const metadata: Metadata = { title: "Runs · GitCrew" };

const PAGE_SIZE = 25;
const STATUSES: RunStatus[] = ["queued", "running", "completed", "cancelled"];

type SearchParams = Promise<{ status?: string; repo?: string; page?: string }>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser();
  const params = await searchParams;
  const status = STATUSES.find((s) => s === params.status);
  const repoId = Number(params.repo) || undefined;
  const page = Math.max(1, Number(params.page) || 1);

  const [{ runs, total }, repos] = await Promise.all([
    listRuns(user.id, { status, repoId, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
    listRepos(user.id),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageHref = (target: number) => {
    const query = new URLSearchParams();
    if (status) query.set("status", status);
    if (repoId) query.set("repo", String(repoId));
    query.set("page", String(target));
    return `/dashboard/runs?${query.toString()}`;
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader title="Runs" description="Every pipeline run, newest first. Open one for findings and logs." />
      <Card>
        <CardContent className="flex flex-col gap-4">
          <RunFilters
            repos={repos.map((r) => ({ id: r.id, fullName: r.fullName }))}
            status={status ?? ""}
            repoId={repoId ? String(repoId) : ""}
          />
          <RunsTable runs={runs} />
          {pages > 1 ? (
            <nav className="flex items-center justify-between text-sm" aria-label="Pagination">
              <span className="text-muted-foreground">
                Page {page} of {pages} · {total} runs
              </span>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" aria-disabled={page <= 1}>
                  <Link prefetch={false} href={pageHref(Math.max(1, page - 1))}>
                    Previous
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" aria-disabled={page >= pages}>
                  <Link prefetch={false} href={pageHref(Math.min(pages, page + 1))}>
                    Next
                  </Link>
                </Button>
              </div>
            </nav>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
