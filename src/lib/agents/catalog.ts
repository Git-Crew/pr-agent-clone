import type { AgentCard, SettingField } from "./card";

// Ready-made agents shown in the catalog. "available" ones can be added to a repo today; "coming_soon" ones are
// listed so people can see what is next. Agents people connect themselves (HTTP) get their cards from the database.

const SEVERITY_OPTIONS = [
  { value: "critical", label: "Critical only" },
  { value: "high", label: "High and above" },
  { value: "medium", label: "Medium and above" },
  { value: "low", label: "Everything" },
];

const MODEL_SETTINGS: SettingField[] = [
  {
    key: "provider",
    label: "Model provider",
    help: "Claude, OpenAI, or Grok. The harness and the prompts stay the same.",
    type: "select",
    options: [
      { value: "anthropic", label: "Claude" },
      { value: "openai", label: "OpenAI" },
      { value: "grok", label: "Grok" },
    ],
    default: "anthropic",
  },
  {
    key: "model",
    label: "Model",
    help: "Any model id that provider accepts. Empty uses the provider default.",
    type: "text",
    default: "",
  },
  {
    key: "instructions",
    label: "Instructions",
    help: "Replaces this agent's instructions. Empty keeps the agent's own.",
    type: "textarea",
    default: "",
  },
  {
    key: "system",
    label: "System prompt",
    help: "Replaces the system prompt. Empty keeps the review JSON contract.",
    type: "textarea",
    default: "",
    advanced: true,
  },
];

const ACTION_SETTINGS: SettingField[] = [
  {
    key: "allowLabel",
    label: "Let this step add labels",
    help: "Off until you turn it on. The agent asks. GitCrew applies the labels. A fork cannot turn this on.",
    type: "boolean",
    default: false,
    advanced: true,
  },
  {
    key: "allowDraftPr",
    label: "Let this step open a draft pull request",
    help: "Off until you turn it on. GitCrew opens the draft from files the sandbox changed. A fork cannot turn this on.",
    type: "boolean",
    default: false,
    advanced: true,
  },
  {
    key: "allowRebase",
    label: "Let this step update the branch",
    help: "Off until you turn it on. GitCrew asks GitHub to update the pull request branch. A fork cannot turn this on.",
    type: "boolean",
    default: false,
    advanced: true,
  },
  {
    key: "allowRerunCi",
    label: "Let this step re-run CI",
    help: "Off until you turn it on. GitCrew re-runs workflows for this commit. A fork cannot turn this on.",
    type: "boolean",
    default: false,
    advanced: true,
  },
];

const MODEL_SECRETS = [
  { name: "ANTHROPIC_API_KEY", label: "Claude API key" },
  { name: "OPENAI_API_KEY", label: "OpenAI API key" },
  { name: "XAI_API_KEY", label: "Grok API key" },
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
    status: "available",
    runtime: "prompt",
    settings: MODEL_SETTINGS,
    secrets: MODEL_SECRETS,
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
    settings: MODEL_SETTINGS,
    secrets: MODEL_SECRETS,
  },
  {
    slug: "hermes",
    name: "Hermes",
    tagline: "Nous Research's agent, on your pull requests",
    description:
      "Runs the Hermes agent by Nous Research in its own sandbox and comments on the pull request. Memory for that repository stays on the worker.",
    by: "Nous Research",
    docsUrl: "https://github.com/NousResearch/hermes-agent",
    status: "available",
    runtime: "command",
    settings: [...MODEL_SETTINGS, ...ACTION_SETTINGS],
    secrets: MODEL_SECRETS,
  },
  {
    slug: "openclaw",
    name: "OpenClaw",
    tagline: "The open-source assistant, as a reviewer",
    description:
      "Runs OpenClaw in its own sandbox and comments on the pull request. Its state for that repository stays on the worker.",
    by: "OpenClaw",
    docsUrl: "https://github.com/openclaw/openclaw",
    status: "available",
    runtime: "command",
    settings: [...MODEL_SETTINGS, ...ACTION_SETTINGS],
    secrets: MODEL_SECRETS,
  },
];

export function getCatalogCard(slug: string): AgentCard | undefined {
  return CATALOG.find((card) => card.slug === slug);
}
