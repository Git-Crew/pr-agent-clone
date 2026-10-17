import Razorpay from "razorpay";
import crypto from "crypto";
import { redirect } from "next/navigation";
import type { Team } from "@/lib/db/schema";
import { getTeamByRazorpayCustomerId, getUser, updateTeamSubscription } from "@/lib/db/queries";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/**
 * Create a Razorpay subscription for a team.
 * Returns the subscription object so the client can open the checkout modal.
 */
export async function createRazorpaySubscription({
  team,
  planId,
}: {
  team: Team | null;
  planId: string;
}) {
  const user = await getUser();

  if (!team || !user) {
    redirect(`/auth/v1/register?redirect=checkout&planId=${planId}`);
  }

  // Create or reuse Razorpay customer
  let customerId = team.razorpayCustomerId;

  if (!customerId) {
    const customer = await razorpay.customers.create({
      name: user.name || user.email,
      email: user.email,
      notes: {
        teamId: team.id.toString(),
        userId: user.id.toString(),
      },
    });
    customerId = customer.id;
  }

  const subscription = await razorpay.subscriptions.create({
    plan_id: planId,
    customer_notify: 1,
    total_count: 12, // 12 billing cycles
    notes: {
      teamId: team.id.toString(),
      userId: user.id.toString(),
    },
  });

  return {
    subscriptionId: subscription.id,
    customerId,
    keyId: process.env.RAZORPAY_KEY_ID!,
    userName: user.name || "",
    userEmail: user.email,
  };
}

/**
 * Verify Razorpay payment signature after checkout.
 */
export function verifyRazorpaySignature({
  razorpayPaymentId,
  razorpaySubscriptionId,
  razorpaySignature,
}: {
  razorpayPaymentId: string;
  razorpaySubscriptionId: string;
  razorpaySignature: string;
}): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpayPaymentId}|${razorpaySubscriptionId}`)
    .digest("hex");

  return expectedSignature === razorpaySignature;
}

/**
 * Handle subscription state changes from webhook events.
 */
export async function handleSubscriptionChange(subscriptionData: {
  id: string;
  customer_id: string;
  plan_id: string;
  status: string;
  notes?: Record<string, string>;
}) {
  const { customer_id: customerId, id: subscriptionId, plan_id: planId, status } = subscriptionData;

  const team = await getTeamByRazorpayCustomerId(customerId);

  if (!team) {
    console.error("Team not found for Razorpay customer:", customerId);
    return;
  }

  // Fetch plan details to get the plan name
  let planName: string | null = null;
  try {
    const plan = await razorpay.plans.fetch(planId);
    planName = (plan as { item?: { name?: string } }).item?.name || null;
  } catch {
    console.error("Failed to fetch plan details for:", planId);
  }

  if (status === "active" || status === "authenticated") {
    await updateTeamSubscription(team.id, {
      razorpaySubscriptionId: subscriptionId,
      razorpayPlanId: planId,
      planName,
      subscriptionStatus: status,
    });
  } else if (status === "cancelled" || status === "expired" || status === "halted") {
    await updateTeamSubscription(team.id, {
      razorpaySubscriptionId: null,
      razorpayPlanId: null,
      planName: null,
      subscriptionStatus: status,
    });
  } else {
    // pending, created, etc.
    await updateTeamSubscription(team.id, {
      razorpaySubscriptionId: subscriptionId,
      razorpayPlanId: planId,
      planName,
      subscriptionStatus: status,
    });
  }
}

/**
 * Verify Razorpay webhook signature.
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}

/**
 * Fetch all active plans from Razorpay.
 */
export async function getRazorpayPlans() {
  const plans = await razorpay.plans.all({ count: 100 });

  return (plans.items || []).map((plan: Record<string, unknown>) => ({
    id: plan.id as string,
    name: ((plan.item as Record<string, unknown>)?.name as string) || "",
    description: ((plan.item as Record<string, unknown>)?.description as string) || "",
    amount: (plan.item as Record<string, unknown>)?.amount as number,
    currency: (plan.item as Record<string, unknown>)?.currency as string,
    period: plan.period as string,
    interval: plan.interval as number,
  }));
}
