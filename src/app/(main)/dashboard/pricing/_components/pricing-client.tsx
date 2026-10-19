"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Check } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useRazorpayCheckout } from "./razorpay-checkout";

interface Plan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  period: string;
  interval: number;
  features: string[];
  popular?: boolean;
}

interface PricingClientProps {
  plans: Plan[];
  currentPlanId?: string | null;
  subscriptionStatus?: string | null;
}

export function PricingClient({ plans, currentPlanId, subscriptionStatus }: PricingClientProps) {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const { openCheckout } = useRazorpayCheckout();
  const router = useRouter();

  const isSubscribed = subscriptionStatus === "active" || subscriptionStatus === "authenticated";

  async function handleSubscribe(plan: Plan) {
    setLoadingPlanId(plan.id);

    try {
      const formData = new FormData();
      formData.append("planId", plan.id);

      const response = await fetch("/api/razorpay/subscribe", {
        method: "POST",
        body: JSON.stringify({ planId: plan.id }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to create subscription");
      }

      const data = await response.json();

      openCheckout({
        subscriptionId: data.subscriptionId,
        keyId: data.keyId,
        userName: data.userName,
        userEmail: data.userEmail,
        planName: plan.name,
        onSuccess: () => {
          router.refresh();
        },
      });
    } catch {
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setLoadingPlanId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-semibold text-3xl tracking-tight">Choose your plan</h1>
        <p className="text-muted-foreground">Start with a free trial. Upgrade anytime.</p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlanId === plan.id;
          const formattedPrice = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: plan.currency || "INR",
            minimumFractionDigits: 0,
          }).format(plan.amount / 100);

          return (
            <Card key={plan.id} className={plan.popular ? "border-primary shadow-md" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {plan.popular && <Badge variant="default">Popular</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="font-bold text-4xl">{formattedPrice}</span>
                  <span className="text-muted-foreground">
                    /{plan.period === "monthly" ? "month" : plan.period === "yearly" ? "year" : plan.period}
                  </span>
                </div>
                <Separator />
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan && isSubscribed ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    disabled={loadingPlanId !== null}
                    onClick={() => handleSubscribe(plan)}
                  >
                    {loadingPlanId === plan.id ? "Processing..." : isSubscribed ? "Switch Plan" : "Subscribe"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {plans.length === 0 && (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            No plans available yet. Create plans in your Razorpay dashboard to see them here.
          </p>
        </div>
      )}
    </div>
  );
}
