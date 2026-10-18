import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "pr/agents",
  version: packageJson.version,
  copyright: `\u00A9 ${currentYear}, pr/agents.`,
  meta: {
    title: "PR Agents - Personalized Agents for Code Reviews",
    description:
      "Deploy personalized AI agents for code reviews. Powered by Hermes, OpenClaw, and AntiSlop. Ship cleaner code, faster.",
  },
};
