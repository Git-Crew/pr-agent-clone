import { readGoogleOAuthEnv } from "@/lib/auth/google";

import { GoogleButton } from "./social-auth/google-button";

/** "Continue with Google" when GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set. */
export function GoogleSignIn() {
  if (!readGoogleOAuthEnv()) return null;
  return <GoogleButton className="w-full" variant="default" />;
}
