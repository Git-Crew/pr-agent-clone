import path from "node:path";

export function stateRoot(): string {
  return process.env.GITCREW_LOOP_STATE || path.join(process.cwd(), ".gitcrew", "loops");
}

/** One directory for every module in this run that asked for the shared checkout. */
export function checkoutPath(root: string, runId: string): string {
  return path.join(root, "checkouts", runId);
}

/** Kept across runs of one repository. Keyed by the loop, so two cards on the same loop share it. */
export function memoryPath(root: string, moduleId: string, installationId: number, repositoryId: number): string {
  return path.join(root, "memory", moduleId, String(installationId), String(repositoryId));
}
