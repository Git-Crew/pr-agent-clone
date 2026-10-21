import Link from "next/link";

import { GitPullRequestArrow } from "lucide-react";
import type { Metadata } from "next";

import { GitHubSignIn } from "../../_components/github-sign-in";
import { RegisterForm } from "../../_components/register-form";

export const metadata: Metadata = {
  title: "Create an account · GitCrew",
  description: "Create a GitCrew account to run AI agents on your pull requests.",
  alternates: {
    canonical: "/auth/v1/register",
  },
};

export default function RegisterV1() {
  return (
    <div className="flex h-dvh">
      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <h2 className="font-medium tracking-tight">Create your account</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Sign up with GitHub to connect your repositories in one step.
            </p>
          </div>
          <div className="space-y-4">
            <GitHubSignIn mode="register" />
            <RegisterForm />
            <p className="text-center text-muted-foreground text-xs">
              Already have an account?{" "}
              <Link prefetch={false} href="login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden bg-primary lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <GitPullRequestArrow className="mx-auto size-12 text-primary-foreground" />
            <div className="space-y-2">
              <h1 className="font-light text-5xl text-primary-foreground">GitCrew</h1>
              <p className="text-primary-foreground/80 text-xl">AI agents on every pull request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
