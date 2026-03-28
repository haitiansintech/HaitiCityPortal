/**
 * NextAuth configuration — authentication for citizen and official users.
 *
 * This file wires up the NextAuth Credentials provider with the application's
 * database and exports the four core NextAuth utilities (handlers, signIn,
 * signOut, auth) used throughout the codebase.
 *
 * The base configuration (session strategy, callbacks that propagate role and
 * tenantId into the JWT and session objects) lives in `./auth.config.ts` and
 * is spread in here. Splitting the config allows `auth.config.ts` to be
 * imported by middleware (which runs in the Edge runtime and cannot import
 * Node.js-only modules like bcryptjs or drizzle-orm).
 */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { users, officials } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            /**
             * Validates submitted credentials against the database and returns
             * the user object that will be encoded into the JWT, or null if
             * authentication fails.
             *
             * The authorize callback handles both citizen logins (role: "user")
             * and municipal official logins (role: "official" | "casec" |
             * "asec" | "admin"). For official accounts, a second query fetches
             * the matching `officials` row so that the communal_section_id can
             * be included in the session — this lets admin pages scope data to
             * the official's geographic area without an additional lookup.
             *
             * Returns null (rather than throwing) on any failure — missing
             * credentials, unknown email, wrong password, or DB error — so that
             * NextAuth shows a generic "invalid credentials" message instead of
             * leaking specific error details to the client.
             */
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const { db } = await import("@/db");
                    // Query user from database
                    const [user] = await db
                        .select()
                        .from(users)
                        .where(eq(users.email, credentials.email as string))
                        .limit(1);

                    if (!user) {
                        return null;
                    }

                    // Verify password
                    const isValidPassword = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                    if (!isValidPassword) {
                        return null;
                    }

                    // For official roles, fetch the linked officials row to
                    // attach the communal_section_id to the session. This value
                    // is later used by admin API routes and Server Components to
                    // filter data to the official's assigned section.
                    let communalSectionId = undefined;
                    if (user.role === "official" || user.role === "casec" || user.role === "asec" || user.role === "admin") {
                        const { db } = await import("@/db");
                        const [official] = await db
                            .select()
                            .from(officials)
                            .where(eq(officials.user_id, user.id))
                            .limit(1);

                        if (official) {
                            communalSectionId = official.communal_section_id;
                        }
                    }

                    // Return user object (will be passed to jwt callback in auth.config.ts,
                    // which then propagates role and tenantId into the session token)
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name || undefined,
                        role: user.role || "user",
                        tenantId: user.tenant_id,
                        communalSectionId: communalSectionId || undefined,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
});
