import { BRAND } from "@/config/app-config";

/** The check run each agent reports as, e.g. "GitCrew / FixMySlop". Mark it required to block merges. */
export function checkRunName(agentName: string) {
  return `${BRAND} / ${agentName}`;
}
