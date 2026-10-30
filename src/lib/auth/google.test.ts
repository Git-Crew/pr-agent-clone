import { describe, expect, it } from "vitest";

import { readGoogleOAuthEnv } from "@/lib/auth/google";

describe("Google OAuth env", () => {
  it("needs both client id and secret", () => {
    expect(readGoogleOAuthEnv({} as unknown as NodeJS.ProcessEnv)).toBeNull();
    expect(readGoogleOAuthEnv({ GOOGLE_CLIENT_ID: "id" } as unknown as NodeJS.ProcessEnv)).toBeNull();
    expect(
      readGoogleOAuthEnv({
        GOOGLE_CLIENT_ID: " id ",
        GOOGLE_CLIENT_SECRET: " secret ",
      } as unknown as NodeJS.ProcessEnv),
    ).toEqual({ clientId: "id", clientSecret: "secret" });
  });
});
