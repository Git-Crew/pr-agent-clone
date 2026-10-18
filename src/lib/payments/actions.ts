"use server";

import { createRazorpaySubscription } from "./razorpay";
import { withTeam } from "@/lib/auth/middleware";

export const checkoutAction = withTeam(async (formData, team) => {
  const planId = formData.get("planId") as string;
  const result = await createRazorpaySubscription({ team, planId });
  return result;
});
