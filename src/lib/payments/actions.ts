"use server";

import { withTeam } from "@/lib/auth/middleware";

import { createRazorpaySubscription } from "./razorpay";

export const checkoutAction = withTeam(async (formData, team) => {
  const planId = formData.get("planId") as string;
  const result = await createRazorpaySubscription({ team, planId });
  return result;
});
