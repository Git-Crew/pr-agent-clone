"use client";

import { useCallback } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

interface RazorpayCheckoutProps {
  subscriptionId: string;
  keyId: string;
  userName: string;
  userEmail: string;
  planName: string;
  onSuccess?: () => void;
}

export function useRazorpayCheckout() {
  const openCheckout = useCallback(
    ({ subscriptionId, keyId, userName, userEmail, planName, onSuccess }: RazorpayCheckoutProps) => {
      const options = {
        key: keyId,
        subscription_id: subscriptionId,
        name: "Studio Admin",
        description: `${planName} Subscription`,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_subscription_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const res = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (res.ok) {
              toast.success("Subscription activated successfully!");
              onSuccess?.();
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch {
            toast.error("Something went wrong. Please try again.");
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "hsl(var(--primary))",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    },
    [],
  );

  return { openCheckout };
}
