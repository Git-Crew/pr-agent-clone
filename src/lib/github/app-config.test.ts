import { describe, expect, it, vi } from "vitest";

import { appConfig } from "@/lib/db/schema";
import { canManageGitHubApp, getAppUrl, readGitHubAppEnv } from "@/lib/env";
import { createTestDb } from "@/lib/test/db";

import { loadGitHubAppConfig, saveGitHubAppFromManifest } from "./app-config";
import {
  buildAppManifest,
  convertManifestCode,
  isLocalUrl,
  type ManifestConversion,
  manifestFormAction,
} from "./manifest";
import { randomBytes } from "node:crypto";

const key = randomBytes(32).toString("base64");

const conversion: ManifestConversion = {
  id: 123456,
  slug: "agent-pr-test",
  client_id: "Iv23liTEST",
  client_secret: "client-secret-value",
  webhook_secret: "webhook-secret-value-long",
  pem: "-----BEGIN RSA PRIVATE KEY-----\nabc\n-----END RSA PRIVATE KEY-----\n",
  html_url: "https://github.com/apps/agent-pr-test",
  owner: { login: "octo" },
};

const fullEnv = {
  GITHUB_APP_ID: "1",
  GITHUB_APP_SLUG: "from-env",
  GITHUB_APP_PRIVATE_KEY: "line1\\nline2",
  GITHUB_APP_CLIENT_ID: "cid",
  GITHUB_APP_CLIENT_SECRET: "csecret",
  GITHUB_WEBHOOK_SECRET: "sixteen-chars-min!",
} as unknown as NodeJS.ProcessEnv;

describe("App manifest", () => {
  it("points every URL at this deployment and asks for least privilege", () => {
    const manifest = buildAppManifest("https://agent-pr.example.com/", "Agent PR");
    expect(manifest).toMatchObject({
      name: "Agent PR",
      url: "https://agent-pr.example.com",
      hook_attributes: { url: "https://agent-pr.example.com/api/github/webhook", active: true },
      redirect_url: "https://agent-pr.example.com/api/auth/github/app-created",
      callback_urls: ["https://agent-pr.example.com/api/auth/github/callback"],
      request_oauth_on_install: true,
      default_events: ["pull_request"],
    });
    expect(manifest.default_permissions).toEqual({
      actions: "write",
      checks: "write",
      contents: "read",
      metadata: "read",
      pull_requests: "write",
    });
  });

  it("creates a private App without a webhook on localhost", () => {
    const manifest = buildAppManifest("http://localhost:3000", "Agent PR local");
    expect(manifest).not.toHaveProperty("hook_attributes");
    expect(manifest).not.toHaveProperty("default_events");
    expect(manifest).toMatchObject({
      public: false,
      callback_urls: ["http://localhost:3000/api/auth/github/callback"],
      redirect_url: "http://localhost:3000/api/auth/github/app-created",
    });
    expect(isLocalUrl("http://127.0.0.1:3000")).toBe(true);
    expect(isLocalUrl("https://pr-agent.vercel.app")).toBe(false);
  });

  it("posts to the personal or organization registration page with state", () => {
    expect(manifestFormAction(null, "s t")).toBe("https://github.com/settings/apps/new?state=s%20t");
    expect(manifestFormAction("acme", "x")).toBe("https://github.com/organizations/acme/settings/apps/new?state=x");
  });

  it("converts the code without auth and validates the response", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(conversion), { status: 201 }));
    await expect(convertManifestCode("abc123", fetchMock as unknown as typeof fetch)).resolves.toMatchObject({
      id: 123456,
      slug: "agent-pr-test",
    });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.github.com/app-manifests/abc123/conversions");
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>).Authorization).toBeUndefined();
    await expect(convertManifestCode("../evil", fetchMock as unknown as typeof fetch)).rejects.toThrow();
  });
});

describe("App credentials", () => {
  it("reads complete env config and unescapes the PEM", () => {
    expect(readGitHubAppEnv({} as NodeJS.ProcessEnv)).toBeNull();
    expect(readGitHubAppEnv(fullEnv)?.GITHUB_APP_PRIVATE_KEY).toBe("line1\nline2");
  });

  it("stores manifest credentials encrypted and prefers env when set", async () => {
    const db = await createTestDb();
    const env = { ENCRYPTION_KEY: key } as unknown as NodeJS.ProcessEnv;
    expect(await loadGitHubAppConfig(db, env)).toBeNull();

    await saveGitHubAppFromManifest(db, conversion, null, env);
    const [row] = await db.select().from(appConfig);
    expect(row.privateKey).not.toContain("BEGIN");
    expect(row.clientSecret.startsWith("v1:")).toBe(true);

    const loaded = await loadGitHubAppConfig(db, env);
    expect(loaded).toMatchObject({
      source: "database",
      GITHUB_APP_ID: "123456",
      GITHUB_APP_SLUG: "agent-pr-test",
      GITHUB_APP_CLIENT_SECRET: "client-secret-value",
      GITHUB_WEBHOOK_SECRET: "webhook-secret-value-long",
      GITHUB_APP_PRIVATE_KEY: conversion.pem,
    });

    // Saving again replaces the single row.
    await saveGitHubAppFromManifest(db, { ...conversion, slug: "renamed" }, null, env);
    expect(await db.select().from(appConfig)).toHaveLength(1);

    const fromEnv = await loadGitHubAppConfig(db, { ...fullEnv, ENCRYPTION_KEY: key } as NodeJS.ProcessEnv);
    expect(fromEnv).toMatchObject({ source: "env", GITHUB_APP_SLUG: "from-env" });
  });
});

describe("env helpers", () => {
  it("resolves APP_URL, then the Vercel production domain", () => {
    expect(getAppUrl({ APP_URL: "https://a.test/" } as unknown as NodeJS.ProcessEnv)).toBe("https://a.test");
    expect(getAppUrl({ VERCEL_PROJECT_PRODUCTION_URL: "pr-agent.vercel.app" } as unknown as NodeJS.ProcessEnv)).toBe(
      "https://pr-agent.vercel.app",
    );
    expect(() => getAppUrl({} as NodeJS.ProcessEnv)).toThrow();
  });

  it("only lets ADMIN_EMAILS manage the App in production", () => {
    const user = { email: "Me@Example.com", githubLogin: "MrSpidey" };
    expect(canManageGitHubApp(user, { NODE_ENV: "development" } as unknown as NodeJS.ProcessEnv)).toBe(true);
    expect(canManageGitHubApp(user, { NODE_ENV: "production" } as unknown as NodeJS.ProcessEnv)).toBe(false);
    expect(
      canManageGitHubApp(user, {
        NODE_ENV: "production",
        ADMIN_EMAILS: "me@example.com",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe(true);
    expect(
      canManageGitHubApp(user, {
        NODE_ENV: "production",
        ADMIN_EMAILS: "x@y.z, mrspidey",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe(true);
  });
});
