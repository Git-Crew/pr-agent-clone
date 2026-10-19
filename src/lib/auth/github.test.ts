import { eq } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";

import { installationMembers, repositories, users } from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";
import type { GitHubClient, GitHubUser, InstallationInfo } from "@/lib/github/client";
import type { OrchestratorDeps } from "@/lib/pipeline/orchestrator";
import { createTestDb } from "@/lib/test/db";

import { syncUserInstallations, upsertGitHubUser } from "./github";

const gh: GitHubUser = { id: 77, login: "octocat", name: "Octo Cat", email: "octo@example.com", avatar_url: "a" };

function installation(id: number, login: string): InstallationInfo {
  return { id, account: { id: id * 10, login, type: "Organization", avatar_url: "" }, suspended_at: null };
}

let db: Db;
let deps: OrchestratorDeps;

beforeEach(async () => {
  db = await createTestDb();
  const github = {
    listRepositories: async () => [{ id: 1, full_name: "octo/app", private: true, default_branch: "main" }],
  } as unknown as GitHubClient;
  deps = { db, github: () => github, appUrl: "https://agent-pr.test" };
});

describe("upsertGitHubUser", () => {
  it("creates a GitHub-only user and updates it on the next sign-in", async () => {
    const created = await upsertGitHubUser(db, gh, null);
    expect(created).toMatchObject({
      githubId: 77,
      githubLogin: "octocat",
      email: "octo@example.com",
      passwordHash: null,
    });
    const again = await upsertGitHubUser(db, { ...gh, login: "octo-renamed" }, null);
    expect(again.id).toBe(created.id);
    expect(again.githubLogin).toBe("octo-renamed");
  });

  it("links GitHub to the signed-in email/password account", async () => {
    const [existing] = await db
      .insert(users)
      .values({ email: "me@example.com", passwordHash: "hash", role: "owner" })
      .returning();
    const linked = await upsertGitHubUser(db, gh, existing.id);
    expect(linked).toMatchObject({ id: existing.id, githubId: 77, email: "me@example.com" });
  });

  it("falls back to the noreply address for private or already-used emails", async () => {
    await db.insert(users).values({ email: "octo@example.com", passwordHash: "hash", role: "owner" });
    const created = await upsertGitHubUser(db, gh, null);
    expect(created.email).toBe("77+octocat@users.noreply.github.com");
    const privateEmail = await upsertGitHubUser(db, { ...gh, id: 78, login: "other", email: null }, null);
    expect(privateEmail.email).toBe("78+other@users.noreply.github.com");
  });
});

describe("syncUserInstallations", () => {
  it("records access, syncs repos of new installations and drops lost access", async () => {
    const user = await upsertGitHubUser(db, gh, null);
    await syncUserInstallations(deps, user.id, [installation(1, "octo"), installation(2, "acme")]);

    const members = await db.select().from(installationMembers).where(eq(installationMembers.userId, user.id));
    expect(members.map((m) => m.installationId).sort()).toEqual([1, 2]);
    expect(await db.select().from(repositories)).toHaveLength(1);

    await syncUserInstallations(deps, user.id, [installation(2, "acme")]);
    const after = await db.select().from(installationMembers).where(eq(installationMembers.userId, user.id));
    expect(after.map((m) => m.installationId)).toEqual([2]);

    await syncUserInstallations(deps, user.id, []);
    expect(await db.select().from(installationMembers).where(eq(installationMembers.userId, user.id))).toHaveLength(0);
  });
});
