import { eq } from "drizzle-orm";

import { type User, users } from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";

export type GoogleProfile = {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  emailVerified: boolean;
};

export function readGoogleOAuthEnv(env: NodeJS.ProcessEnv = process.env): {
  clientId: string;
  clientSecret: string;
} | null {
  const clientId = env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = env.GOOGLE_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export async function exchangeGoogleCode(input: {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}): Promise<string> {
  const body = new URLSearchParams({
    code: input.code,
    client_id: input.clientId,
    client_secret: input.clientSecret,
    redirect_uri: input.redirectUri,
    grant_type: "authorization_code",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`Google token exchange failed (${res.status})`);
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Google did not return an access token");
  return json.access_token;
}

export async function fetchGoogleProfile(accessToken: string): Promise<GoogleProfile> {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Google userinfo failed (${res.status})`);
  const json = (await res.json()) as {
    sub?: string;
    email?: string;
    email_verified?: boolean | string;
    name?: string;
    picture?: string;
  };
  if (!json.sub || !json.email) throw new Error("Google profile was incomplete");
  const emailVerified = json.email_verified === true || json.email_verified === "true";
  if (!emailVerified) throw new Error("Google email is not verified");
  return {
    id: json.sub,
    email: json.email,
    name: json.name ?? null,
    picture: json.picture ?? null,
    emailVerified,
  };
}

/**
 * Find or create the user for a Google identity. A signed-in account gets Google linked; otherwise
 * the Google id is the key. Matching on email links an existing email/password account.
 */
export async function upsertGoogleUser(db: Db, profile: GoogleProfile, signedInUserId: number | null): Promise<User> {
  const patch = {
    googleId: profile.id,
    avatarUrl: profile.picture,
    name: profile.name,
    updatedAt: new Date(),
  };

  const [byGoogle] = await db.select().from(users).where(eq(users.googleId, profile.id)).limit(1);
  if (byGoogle) {
    const [updated] = await db.update(users).set(patch).where(eq(users.id, byGoogle.id)).returning();
    return updated;
  }

  if (signedInUserId !== null) {
    const [linked] = await db.update(users).set(patch).where(eq(users.id, signedInUserId)).returning();
    if (linked) return linked;
  }

  const [byEmail] = await db.select().from(users).where(eq(users.email, profile.email)).limit(1);
  if (byEmail) {
    const [linked] = await db.update(users).set(patch).where(eq(users.id, byEmail.id)).returning();
    return linked;
  }

  const [created] = await db
    .insert(users)
    .values({
      ...patch,
      email: profile.email,
      role: "owner",
    })
    .returning();
  return created;
}
