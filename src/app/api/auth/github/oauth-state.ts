import { cookies } from "next/headers";

import { randomBytes, timingSafeEqual } from "node:crypto";

// CSRF protection for the OAuth and install redirects: a random state in an httpOnly cookie that must come back.

const STATE_COOKIE = "gh_oauth_state";

export async function createOAuthState(): Promise<string> {
  const state = randomBytes(24).toString("base64url");
  (await cookies()).set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/api/auth/github",
  });
  return state;
}

export async function consumeOAuthState(received: string | null): Promise<boolean> {
  const store = await cookies();
  const expected = store.get(STATE_COOKIE)?.value;
  store.delete({ name: STATE_COOKIE, path: "/api/auth/github" });
  if (!expected || !received) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && timingSafeEqual(a, b);
}
