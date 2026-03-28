/**
 * Production seed script — src/db/seed.production.ts
 *
 * PURPOSE
 * -------
 * Seeds the minimum data required to boot a real municipality deployment:
 * one tenant row and one admin user. Unlike seed.ts (dev/demo only), this
 * script:
 *   - Reads all sensitive values from environment variables — NEVER from
 *     hardcoded strings.
 *   - Requires an explicit CONFIRM_PRODUCTION_SEED=yes env var to execute,
 *     preventing accidental runs against live databases.
 *   - Is fully idempotent: safe to run multiple times. Existing rows are
 *     updated in-place; nothing is deleted.
 *   - Exits with a non-zero code on any validation error so CI/CD pipelines
 *     can catch misconfiguration before it reaches the database.
 *
 * USAGE
 * -----
 *   # 1. Set required variables in your shell or CI secrets:
 *   export DATABASE_URL="postgresql://..."
 *   export CONFIRM_PRODUCTION_SEED="yes"
 *   export SEED_TENANT_NAME="Ville de Jacmel"
 *   export SEED_TENANT_SUBDOMAIN="jacmel"
 *   export SEED_ADMIN_EMAIL="admin@jacmel.ht"
 *   export SEED_ADMIN_PASSWORD="<strong-password>"   # min 16 chars
 *
 *   # 2. Run:
 *   npm run db:seed:prod
 *
 * ENVIRONMENT VARIABLES
 * ---------------------
 * DATABASE_URL              ← REQUIRED — Neon / PostgreSQL connection string
 * CONFIRM_PRODUCTION_SEED   ← REQUIRED — must equal exactly "yes"
 * SEED_TENANT_NAME          ← REQUIRED — human-readable city name
 * SEED_TENANT_SUBDOMAIN     ← REQUIRED — URL slug (e.g. "jacmel")
 * SEED_ADMIN_EMAIL          ← REQUIRED — first admin user email
 * SEED_ADMIN_PASSWORD       ← REQUIRED — first admin password (min 16 chars)
 * SEED_MAYOR_NAME           ← OPTIONAL — mayor display name
 * SEED_MAYOR_BIO            ← OPTIONAL — mayor bio text
 * SEED_WHATSAPP_NUMBER      ← OPTIONAL — e.g. "+50937012345"
 * SEED_MONCASH_MERCHANT_ID  ← OPTIONAL — MonCash merchant code
 * SEED_PRIMARY_COLOR        ← OPTIONAL — hex brand colour (default: #0369a1)
 */

import "dotenv/config";
import { db } from "./index";
import { tenants, users } from "./schema";
import { sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

// ─── Guard: explicit confirmation required ───────────────────────────────────
if (process.env.CONFIRM_PRODUCTION_SEED !== "yes") {
  console.error(
    "\n❌ Aborted.\n" +
    "   This script modifies a production database.\n" +
    "   To proceed, set:  CONFIRM_PRODUCTION_SEED=yes\n"
  );
  process.exit(1);
}

// ─── Required variable validation ────────────────────────────────────────────
const REQUIRED = [
  "DATABASE_URL",
  "SEED_TENANT_NAME",
  "SEED_TENANT_SUBDOMAIN",
  "SEED_ADMIN_EMAIL",
  "SEED_ADMIN_PASSWORD",
] as const;

const missing = REQUIRED.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(
    "\n❌ Missing required environment variables:\n" +
    missing.map((k) => `   • ${k}`).join("\n") +
    "\n\nSet them in your shell or .env.local and try again.\n"
  );
  process.exit(1);
}

// ─── Password strength guard ──────────────────────────────────────────────────
const rawPassword = process.env.SEED_ADMIN_PASSWORD!;
if (rawPassword.length < 16) {
  console.error(
    "\n❌ SEED_ADMIN_PASSWORD must be at least 16 characters.\n" +
    "   Generate one with:  openssl rand -base64 24\n"
  );
  process.exit(1);
}

// ─── Seed ─────────────────────────────────────────────────────────────────────
async function seedProduction() {
  const tenantName      = process.env.SEED_TENANT_NAME!;
  const subdomain       = process.env.SEED_TENANT_SUBDOMAIN!;
  const adminEmail      = process.env.SEED_ADMIN_EMAIL!;
  const primaryColor    = process.env.SEED_PRIMARY_COLOR    ?? "#0369a1";
  const mayorName       = process.env.SEED_MAYOR_NAME       ?? null;
  const mayorBio        = process.env.SEED_MAYOR_BIO        ?? null;
  const whatsapp        = process.env.SEED_WHATSAPP_NUMBER  ?? null;
  const moncash         = process.env.SEED_MONCASH_MERCHANT_ID ?? null;

  console.log(`\n🌱  Seeding production database for: ${tenantName} (${subdomain})\n`);

  // 1. Upsert tenant ──────────────────────────────────────────────────────────
  console.log("  → Upserting tenant record…");
  const [tenant] = await db
    .insert(tenants)
    .values({
      name: tenantName,
      subdomain,
      primary_color: primaryColor,
      mayor_name: mayorName,
      mayor_bio: mayorBio,
      whatsapp_number: whatsapp,
      moncash_merchant_id: moncash,
    })
    .onConflictDoUpdate({
      target: tenants.subdomain,
      set: {
        name: sql`EXCLUDED.name`,
        primary_color: sql`EXCLUDED.primary_color`,
        mayor_name: sql`EXCLUDED.mayor_name`,
        mayor_bio: sql`EXCLUDED.mayor_bio`,
        whatsapp_number: sql`EXCLUDED.whatsapp_number`,
        moncash_merchant_id: sql`EXCLUDED.moncash_merchant_id`,
      },
    })
    .returning({ id: tenants.id, name: tenants.name });

  console.log(`     ✓ Tenant: ${tenant.name} (id: ${tenant.id})`);

  // 2. Upsert admin user ──────────────────────────────────────────────────────
  console.log("  → Creating admin user…");
  const hashedPassword = await bcrypt.hash(rawPassword, 12); // cost=12 for production

  await db
    .insert(users)
    .values({
      tenant_id: tenant.id,
      name: "City Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    })
    .onConflictDoNothing(); // email conflict = user already exists, skip silently

  console.log(`     ✓ Admin user: ${adminEmail}`);

  console.log("\n✅  Production seed complete.\n");
  console.log("   Next steps:");
  console.log("   1. Log in at /login with the admin credentials above.");
  console.log("   2. Add officials, communal sections, and services via the admin dashboard.");
  console.log("   3. Remove CONFIRM_PRODUCTION_SEED from your environment.\n");

  process.exit(0);
}

seedProduction().catch((err) => {
  console.error("\n❌  Production seed failed:", err);
  process.exit(1);
});
