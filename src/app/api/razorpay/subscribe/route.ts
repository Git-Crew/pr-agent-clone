import { type NextRequest, NextResponse } from "next/server";

import { getTeamForUser, getUser } from "@/lib/db/queries";
import { createRazorpaySubscription } from "@/lib/payments/razorpay";

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const team = await getTeamForUser();
    if (!team) {
      return NextResponse.json({ error: "No team found" }, { status: 400 });
    }

    const body = await request.json();
    const { planId } = body;

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
    }

    const result = await createRazorpaySubscription({ team, planId });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
