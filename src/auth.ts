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

                    // Fetch official data if applicable
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

                    // Return user object (will be passed to jwt callback)
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
