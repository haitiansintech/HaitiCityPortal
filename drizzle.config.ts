/**
 * Drizzle Kit configuration.
 *
 * This file configures Drizzle Kit, the companion CLI tool used to:
 *  - Generate SQL migration files (`drizzle-kit generate`)
 *  - Push schema changes directly to the database (`drizzle-kit push`)
 *  - Open the visual Drizzle Studio (`drizzle-kit studio`)
 *
 * It is NOT imported at Next.js runtime — it is only executed by the
 * `drizzle-kit` CLI binary. This means Next.js's automatic environment
 * variable loading is NOT available here, so environment variables must be
 * loaded manually via dotenv before any reference to process.env.
 */

import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Manually load .env (and .env.local if present) into process.env.
// This is necessary because Drizzle Kit runs outside the Next.js runtime,
// which normally handles env loading automatically. Without this call,
// process.env.DATABASE_URL would be undefined and the CLI commands would fail.
dotenv.config();

export default defineConfig({
    // Path to the Drizzle schema file that defines all tables and relations.
    // Drizzle Kit reads this to understand the current intended schema and
    // generate the appropriate SQL to bring the database in sync.
    schema: "./src/db/schema.ts",

    // Directory where generated SQL migration files are written.
    out: "./drizzle",

    // Target database dialect. "postgresql" tells Drizzle Kit to generate
    // PostgreSQL-compatible SQL. This matches the Neon serverless Postgres
    // instance used in all environments.
    dialect: "postgresql",

    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
