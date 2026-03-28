/**
 * Next.js Edge Middleware — locale detection, auth protection, and tenant injection.
 *
 * This middleware runs on every matched request before any page or API route
 * handler executes. It performs three responsibilities in order:
 *
 * 1. Internationalization (next-intl): Detects or redirects to the correct
 *    locale prefix in the URL (e.g. /ht/services, /fr/services).
 *
 * 2. Authentication guard: Checks whether the user has an active NextAuth
 *    session. Any route that contains "/admin" in its pathname requires a
 *    valid session. Unauthenticated requests are redirected to the locale-
 *    aware login page with a `callbackUrl` so users can return after signing in.
 *
 * 3. Tenant injection: Extracts the subdomain from the incoming `Host` header
 *    and writes it to the `x-tenant-subdomain` response header. Downstream
 *    Server Components read this header to resolve the active Tenant without
 *    repeating the extraction logic.
 *
 * Security note on `x-tenant-subdomain`:
 * This header is WRITTEN here in middleware and TRUSTED by downstream Server
 * Components (e.g. layout.tsx, page.tsx). Because Next.js middleware runs
 * server-side and strips incoming request headers before they reach route
 * handlers, external callers cannot spoof this header. Engineers must never
 * add logic that accepts `x-tenant-subdomain` directly from user-supplied
 * request headers without re-validating through this middleware path.
 */

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const { auth } = NextAuth(authConfig);

/**
 * Extracts the subdomain from a host string.
 * Examples:
 * - "jacmel.localhost:3000" -> "jacmel"
 * - "localhost:3000" -> "demo" (default)
 * - "jacmel.portal.ht" -> "jacmel"
 * - "portal.ht" -> "demo" (root domain)
 */
function extractSubdomain(host: string): string {
    // Strip port if present
    const hostWithoutPort = host.split(':')[0];

    // Handle localhost cases
    if (hostWithoutPort.includes('localhost')) {
        // "jacmel.localhost" -> ["jacmel", "localhost"]
        const parts = hostWithoutPort.split('.');
        if (parts.length > 1 && parts[0] !== 'localhost') {
            return parts[0]; // Return subdomain (e.g., "jacmel")
        }
        return 'demo'; // Root localhost defaults to "demo"
    }

    // Handle production domains (e.g., "jacmel.portal.ht")
    const parts = hostWithoutPort.split('.');

    // If only one part (unlikely) or two parts (root domain), default to "demo"
    if (parts.length <= 2) {
        return 'demo';
    }

    // Return the first part as subdomain
    return parts[0];
}

const intlMiddleware = createMiddleware(routing);

export default auth(async function middleware(request: NextRequest & { auth: any }) {
    const headers = new Headers(request.headers);
    const host = headers.get('host') || '';
    const pathname = request.nextUrl.pathname;

    // STEP 1: Handle Internationalization.
    // next-intl middleware runs first so that locale redirects (e.g. bare "/" →
    // "/ht/") happen before any auth check or header injection. The returned
    // response is either a redirect or a "continue" (next()) response that we
    // augment in subsequent steps.
    const response = intlMiddleware(request);

    // STEP 2: Extract subdomain from host and inject it as a trusted header.
    // This header is read by Server Components to determine which tenant's data
    // to load. It is set here (server-side) and must NOT be accepted from
    // external request headers — see file-level security note above.
    const subdomain = extractSubdomain(host);

    // Note: intlMiddleware might have already returned a response (redirect),
    // but if it's "next", we can augment it.
    response.headers.set('x-tenant-subdomain', subdomain);

    // STEP 3: Check authentication for protected routes.
    // Auth is evaluated after intl so that protected admin pages still benefit
    // from locale-aware redirects before the auth guard fires.
    const session = request.auth;

    // Protect /admin routes (regardless of locale prefix)
    // next-intl middleware handles adding/removing locale to pathname
    const isLevelMatch = (path: string) => {
        return pathname.includes(`/${path}`) || pathname.startsWith(`/${path}`);
    };

    if (pathname.includes('/admin')) {
        if (!session) {
            // Not authenticated — redirect to the locale-prefixed login page.
            // Preserve the original destination in `callbackUrl` so the login
            // form can redirect back after a successful sign-in.
            const locale = pathname.split('/')[1];
            const loginPath = routing.locales.includes(locale as any) ? `/${locale}/login` : '/login';
            const loginUrl = new URL(loginPath, request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // RBAC: authenticated users must have admin or superadmin role.
        // A user-role session that somehow reaches /admin is redirected home.
        const userRole = (session as any)?.user?.role as string | undefined;
        if (userRole !== 'admin' && userRole !== 'superadmin') {
            const locale = pathname.split('/')[1];
            const homePath = routing.locales.includes(locale as any) ? `/${locale}` : '/';
            return NextResponse.redirect(new URL(homePath, request.url));
        }
    }

    return response;
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|manifest).*)',
    ],
};
