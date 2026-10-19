import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Migrations prefer a direct connection (Neon: DATABASE_URL_UNPOOLED) over the pooler.
    url: (process.env.DATABASE_URL_UNPOOLED ?? process.env.POSTGRES_URL ?? process.env.DATABASE_URL) as string,
  },
} satisfies Config;
