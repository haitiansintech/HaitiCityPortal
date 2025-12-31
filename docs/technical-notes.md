# Technical Roadmap & Implementation Plan

## Architecture Overview
Haiti City Portal is a **Multi-Tenant SaaS** built on Next.js 15, Postgres (Drizzle), and Shadcn UI.
- **Single Instance**: One codebase serves all cities.
- **Tenant Resolution**: Middleware extracts `subdomain` to inject `tenant_id` into database queries.
- **Offline-First**: Client-side IndexedDB queues actions when offline; Service Workers sync later.

## Schema Standards (MANDATORY)
1.  **UUIDs Only**: All primary keys must use `uuidv4()` to ensure collision-free offline ID generation. **NO Integers.**
2.  **Multitenancy**: Every entity table (issues, events, permits) MUST have a `tenant_id` column separate from the Primary Key.
3.  **Audit Columns**: All tables must track `created_at` and `updated_at`.

## Implementation Phases

### Phase 1: Foundation (Tenant Resolver)
- **Goal**: Enable multi-city support on a single database.
- **Tasks**:
    - [ ] Create `tenants` table (id, subdomain, name, logo_url).
    - [ ] Implement Next.js Middleware to resolve `host` header -> `tenant_id`.
    - [ ] Update all existing Drizzle schemas to include `tenant_id` and `id: uuid`.
    - [ ] Seed "Test Tenant" (localhost -> Demo City).

### Phase 2: Core (Authentication & Roles)
- **Goal**: Secure access for citizens and officials.
- **Tasks**:
    - [ ] Implement RBAC (Super Admin, City Admin, Citizen).
    - [ ] Create "SaaS Admin Panel" for city officials to manage their specific tenant.
    - [ ] Ensure `next-intl` loads locale based on user preference + tenant default.

### Phase 3: Offline (Draft Mode)
- **Goal**: Resilience in intermittent connectivity.
- **Tasks**:
    - [ ] Configure `serwist` or Next.js Service Workers for asset caching.
    - [ ] Create `useOfflineQueue` hook to save form submissions to IndexedDB.
    - [ ] Implement background sync to push drafts when online.

### Phase 4: Sovereignty (Blockchain Verification)
- **Goal**: Immutable audit trail.
- **Tasks**:
    - [ ] Implement hashing service (SHA-256) for finalized records (e.g., Property Titles).
    - [ ] Write hash + ID to Public Blockchain (Polygon/Ethereum) via simple smart contract.
    - [ ] UI Badge: "Verified on Blockchain" with explorer link.
