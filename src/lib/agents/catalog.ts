import type { AgentCard, SettingField } from "./card";

// Ready-made agents shown in the catalog. "available" ones can be added to a repo today; "coming_soon" ones are
// listed so people can see what is next. Agents people connect themselves (HTTP) get their cards from the database.

const SEVERITY_OPTIONS = [
  { value: "critical", label: "Critical only" },
  { value: "high", label: "High and above" },
  { value: "medium", label: "Medium and above" },
  { value: "low", label: "Everything" },
];

const FIXMYSLOP_SETTINGS: SettingField[] = [
  {
    key: "failOn",
    label: "Count as failed from",
    help: "The agent fails when it finds an issue this serious. Pick “Never” to only comment.",
    type: "select",
    options: [...SEVERITY_OPTIONS.slice(0, 3), { value: "low", label: "Any issue" }, { value: "none", label: "Never" }],
    default: "high",
  },
  {
    key: "minSeverity",
    label: "Report issues from",
    help: "Smaller issues than this are ignored.",
    type: "select",
    options: SEVERITY_OPTIONS,
    default: "low",
  },
  {
    key: "staticAnalysis",
    label: "Also run ruff, bandit and semgrep",
    help: "Deeper checks for Python and security. Slower.",
    type: "boolean",
    default: false,
    advanced: true,
  },
  {
    key: "only",
    label: "Only these rule groups",
    help: "For example ui, slop, sec. Empty means all rules.",
    type: "list",
    default: [],
    advanced: true,
  },
];

export const CATALOG: AgentCard[] = [
  {
    slug: "fixmyslop",
    name: "FixMySlop",
    tagline: "Catches AI slop, leaked keys and risky shortcuts",
    description:
      "Scans the changed files for AI slop, security holes and hallucinated packages, then reviews the pull request with inline comments, a slop score and a grade.",
    by: "GitCrew",
    docsUrl: "https://github.com/MrSpideyNihal/FixMySlop",
    status: "available",
    runtime: "runner",
    settings: FIXMYSLOP_SETTINGS,
    secrets: [],
  },
  {
    slug: "plain-words",
    name: "Plain-words reviewer",
    tagline: "Describe what to check in your own words",
    description:
      "Write instructions like “check that every API route validates its input”. An LLM of your choice reads the diff and comments where it matters.",
    by: "GitCrew",
    status: "coming_soon",
    runtime: "prompt",
    settings: [],
    secrets: [{ name: "ANTHROPIC_API_KEY", label: "LLM provider key" }],
  },
  {
    slug: "ponytail",
    name: "Ponytail",
    tagline: "Pushes the smallest fix, never a rewrite",
    description:
      "Turns findings into a minimal patch on the pull request branch, then re-checks that it helped. Never runs on pull requests from forks.",
    by: "GitCrew",
    status: "coming_soon",
    runtime: "command",
    settings: [],
    secrets: [],
  },
  {
    slug: "hermes",
    name: "Hermes",
    tagline: "Nous Research's agent, on your pull requests",
    description:
      "Run the Hermes agent by Nous Research as a reviewer. We are checking how it runs best before adding it.",
    by: "Nous Research",
    docsUrl: "https://github.com/NousResearch/hermes-agent",
    status: "coming_soon",
    runtime: "command",
    settings: [],
    secrets: [],
  },
  {
    slug: "openclaw",
    name: "OpenClaw",
    tagline: "The open-source assistant, as a reviewer",
    description: "Run OpenClaw on your pull requests. We are checking how it runs best before adding it.",
    by: "OpenClaw",
    docsUrl: "https://github.com/openclaw/openclaw",
    status: "coming_soon",
    runtime: "command",
    settings: [],
    secrets: [],
  },
];

export function getCatalogCard(slug: string): AgentCard | undefined {
  return CATALOG.find((card) => card.slug === slug);
}
