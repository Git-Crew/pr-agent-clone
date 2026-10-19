import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "pr/agents",
  version: packageJson.version,
  copyright: `\u00A9 ${currentYear}, pr/agents.`,
  meta: {
    title: "Agent PR · AI agents on every pull request",
    description:
      "Install a GitHub App, pick the agents that run on your pull requests, and get inline reviews and merge checks.",
  },
};
