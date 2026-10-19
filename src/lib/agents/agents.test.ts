import { describe, expect, it } from "vitest";

import { buildDiffIndex, commentableLines } from "./diff";
import { finalizeFixMySlop, relativePath } from "./fixmyslop";
import { buildReview } from "./review";

const PATCH = [
  "@@ -1,4 +1,5 @@",
  " import os",
  "-x = 1",
  "+x = 2",
  "+y = 3",
  " ",
  " def f():",
  "@@ -20,2 +21,3 @@ def g():",
  "     pass",
  "+    return 1",
  "\\ No newline at end of file",
].join("\n");

describe("commentableLines", () => {
  it("maps added and context lines to new-file line numbers", () => {
    expect([...commentableLines(PATCH)]).toEqual([1, 2, 3, 4, 5, 21, 22]);
  });

  it("handles missing patches (binary or huge files) and trailing newlines", () => {
    expect(commentableLines(undefined).size).toBe(0);
    expect([...commentableLines("@@ -0,0 +1,2 @@\n+a\n+b\n")]).toEqual([1, 2]);
  });
});

const REPORT = {
  repo_path: "/home/runner/work/app/app",
  scanned_files: 2,
  slop_score: 41.26,
  grade: "D",
  issues: [
    {
      file_path: "/home/runner/work/app/app/src/a.py",
      line_start: 3,
      line_end: 3,
      severity: "MEDIUM",
      category: "Code Slop",
      rule_id: "slop/stub-function",
      title: "Documented stub that does nothing",
      description: "Callers get None.",
      suggested_fix: "Implement it.",
    },
    {
      file_path: "/home/runner/work/app/app/src/a.py",
      line_start: 2,
      severity: "CRITICAL",
      category: "Security",
      rule_id: "sec/leaked-key",
      title: "Leaked API key",
      description: "Rotate it.",
      suggested_fix: "Use an env var.",
    },
    {
      file_path: "/home/runner/work/app/app/src/b.py",
      line_start: 90,
      severity: "LOW",
      category: "Code Slop",
      rule_id: "slop/noise-comment",
      title: "Noise comment",
      description: "",
      suggested_fix: "",
    },
  ],
};

describe("FixMySlop agent", () => {
  it("relativizes POSIX and Windows paths", () => {
    expect(relativePath("/w/app/src/a.py", "/w/app")).toBe("src/a.py");
    expect(relativePath("C:\\w\\app\\src\\a.py", "C:\\w\\app")).toBe("src/a.py");
    expect(relativePath("src/a.py", "")).toBe("src/a.py");
  });

  it("turns a report into a failing result with sorted inline comments", () => {
    const result = finalizeFixMySlop(REPORT, {});
    expect(result.conclusion).toBe("failure"); // a critical issue ≥ default failOn "high"
    expect(result.title).toBe("Grade D · slop score 41.3 · 3 issues");
    expect(result.comments.map((c) => `${c.severity}:${c.path}:${c.line}`)).toEqual([
      "critical:src/a.py:2",
      "medium:src/a.py:3",
      "low:src/b.py:90",
    ]);
    expect(result.comments[0].body).toContain("**Critical** · `sec/leaked-key` · Leaked API key");
    expect(result.comments[0].body).toContain("**Fix:** Use an env var.");
    expect(result.metrics).toMatchObject({ grade: "D", slopScore: 41.3, critical: 1, medium: 1, low: 1, issues: 3 });
    expect(result.summary).toContain("| 1 | 0 | 1 | 1 |");
  });

  it("respects failOn and minSeverity", () => {
    expect(finalizeFixMySlop(REPORT, { failOn: "none" }).conclusion).toBe("success");
    const filtered = finalizeFixMySlop(REPORT, { minSeverity: "medium", failOn: "critical" });
    expect(filtered.comments).toHaveLength(2);
    expect(filtered.conclusion).toBe("failure");
  });

  it("reports a clean scan", () => {
    const result = finalizeFixMySlop({ repo_path: "/x", scanned_files: 1, slop_score: 0, grade: "A", issues: [] }, {});
    expect(result).toMatchObject({ conclusion: "success", title: "Grade A · no slop found in 1 file", comments: [] });
  });

  it("rejects invalid config and garbage reports", () => {
    expect(() => finalizeFixMySlop(REPORT, { failOn: "sometimes" })).toThrow();
    expect(() => finalizeFixMySlop("not json", {})).toThrow();
  });
});

describe("buildReview", () => {
  const diff = buildDiffIndex([{ filename: "src/a.py", patch: "@@ -1,1 +1,3 @@\n a\n+b\n+c" }]);

  it("puts in-diff comments inline and the rest in the body", () => {
    const built = buildReview({
      agentName: "FixMySlop",
      result: finalizeFixMySlop(REPORT, {}),
      diff,
      headSha: "abc",
      maxComments: 30,
      runUrl: "https://agent-pr.test/dashboard/runs/1",
    });
    expect(built.inline).toBe(2);
    expect(built.outside).toBe(1);
    expect(built.review?.event).toBe("COMMENT");
    expect(built.review?.commit_id).toBe("abc");
    expect(built.review?.comments.map((c) => [c.path, c.line, c.side])).toEqual([
      ["src/a.py", 2, "RIGHT"],
      ["src/a.py", 3, "RIGHT"],
    ]);
    expect(built.review?.body).toContain("`src/b.py:90`");
    expect(built.review?.body).toContain("[run details](https://agent-pr.test/dashboard/runs/1)");
  });

  it("caps inline comments and skips empty results", () => {
    const capped = buildReview({
      agentName: "X",
      result: finalizeFixMySlop(REPORT, {}),
      diff,
      headSha: "abc",
      maxComments: 1,
      runUrl: "u",
    });
    expect(capped.inline).toBe(1);
    expect(capped.outside).toBe(2);
    const empty = buildReview({
      agentName: "X",
      result: { conclusion: "success", title: "ok", summary: "", comments: [] },
      diff,
      headSha: "abc",
      maxComments: 30,
      runUrl: "u",
    });
    expect(empty.review).toBeNull();
  });
});
