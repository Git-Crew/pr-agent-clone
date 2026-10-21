import { NextResponse } from "next/server";

import { db } from "@/lib/db/drizzle";
import { phasesSince } from "@/lib/observe/remember";
import { renderScrape, scrapePermitted } from "@/lib/observe/scrape";

const WINDOW_MS = 24 * 60 * 60 * 1000;

/** Prometheus text for the last 24 hours. Set GITCREW_SCRAPE_TOKEN in production. */
export async function GET(request: Request) {
  const allowed = scrapePermitted(request.headers.get("authorization"), {
    token: process.env.GITCREW_SCRAPE_TOKEN,
    production: process.env.NODE_ENV === "production",
  });
  if (!allowed) return new NextResponse("Scrape token required\n", { status: 401 });

  const notes = await phasesSince(db, new Date(Date.now() - WINDOW_MS));
  return new NextResponse(renderScrape(notes), {
    headers: { "content-type": "text/plain; version=0.0.4; charset=utf-8" },
  });
}
