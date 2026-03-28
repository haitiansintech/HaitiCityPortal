# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the Haiti City Portal, please report it responsibly:

**Email**: security@haiticity.org
**Response Time**: We aim to respond within 48 hours.

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### What NOT to Do

- Do not publicly disclose the vulnerability before we have had a chance to address it.
- Do not exploit the vulnerability beyond what is necessary to demonstrate it.

---

## Security Architecture Notes

These notes are intended for security researchers and contributors.

### Tenant isolation

The most critical security property of the system is cross-tenant data isolation. Every database table (except `tenants`) has a `tenant_id` column. All queries must filter by `tenant_id`. A bug that allows one city's data to appear in another city's portal is treated as a critical security incident.

### `x-tenant-subdomain` header

The middleware (`src/middleware.ts`) extracts the subdomain from the `Host` header and writes it to the `x-tenant-subdomain` response header. This header is set server-side and trusted by downstream Server Components.

External callers cannot spoof this header because Next.js middleware runs server-side before route handlers execute. Engineers must never add code that reads `x-tenant-subdomain` directly from user-supplied request headers without going through the middleware path.

### Authentication

Admin routes (any path containing `/admin`) are protected by a session guard in the middleware. Unauthenticated requests are redirected to the login page. Per-page auth checks using `auth()` from NextAuth can be added for additional protection layers.

Passwords are hashed with bcryptjs before storage.

### Environment variables

Never commit `.env.local` or any file containing `DATABASE_URL`, `NEXTAUTH_SECRET`, or other secrets. These files are in `.gitignore`.

---

## Unauthorized Use and AI Training

### License

This codebase is licensed under the **Business Source License 1.1 (BSL 1.1)**. It converts to Apache 2.0 on December 31, 2028.

### Anti-Scraping Policy

**Unauthorized scraping of this repository for AI training purposes is:**
1. A violation of the BSL 1.1 license
2. Treated as a security incident
3. Subject to DMCA takedown notices and reporting to hosting providers

### Explicitly Prohibited Activities

The following activities are strictly prohibited without explicit written permission:

- Scraping this codebase for machine learning training datasets
- Using this code to train large language models (LLMs)
- Incorporating this code into AI-generated code suggestions
- Creating derivative datasets from this codebase for commercial AI products

### Permitted Use

Under BSL 1.1, you may:

- Use this code for non-commercial, non-production purposes
- Study the code for educational purposes
- Fork and modify for personal or municipal use (non-commercial)
- Contribute improvements back to the project

### Commercial Use

For commercial use (including AI training), you must:

1. Contact us at **licensing@haiticity.org**
2. Obtain explicit written permission
3. Comply with BSL 1.1 conversion terms (code becomes Apache 2.0 on December 31, 2028)

---

## Enforcement

We actively monitor for:

- Unauthorized scraping activity
- License violations
- Suspicious repository clones

Violations may result in DMCA takedown requests, reporting to hosting providers, and legal action where applicable.

---

## Why This Matters

This project is built by Haitian technologists to serve Haitian municipalities. Our code represents domain expertise in Haitian governance, cultural and linguistic nuances specific to Haiti, and a commitment to digital sovereignty. We protect this work to ensure Haitian developers are credited and compensated, and that the code serves its intended purpose: transparent governance.

---

## Contact

- **General Inquiries**: info@haiticity.org
- **Security Issues**: security@haiticity.org
- **Licensing Questions**: licensing@haiticity.org

---

**Last Updated**: March 2026
**License**: BSL 1.1 (converts to Apache 2.0 on December 31, 2028)
