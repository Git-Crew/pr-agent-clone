import { type NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { getUser } from "@/lib/db/queries";
import { teamMembers, teams } from "@/lib/db/schema";
import { razorpay, verifyRazorpaySignature } from "@/lib/payments/razorpay";

/**
 * POST /api/razorpay/verify
 *
 * Called from the client after Razorpay checkout modal completes.
 * Verifies the payment signature and updates the team subscription.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = body;

    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required payment parameters" }, { status: 400 });
    }

    const isValid = verifyRazorpaySignature({
      razorpayPaymentId: razorpay_payment_id,
      razorpaySubscriptionId: razorpay_subscription_id,
      razorpaySignature: razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's team
    const userTeam = await db
      .select({ teamId: teamMembers.teamId })
      .from(teamMembers)
      .where(eq(teamMembers.userId, user.id))
      .limit(1);

    if (userTeam.length === 0) {
      return NextResponse.json({ error: "User is not associated with any team" }, { status: 400 });
    }

    // Fetch subscription details from Razorpay
    // biome-ignore lint/suspicious/noExplicitAny: Razorpay SDK types are incomplete
    const subscription: any = await razorpay.subscriptions.fetch(razorpay_subscription_id);

    // Fetch plan to get name
    let planName: string | null = null;
    try {
      // biome-ignore lint/suspicious/noExplicitAny: Razorpay SDK types are incomplete
      const plan: any = await razorpay.plans.fetch(subscription.plan_id);
      planName = plan.item?.name || null;
    } catch {
      // plan name is optional
    }

    // Update team with subscription details
    await db
      .update(teams)
      .set({
        razorpayCustomerId: subscription.customer_id || null,
        razorpaySubscriptionId: razorpay_subscription_id,
        razorpayPlanId: subscription.plan_id,
        planName,
        subscriptionStatus: subscription.status,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, userTeam[0].teamId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
