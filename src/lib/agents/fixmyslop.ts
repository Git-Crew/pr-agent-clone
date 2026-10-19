import { z } from "zod";

import { type AgentComment, type AgentResult, SEVERITIES, type Severity, severityRank } from "./contract";

// FixMySlop agent: the runner executes `fixmyslop scan <changed files> -f json` and posts the JSON report here.
// https://github.com/MrSpideyNihal/FixMySlop

/** The FixMySlop release the runner installs. Bump deliberately: the JSON report shape is parsed below. */
export const FIXMYSLOP_VERSION = "0.6.7";

export const fixMySlopConfigSchema = z.object({
  failOn: z.enum([...SEVERITIES, "none"]).default("high"),
  minSeverity: z.enum(SEVERITIES).default("low"),
  maxComments: z.number().int().min(0).max(100).default(30),
  only: z
    .array(z.string().regex(/^[a-z0-9/_-]+$/i))
    .max(20)
    .default([]),
  staticAnalysis: z.boolean().default(false),
});

export type FixMySlopConfig = z.infer<typeof fixMySlopConfigSchema>;

const issueSchema = z.object({
  file_path: z.string(),
  line_start: z.number().int().nonnegative(),
  severity: z.string(),
  category: z.string().default(""),
  rule_id: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  suggested_fix: z.string().default(""),
});

export const fixMySlopReportSchema = z.object({
  repo_path: z.string().default(""),
  scanned_files: z.number().int().nonnegative().default(0),
  slop_score: z.number().default(0),
  grade: z.string().default("?"),
  issues: z.array(issueSchema).default([]),
});

export type FixMySlopReport = z.infer<typeof fixMySlopReportSchema>;
type Issue = z.infer<typeof issueSchema>;

function toSeverity(value: string): Severity {
  const lower = value.toLowerCase();
  return (SEVERITIES as readonly string[]).includes(lower) ? (lower as Severity) : "low";
}

/** FixMySlop reports absolute paths; turn them into repo-relative POSIX paths that match the PR's file list. */
export function relativePath(filePath: string, repoPath: string): string {
  const file = filePath.replace(/\\/g, "/");
  const root = repoPath.replace(/\\/g, "/").replace(/\/+$/, "");
  const relative = root && file.startsWith(`${root}/`) ? file.slice(root.length + 1) : file;
  return relative.replace(/^\.\//, "");
}

const SEVERITY_LABEL: Record<Severity, string> = { critical: "Critical", high: "High", medium: "Medium", low: "Low" };

function commentBody(issue: Issue, severity: Severity): string {
  const parts = [`**${SEVERITY_LABEL[severity]}** · \`${issue.rule_id || issue.category}\` · ${issue.title}`];
  if (issue.description) parts.push(issue.description);
  if (issue.suggested_fix) parts.push(`**Fix:** ${issue.suggested_fix}`);
  return parts.join("\n\n");
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

export function finalizeFixMySlop(rawReport: unknown, rawConfig: unknown): AgentResult {
  const config = fixMySlopConfigSchema.parse(rawConfig ?? {});
  const report = fixMySlopReportSchema.parse(rawReport);
  const minRank = severityRank[config.minSeverity];

  const issues = report.issues
    .map((issue) => ({
      issue,
      severity: toSeverity(issue.severity),
      path: relativePath(issue.file_path, report.repo_path),
    }))
    .filter(({ severity }) => severityRank[severity] >= minRank)
    .sort(
      (a, b) =>
        severityRank[b.severity] - severityRank[a.severity] ||
        a.path.localeCompare(b.path) ||
        a.issue.line_start - b.issue.line_start,
    );

  const counts: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const { severity } of issues) counts[severity]++;

  const failRank = config.failOn === "none" ? Number.POSITIVE_INFINITY : severityRank[config.failOn];
  const failed = issues.some(({ severity }) => severityRank[severity] >= failRank);

  const comments: AgentComment[] = issues
    .filter(({ issue }) => issue.line_start > 0)
    .map(({ issue, severity, path }) => ({
      path,
      line: issue.line_start,
      severity,
      body: commentBody(issue, severity),
    }));

  const score = Math.round(report.slop_score * 10) / 10;
  const title =
    issues.length === 0
      ? `Grade ${report.grade} · no slop found in ${report.scanned_files} file${report.scanned_files === 1 ? "" : "s"}`
      : `Grade ${report.grade} · slop score ${score} · ${issues.length} issue${issues.length === 1 ? "" : "s"}`;

  const lines = [
    `**Grade ${report.grade}** · slop score **${score}** (lower is better) · ${report.scanned_files} changed file${report.scanned_files === 1 ? "" : "s"} scanned`,
    "",
    `| Critical | High | Medium | Low |`,
    `| --- | --- | --- | --- |`,
    `| ${counts.critical} | ${counts.high} | ${counts.medium} | ${counts.low} |`,
  ];
  if (issues.length > 0) {
    lines.push("", "| Severity | Location | Rule | Issue |", "| --- | --- | --- | --- |");
    for (const { issue, severity, path } of issues.slice(0, 50)) {
      lines.push(
        `| ${SEVERITY_LABEL[severity]} | \`${escapeCell(path)}:${issue.line_start}\` | \`${escapeCell(issue.rule_id)}\` | ${escapeCell(issue.title)} |`,
      );
    }
    if (issues.length > 50) lines.push("", `…and ${issues.length - 50} more.`);
  }
  if (config.failOn !== "none") {
    lines.push("", `Fails on: ${config.failOn} and above.`);
  }

  return {
    conclusion: failed ? "failure" : "success",
    title,
    summary: lines.join("\n"),
    comments,
    metrics: {
      grade: report.grade,
      slopScore: score,
      scannedFiles: report.scanned_files,
      issues: issues.length,
      ...counts,
    },
  };
}
