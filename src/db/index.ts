import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Please check your environment variables.');
}

// Singleton pattern for the database connection
const globalForDb = global as unknown as {
    db: ReturnType<typeof drizzle<typeof schema>> | undefined
};

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
export const db = globalForDb.db ?? drizzle(client, { schema });

if (process.env.NODE_ENV !== 'production') {
    globalForDb.db = db;
}
