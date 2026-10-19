import { after, NextResponse } from "next/server";

import { db } from "@/lib/db/drizzle";
import { webhookDeliveries } from "@/lib/db/schema";
import { verifyWebhookSignature } from "@/lib/github/webhook";
import { handleWebhookEvent } from "@/lib/pipeline/events";
import { getGitHubAppConfig, getOrchestratorDeps } from "@/lib/server/deps";

// GitHub expects a 2xx within 10 seconds, so verify, dedupe and acknowledge first, then do the work in after().
export const maxDuration = 60;

export async function POST(request: Request) {
  const config = await getGitHubAppConfig();
  if (!config) return NextResponse.json({ error: "GitHub App is not configured" }, { status: 503 });
  const secret = config.GITHUB_WEBHOOK_SECRET;

  const rawBody = await request.text();
  if (!verifyWebhookSignature(secret, rawBody, request.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = request.headers.get("x-github-event") ?? "";
  const deliveryId = request.headers.get("x-github-delivery");
  if (deliveryId) {
    const inserted = await db
      .insert(webhookDeliveries)
      .values({ id: deliveryId, event })
      .onConflictDoNothing()
      .returning({ id: webhookDeliveries.id });
    if (inserted.length === 0) return NextResponse.json({ ok: true, duplicate: true });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  after(async () => {
    try {
      await handleWebhookEvent(await getOrchestratorDeps(), event, payload);
    } catch (error) {
      console.error(`Webhook ${event} (${deliveryId}) failed`, error);
    }
  });

  return NextResponse.json({ ok: true }, { status: 202 });
}
