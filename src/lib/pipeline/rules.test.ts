import { describe, expect, it } from "vitest";

import { evaluateStep, parseGlobList, type StepRules } from "./rules";

const base: StepRules = {
  enabled: true,
  includePaths: [],
  excludePaths: [],
  branches: [],
  runOnDrafts: false,
  runOnForks: true,
};

const pr = {
  baseRef: "main",
  draft: false,
  isFork: false,
  changedFiles: [
    { path: "src/app/page.tsx", removed: false },
    { path: "src/old.ts", removed: true },
    { path: "docs/readme.md", removed: false },
    { path: ".github/workflows/ci.yml", removed: false },
  ],
};

describe("evaluateStep", () => {
  it("runs on every non-removed changed file by default", () => {
    expect(evaluateStep(base, pr)).toEqual({
      run: true,
      files: ["src/app/page.tsx", "docs/readme.md", ".github/workflows/ci.yml"],
    });
  });

  it("applies include and exclude globs, matching dotfiles", () => {
    expect(evaluateStep({ ...base, includePaths: ["src/**"] }, pr)).toEqual({ run: true, files: ["src/app/page.tsx"] });
    expect(evaluateStep({ ...base, excludePaths: ["docs/**", "**/*.yml"] }, pr)).toEqual({
      run: true,
      files: ["src/app/page.tsx"],
    });
    expect(evaluateStep({ ...base, includePaths: [".github/**"] }, pr)).toEqual({
      run: true,
      files: [".github/workflows/ci.yml"],
    });
  });

  it("counts removed files as touching a path but does not scan them", () => {
    const decision = evaluateStep({ ...base, includePaths: ["src/old.ts"] }, pr);
    expect(decision).toEqual({ run: true, files: [] });
  });

  it("skips with a reason", () => {
    expect(evaluateStep({ ...base, includePaths: ["lib/**"] }, pr)).toEqual({
      run: false,
      reason: "No changed files match lib/**",
    });
    expect(evaluateStep({ ...base, enabled: false }, pr)).toMatchObject({ run: false });
    expect(evaluateStep(base, { ...pr, draft: true })).toMatchObject({
      run: false,
      reason: expect.stringContaining("Draft"),
    });
    expect(evaluateStep({ ...base, runOnDrafts: true }, { ...pr, draft: true })).toMatchObject({ run: true });
    expect(evaluateStep({ ...base, runOnForks: false }, { ...pr, isFork: true })).toMatchObject({ run: false });
    expect(evaluateStep({ ...base, branches: ["release/*"] }, pr)).toMatchObject({ run: false });
    expect(evaluateStep({ ...base, branches: ["main", "release/*"] }, pr)).toMatchObject({ run: true });
  });
});

describe("parseGlobList", () => {
  it("splits on newlines and commas and trims", () => {
    expect(parseGlobList(" src/** ,\n\n docs/*.md\n")).toEqual(["src/**", "docs/*.md"]);
  });
});
