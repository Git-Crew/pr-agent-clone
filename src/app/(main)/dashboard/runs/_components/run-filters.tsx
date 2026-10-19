"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

export function RunFilters({
  repos,
  status,
  repoId,
}: {
  repos: { id: number; fullName: string }[];
  status: string;
  repoId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <NativeSelect aria-label="Filter by status" value={status} onChange={(e) => setParam("status", e.target.value)}>
        <NativeSelectOption value="">All statuses</NativeSelectOption>
        <NativeSelectOption value="queued">Queued</NativeSelectOption>
        <NativeSelectOption value="running">Running</NativeSelectOption>
        <NativeSelectOption value="completed">Completed</NativeSelectOption>
        <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
      </NativeSelect>
      <NativeSelect aria-label="Filter by repository" value={repoId} onChange={(e) => setParam("repo", e.target.value)}>
        <NativeSelectOption value="">All repositories</NativeSelectOption>
        {repos.map((repo) => (
          <NativeSelectOption key={repo.id} value={String(repo.id)}>
            {repo.fullName}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
