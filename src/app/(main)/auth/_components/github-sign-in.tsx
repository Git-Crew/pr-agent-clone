import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getGitHubAppConfig } from "@/lib/server/deps";

import { GitHubButton } from "./social-auth/github-button";

/**
 * "Continue with GitHub" only works once the GitHub App exists, and the App is created from the dashboard.
 * Until then, explain the first-time path instead of showing a button that cannot work.
 */
export async function GitHubSignIn({ mode }: { mode: "login" | "register" }) {
  const config = await getGitHubAppConfig().catch(() => null);

  if (config) {
    return <GitHubButton className="w-full" variant="default" />;
  }

  return (
    <Alert>
      <AlertTitle>First-time setup</AlertTitle>
      <AlertDescription>
        <p>
          GitHub sign-in turns on after an admin connects the GitHub App.{" "}
          {mode === "register"
            ? "Create an account with an admin email below; you will go straight to the one-click GitHub setup."
            : "Sign in with your email below, or register first; you will go straight to the one-click GitHub setup."}
        </p>
      </AlertDescription>
    </Alert>
  );
}
