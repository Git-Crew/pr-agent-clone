import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SupportCard() {
  return (
    <Card size="sm" className="overflow-hidden shadow-none group-data-[collapsible=icon]:hidden">
      <CardHeader className="min-w-0 px-4">
        <CardTitle className="truncate text-sm">Bring your own agent</CardTitle>
        <CardDescription className="line-clamp-3">
          Register any HTTPS endpoint as an agent and run it on your PRs next to the built-in ones.{" "}
          <Link href="/dashboard/agents" className="text-foreground hover:underline">
            Add an agent
          </Link>
          .
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
