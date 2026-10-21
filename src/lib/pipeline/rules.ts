import picomatch from "picomatch";

export { parseGlobList } from "./schema";

// Decides whether one pipeline step runs on a PR, and which changed files it should look at.

export type StepRules = {
  enabled: boolean;
  includePaths: string[];
  excludePaths: string[];
  branches: string[];
  runOnDrafts: boolean;
  runOnForks: boolean;
};

export type PullRequestFacts = {
  baseRef: string;
  draft: boolean;
  isFork: boolean;
  /** Every changed file, including removed ones (a PR deleting src/** still "touches" src/**). */
  changedFiles: { path: string; removed: boolean }[];
};

export type RuleDecision = { run: true; files: string[] } | { run: false; reason: string };

const GLOB_OPTIONS = { dot: true } as const;

function matcher(patterns: string[]): (path: string) => boolean {
  const cleaned = patterns.map((p) => p.trim()).filter(Boolean);
  return cleaned.length === 0 ? () => false : picomatch(cleaned, GLOB_OPTIONS);
}

export function evaluateStep(rules: StepRules, pr: PullRequestFacts): RuleDecision {
  if (!rules.enabled) return { run: false, reason: "Step is disabled" };

  const branchGlobs = rules.branches.map((b) => b.trim()).filter(Boolean);
  if (branchGlobs.length > 0 && !matcher(branchGlobs)(pr.baseRef)) {
    return { run: false, reason: `Base branch ${pr.baseRef} does not match ${branchGlobs.join(", ")}` };
  }
  if (pr.draft && !rules.runOnDrafts) return { run: false, reason: "Draft PR (enable “Run on drafts” to include)" };
  if (pr.isFork && !rules.runOnForks) return { run: false, reason: "PR comes from a fork" };

  const includeGlobs = rules.includePaths.map((p) => p.trim()).filter(Boolean);
  const included = includeGlobs.length === 0 ? () => true : matcher(includeGlobs);
  const excluded = matcher(rules.excludePaths);
  const matched = pr.changedFiles.filter((file) => included(file.path) && !excluded(file.path));

  if (matched.length === 0) {
    const scope = includeGlobs.length > 0 ? includeGlobs.join(", ") : "the path filters";
    return { run: false, reason: `No changed files match ${scope}` };
  }
  return { run: true, files: matched.filter((file) => !file.removed).map((file) => file.path) };
}

export type TriggerRules = { trigger: "every_push" | "opened" | "label"; triggerLabel: string | null };
export type TriggerFacts = { action: string; labels: string[]; addedLabel: string | null };

const PUSH_ACTIONS = new Set(["opened", "synchronize", "reopened", "ready_for_review"]);
const OPEN_ACTIONS = new Set(["opened", "reopened", "ready_for_review"]);

/**
 * Whether a pull request event should start this step at all ("When should it run?"). Steps that are not
 * triggered are left out of the run instead of showing up as skipped.
 */
export function isTriggered(rules: TriggerRules, facts: TriggerFacts): boolean {
  switch (rules.trigger) {
    case "opened":
      return OPEN_ACTIONS.has(facts.action);
    case "label": {
      const label = rules.triggerLabel?.trim().toLowerCase();
      if (!label) return false;
      if (facts.action === "labeled") return facts.addedLabel?.toLowerCase() === label;
      return PUSH_ACTIONS.has(facts.action) && facts.labels.some((l) => l.toLowerCase() === label);
    }
    default:
      return PUSH_ACTIONS.has(facts.action);
  }
}
