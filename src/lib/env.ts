/**
 * Centralised environment variable validation — src/lib/env.ts
 *
 * Validates all required environment variables at module load time using Zod.
 * Import this module in any file that needs env vars to get type-safe access
 * AND an early, descriptive error if a variable is missing.
 *
 * Usage:
 *   import { env } from "@/lib/env";
 *   const db = postgres(env.DATABASE_URL);
 *
 * The validation runs once when the module is first imported (server-side only).
 * In production a missing variable will crash the process at startup with a
 * clear message rather than surfacing a cryptic runtime error later.
 */

import { z } from "zod";

const envSchema = z.object({
  // ── Database ──────────────────────────────────────────────────────────────
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .describe("PostgreSQL connection string"),

  // ── Auth (next-auth v5) ───────────────────────────────────────────────────
  AUTH_SECRET: z
    .string()
    .min(32, "AUTH_SECRET must be at least 32 characters — generate with: openssl rand -base64 32")
    .describe("Secret used to sign session tokens"),

  // ── Optional with safe defaults ───────────────────────────────────────────
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  NEXTAUTH_URL: z
    .string()
    .url()
    .optional()
    .describe("Canonical public URL (required in production)"),

  ENABLE_LOCAL_MODE: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true")
    .describe("Return sample data without a live DB connection"),

  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url()
    .optional()
    .default("http://localhost:3000")
    .describe("Base URL for absolute links"),
});

// Run validation — throws with a helpful message on failure.
const _parsed = envSchema.safeParse(process.env);

if (!_parsed.success) {
  const issues = _parsed.error.issues
    .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
    .join("\n");

  throw new Error(
    `\n❌  Environment variable validation failed:\n${issues}\n\n` +
    `  Copy .env.local.example to .env.local and fill in the missing values.\n`
  );
}

export const env = _parsed.data;
