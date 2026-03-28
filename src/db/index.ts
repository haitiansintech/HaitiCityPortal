/**
 * Singleton Drizzle ORM database client.
 *
 * A single `db` instance is created for the lifetime of the Node.js process
 * and exported from this module. All database access in the application should
 * import from here rather than constructing new clients.
 *
 * Hot-reload problem in development:
 * Next.js development mode rebuilds modules on every file change, which causes
 * this file to be re-evaluated and would ordinarily create a new postgres
 * connection pool on each reload — quickly exhausting the connection limit on
 * Neon's free tier. To prevent this, the client is stored on `globalThis` so
 * it survives module re-evaluation across hot reloads.
 *
 * The `globalThis` cache is intentionally disabled in production (where
 * NODE_ENV === "production") because production deployments run as a single,
 * long-lived module instance and do not hot-reload — storing the instance on
 * globalThis there is unnecessary and could cause subtle issues in edge
 * runtimes that share globalThis across requests.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Please check your environment variables.');
}

// Singleton pattern for the database connection.
// `globalThis` is used (rather than a module-scope variable) so the reference
// persists across Next.js hot-reload cycles in development without leaking
// additional connections.
const globalForDb = global as unknown as {
    db: ReturnType<typeof drizzle<typeof schema>> | undefined
};

// `prepare: false` is required when connecting to Neon in "Transaction" pooling
// mode (the default for serverless deployments). Neon's transaction pool does
// not support PostgreSQL's extended query protocol (prepared statements), so
// attempting to use them causes a connection error. Disabling prefetch here
// ensures the postgres.js driver uses the simple query protocol instead.
const client = postgres(connectionString, { prepare: false, connect_timeout: 10, idle_timeout: 20, max_lifetime: 1800 });
export const db = globalForDb.db ?? drizzle(client, { schema });

// Only cache the client on globalThis in non-production environments.
// In development, this prevents a new connection pool from being created on
// every hot-reload cycle. In production this branch is skipped because the
// module is loaded once and never re-evaluated.
if (process.env.NODE_ENV !== 'production') {
    globalForDb.db = db;
}
