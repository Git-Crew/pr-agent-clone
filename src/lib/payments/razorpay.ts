import { redirect } from "next/navigation";

import crypto from "crypto";
import Razorpay from "razorpay";

import { getTeamByRazorpayCustomerId, getUser, updateTeamSubscription } from "@/lib/db/queries";
import type { Team } from "@/lib/db/schema";

// Lazy-initialize so the module can be imported at build time without env vars.
let _razorpay: InstanceType<typeof Razorpay> | null = null;

export function getRazorpayClient() {
  if (!_razorpay) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables are required");
    }
    _razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return _razorpay;
}

// Alias for backward compatibility
export const razorpay = new Proxy({} as InstanceType<typeof Razorpay>, {
  get(_target, prop, receiver) {
    const client = getRazorpayClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

/**
 * Create a Razorpay subscription for a team.
 * Returns the subscription object so the client can open the checkout modal.
 */
export async function createRazorpaySubscription({ team, planId }: { team: Team | null; planId: string }) {
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
    // biome-ignore lint/suspicious/noExplicitAny: Razorpay SDK types are incomplete
    const plan: any = await razorpay.plans.fetch(planId);
    planName = plan.item?.name || null;
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

  // biome-ignore lint/suspicious/noExplicitAny: Razorpay SDK types are incomplete
  return (plans.items || []).map((plan: any) => ({
    id: plan.id as string,
    name: (plan.item?.name as string) || "",
    description: (plan.item?.description as string) || "",
    amount: plan.item?.amount as number,
    currency: (plan.item?.currency as string) || "INR",
    period: plan.period as string,
    interval: plan.interval as number,
  }));
}
