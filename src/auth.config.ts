import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [], // Providers are added in auth.ts for full server-side implementation
    callbacks: {
        async jwt({ token, user }) {
            // Persist user data to token on sign in
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.tenantId = (user as any).tenantId;
                token.communalSectionId = (user as any).communalSectionId;
            }
            return token;
        },
        async session({ session, token }) {
            // Add user data to session
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.tenantId = token.tenantId as string;
                (session.user as any).communalSectionId = token.communalSectionId;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET || "development-secret-only-for-local-testing",
} satisfies NextAuthConfig;
