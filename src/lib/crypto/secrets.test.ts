import { describe, expect, it } from "vitest";

import { decryptSecret, encryptSecret, maskSecret } from "./secrets";
import { randomBytes } from "node:crypto";

const key = randomBytes(32).toString("base64");

describe("secrets encryption", () => {
  it("round-trips a value", () => {
    const stored = encryptSecret("sk-ant-test-value", key);
    expect(stored.startsWith("v1:")).toBe(true);
    expect(stored).not.toContain("sk-ant-test-value");
    expect(decryptSecret(stored, key)).toBe("sk-ant-test-value");
  });

  it("uses a fresh IV for every value", () => {
    expect(encryptSecret("same", key)).not.toBe(encryptSecret("same", key));
  });

  it("rejects tampered ciphertext", () => {
    const [v, iv, tag, data] = encryptSecret("hello", key).split(":");
    const flipped = Buffer.from(data, "base64");
    flipped[0] ^= 1;
    expect(() => decryptSecret([v, iv, tag, flipped.toString("base64")].join(":"), key)).toThrow();
  });

  it("rejects the wrong key", () => {
    const stored = encryptSecret("hello", key);
    expect(() => decryptSecret(stored, randomBytes(32).toString("base64"))).toThrow();
  });

  it("requires a 32-byte key", () => {
    expect(() => encryptSecret("x", Buffer.from("short").toString("base64"))).toThrow(/32 bytes/);
  });

  it("masks values for display", () => {
    expect(maskSecret("short")).toBe("••••••••");
    expect(maskSecret("sk-1234567890")).toBe("sk-••••90");
  });
});
