export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
      <span className="relative z-10 bg-background px-2 text-muted-foreground">{label}</span>
    </div>
  );
}

const ERRORS: Record<string, string> = {
  state_mismatch: "That sign-in link expired. Please try again.",
  missing_code: "GitHub did not finish the sign-in. Please try again.",
  github_failed: "We could not sign you in with GitHub. Please try again.",
  github_not_configured: "Sign in with GitHub is not configured on this deployment yet.",
};

export function authErrorMessage(code: string | undefined): string | null {
  if (!code) return null;
  return ERRORS[code] ?? "Something went wrong. Please try again.";
}
