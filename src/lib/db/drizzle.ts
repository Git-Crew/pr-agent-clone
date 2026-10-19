import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

// Lazy-initialize so the module can be imported at build time without a live DB.
let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getClient() {
  if (!_client) {
    // Neon's Vercel integration sets DATABASE_URL; POSTGRES_URL works too.
    const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
    if (!url) {
      throw new Error("POSTGRES_URL (or DATABASE_URL) environment variable is not set");
    }
    // No prepared statements, so pooled serverless connections (Neon, Supabase, PgBouncer) work.
    _client = postgres(url, { prepare: false });
  }
  return _client;
}

function getDb() {
  if (!_db) {
    _db = drizzle(getClient(), { schema });
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop, receiver) {
    const realDb = getDb();
    const value = Reflect.get(realDb, prop, receiver);
    if (typeof value === "function") {
      return value.bind(realDb);
    }
    return value;
  },
});

export { getClient as client };
