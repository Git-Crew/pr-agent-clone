import { and, eq, inArray, notInArray } from "drizzle-orm";

import { installationMembers, installations, type User, users } from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";
import type { GitHubUser, InstallationInfo } from "@/lib/github/client";
import { type OrchestratorDeps, syncInstallation, upsertInstallation } from "@/lib/pipeline/orchestrator";

/**
 * Find or create the user for a GitHub identity. A signed-in user (email/password) gets GitHub linked to their
 * account; otherwise the GitHub id is the key. New users use their public GitHub email, or the noreply address
 * when it is private or already taken by another account.
 */
export async function upsertGitHubUser(db: Db, gh: GitHubUser, signedInUserId: number | null): Promise<User> {
  const profile = { githubId: gh.id, githubLogin: gh.login, avatarUrl: gh.avatar_url, updatedAt: new Date() };

  const [existing] = await db.select().from(users).where(eq(users.githubId, gh.id)).limit(1);
  if (existing) {
    const [updated] = await db.update(users).set(profile).where(eq(users.id, existing.id)).returning();
    return updated;
  }

  if (signedInUserId !== null) {
    const [linked] = await db.update(users).set(profile).where(eq(users.id, signedInUserId)).returning();
    if (linked) return linked;
  }

  const noreply = `${gh.id}+${gh.login}@users.noreply.github.com`;
  let email = gh.email ?? noreply;
  const [taken] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (taken) email = noreply;

  const [created] = await db
    .insert(users)
    .values({ ...profile, email, name: gh.name ?? gh.login, role: "owner" })
    .returning();
  return created;
}

/** Record which installations the user can see; sync repos for installations we have not seen before. */
export async function syncUserInstallations(
  deps: OrchestratorDeps,
  userId: number,
  userInstallations: InstallationInfo[],
): Promise<void> {
  const { db } = deps;
  const ids = userInstallations.map((i) => i.id);
  const known = ids.length
    ? await db.select({ id: installations.id }).from(installations).where(inArray(installations.id, ids))
    : [];
  const knownIds = new Set(known.map((k) => k.id));

  for (const installation of userInstallations) {
    if (knownIds.has(installation.id)) await upsertInstallation(db, installation);
    else await syncInstallation(deps, installation);
    await db
      .insert(installationMembers)
      .values({ userId, installationId: installation.id })
      .onConflictDoUpdate({
        target: [installationMembers.userId, installationMembers.installationId],
        set: { syncedAt: new Date() },
      });
  }

  // Drop access the user no longer has on GitHub.
  await db
    .delete(installationMembers)
    .where(
      and(
        eq(installationMembers.userId, userId),
        ids.length ? notInArray(installationMembers.installationId, ids) : undefined,
      ),
    );
}
