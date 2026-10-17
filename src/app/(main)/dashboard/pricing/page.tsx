import Script from "next/script";
import type { Metadata } from "next";

import { getTeamForUser } from "@/lib/db/queries";
import { getRazorpayPlans } from "@/lib/payments/razorpay";

import { PricingClient } from "./_components/pricing-client";

export const metadata: Metadata = {
  title: "Pricing - Studio Admin",
  description: "Choose a subscription plan for your team.",
};

// Default plans to show when Razorpay plans are not yet configured
const defaultPlans = [
  {
    id: "",
    name: "Base",
    description: "For individuals and small teams getting started.",
    amount: 79900,
    currency: "INR",
    period: "monthly",
    interval: 1,
    features: ["Unlimited Usage", "Unlimited Workspace Members", "Email Support", "Basic Analytics"],
  },
  {
    id: "",
    name: "Plus",
    description: "For growing teams that need more power.",
    amount: 149900,
    currency: "INR",
    period: "monthly",
    interval: 1,
    features: [
      "Everything in Base",
      "Early Access to New Features",
      "24/7 Support + Slack Access",
      "Advanced Analytics",
      "Custom Integrations",
    ],
    popular: true,
  },
];

export default async function PricingPage() {
  let plans = defaultPlans;
  let currentPlanId: string | null = null;
  let subscriptionStatus: string | null = null;

  try {
    const razorpayPlans = await getRazorpayPlans();
    if (razorpayPlans.length > 0) {
      plans = razorpayPlans.map((plan, index) => ({
        ...plan,
        features: defaultPlans[index]?.features || ["Full Access"],
        popular: index === 1,
      }));
    }
  } catch {
    // Fall back to default plans if Razorpay is not configured
  }

  try {
    const team = await getTeamForUser();
    if (team) {
      currentPlanId = team.razorpayPlanId;
      subscriptionStatus = team.subscriptionStatus;
    }
  } catch {
    // Not logged in or no team
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <PricingClient plans={plans} currentPlanId={currentPlanId} subscriptionStatus={subscriptionStatus} />
    </>
  );
}
