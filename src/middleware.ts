import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

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

export default auth(async function middleware(request) {
    const headers = new Headers(request.headers);
    const host = headers.get('host') || '';
    const pathname = request.nextUrl.pathname;

    // STEP 1: Extract subdomain from host (EXISTING LOGIC - PRESERVED)
    const subdomain = extractSubdomain(host);

    // DEBUG: Log the routing for visibility
    console.log(`[Middleware] Routing: ${host} -> subdomain: "${subdomain}", path: ${pathname}`);

    // Set header for downstream Server Components
    const response = NextResponse.next({
        request: {
            headers: new Headers(request.headers),
        },
    });
    response.headers.set('x-tenant-subdomain', subdomain);

    // STEP 2: Check authentication for protected routes (NEW LOGIC)
    const session = request.auth;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        if (!session) {
            // Not authenticated - redirect to login
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Optional: Tenant security check
        // Verify user's tenantId matches the current subdomain's tenant
        // This prevents cross-tenant access
        // Note: You'd need to query the database to map subdomain -> tenant_id
        // For now, we trust the session includes the correct tenantId
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
