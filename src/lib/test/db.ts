import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";

import * as schema from "@/lib/db/schema";
import type { Db } from "@/lib/db/types";

import { fileURLToPath } from "node:url";

const MIGRATIONS = fileURLToPath(new URL("../db/migrations", import.meta.url));

/** A fresh in-memory Postgres with every migration applied. */
export async function createTestDb(): Promise<Db> {
  const db = drizzle(new PGlite(), { schema });
  await migrate(db, { migrationsFolder: MIGRATIONS });
  return db as unknown as Db;
}
