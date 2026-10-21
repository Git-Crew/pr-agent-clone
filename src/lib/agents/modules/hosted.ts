import type { AgentModule } from "./types";

/** FixMySlop runs in the repository's Actions job. It does not use the shared checkout. */
export const fixmyslop: AgentModule = {
  id: "fixmyslop",
  checkout: "actions",
  memory: false,
  terminal: true,
};

/** An agent connected by URL. It brings its own host. */
export const httpAgent: AgentModule = {
  id: "http",
  checkout: "none",
  memory: false,
  terminal: false,
};
