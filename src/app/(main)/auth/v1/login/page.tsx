import Link from "next/link";

import { GitPullRequestArrow } from "lucide-react";
import type { Metadata } from "next";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { AuthDivider, authErrorMessage } from "../../_components/auth-divider";
import { LoginForm } from "../../_components/login-form";
import { GitHubButton } from "../../_components/social-auth/github-button";

export const metadata: Metadata = {
  title: "Sign in · Agent PR",
  description: "Sign in to manage the AI agents that run on your pull requests.",
  alternates: {
    canonical: "/auth/v1/login",
  },
};

export default async function LoginV1({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const error = authErrorMessage((await searchParams).error);

  return (
    <div className="flex h-dvh">
      <div className="hidden bg-primary lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <GitPullRequestArrow className="mx-auto size-12 text-primary-foreground" />
            <div className="space-y-2">
              <h1 className="font-light text-5xl text-primary-foreground">Agent PR</h1>
              <p className="text-primary-foreground/80 text-xl">AI agents on every pull request</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <h2 className="font-medium tracking-tight">Sign in</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Use GitHub to see the repositories where Agent PR is installed.
            </p>
          </div>
          <div className="space-y-4">
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <GitHubButton className="w-full" variant="default" />
            <AuthDivider label="Or with email" />
            <LoginForm />
            <p className="text-center text-muted-foreground text-xs">
              Don&apos;t have an account?{" "}
              <Link prefetch={false} href="register" className="text-primary">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
