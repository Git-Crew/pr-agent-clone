import type { AgentModule, ChangedSlice } from "@/lib/agents/modules/types";

import { checkoutPath, memoryPath, stateRoot } from "./paths";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export type PreparedSpace = {
  checkoutDir?: string;
  memoryDir(moduleId: string): string | undefined;
  close(): Promise<void>;
};

/** Open the one checkout this run needs, and the memory folders the modules asked to keep. */
export async function prepareSpace(input: {
  modules: AgentModule[];
  runId: string;
  installationId: number;
  repositoryId: number;
  isFork: boolean;
  root?: string;
}): Promise<PreparedSpace> {
  const root = input.root ?? stateRoot();
  const wantsCheckout = input.modules.some((mod) => mod.checkout === "shared");
  const checkoutDir = wantsCheckout ? checkoutPath(root, input.runId) : undefined;
  if (checkoutDir) await mkdir(checkoutDir, { recursive: true });

  const memory = new Map<string, string>();
  if (!input.isFork) {
    for (const mod of input.modules) {
      if (!mod.memory || memory.has(mod.id)) continue;
      const dir = memoryPath(root, mod.id, input.installationId, input.repositoryId);
      await mkdir(dir, { recursive: true });
      memory.set(mod.id, dir);
    }
  }

  return {
    checkoutDir,
    memoryDir: (moduleId) => memory.get(moduleId),
    close: async () => {
      if (checkoutDir) await rm(checkoutDir, { recursive: true, force: true });
    },
  };
}

/** Leave the diff on disk inside the shared checkout so a loop can open it. */
export async function recordDiff(dir: string, files: ChangedSlice[]): Promise<void> {
  const body = files.map((file) => `### ${file.path}\n${file.patch ?? "(no patch)"}`).join("\n\n");
  await writeFile(path.join(dir, "PULL.diff"), body);
}
