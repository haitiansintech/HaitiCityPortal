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

    // STEP 1: Handle Internationalization
    // We run the intl middleware first to handle redirects/locale detection
    const response = intlMiddleware(request);

    // STEP 2: Extract subdomain from host (EXISTING LOGIC)
    const subdomain = extractSubdomain(host);

    // Set header for downstream Server Components
    // Note: intlMiddleware might have already returned a response (redirect),
    // but if it's "next", we can augment it.
    response.headers.set('x-tenant-subdomain', subdomain);

    // STEP 3: Check authentication for protected routes (NEW LOGIC)
    const session = request.auth;

    // Protect /admin routes (regardless of locale prefix)
    // next-intl middleware handles adding/removing locale to pathname
    const isLevelMatch = (path: string) => {
        return pathname.includes(`/${path}`) || pathname.startsWith(`/${path}`);
    };

    if (pathname.includes('/admin')) {
        if (!session) {
            // Not authenticated - redirect to login
            // We need to preserve the locale if possible
            const locale = pathname.split('/')[1];
            const loginPath = routing.locales.includes(locale as any) ? `/${locale}/login` : '/login';
            const loginUrl = new URL(loginPath, request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
