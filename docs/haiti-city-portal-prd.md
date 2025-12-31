📘 Haiti City Portal — Product Requirements Document (PRD)
Version 2.0 (Multi-Tenant SaaS Pivot)

1. Overview
Haiti City Portal (HCP) is a Multi-Tenant, Offline-First SaaS Platform designed to modernize local governance in Haiti. It operates as a single codebase and database that serves multiple municipalities, identified by subdomain (e.g., `jacmel.portal.ht`, `cap.portal.ht`).

HCP empowers cities to offer standardized digital services, payments, and transparency while ensuring data sovereignty and offline resilience for low-bandwidth environments.

2. Architecture & Vision
**System Type**: Multi-Tenant SaaS (Headless).
**Tenant Resolution**: Cities are identified by subdomain.
**Data Strategy**: "Hub & Spoke" — Central Cloud Truth + Local Offline "Draft Mode".
**Sovereignty**: Blockchain (Polygon/Ethereum) used for cryptographic verification of records (audit trail), NOT for PII storage.

Primary Objectives
- **Scale Efficiently**: Onboard new cities in minutes via tenant configuration, not new deployments.
- **Ensure Resilience**: Function in intermittent internet via Service Workers and local caching.
- **Protect Sovereignty**: Provide immutable audit trails for critical records (titles, permits).

3. Target Users
**Primary**: Haitian Citizens (Constituents) & Diaspora.
**Secondary**: Municipal Admin Officials (Using the SaaS Admin Panel).
**Tertiary**: Open-Source Contributors.

4. Core Features (MVP)
**Municipal Features (SaaS Admin Panel)**
- **Multi-Tenant Dashboard**: Admins see only their city's data based on login context.
- **Service Management**: Toggle services (Trash, Permits) per tenant.
- **Record Verification**: hashing critical documents to blockchain.

**Citizen Features**
- **Offline Forms**: Submit requests (potholes, certificates) that queue locally when offline.
- **Tenant-Aware Accounts**: A single user identity can interact with multiple cities if needed.
- **Transparency**: View immutable logs of application status changes.

**System Features**
- **Multi-Tenancy**: Middleware resolves `subdomain` -> `tenant_id`.
- **UUIDs Everywhere**: All database IDs are UUIDv4 to support offline generation without collision.
- **Row Level Security**: Strict database policies to isolate tenant data.

5. Future Features (Post-MVP)
- **GIS Integration**: Tenant-specific map layers.
- **WhatsApp Integration**: Automated status updates via localized bots.
- **Satellite Sync**: Batch syncing for remote town halls via Starlink.

6. Multilingual Requirements
- Haitian Creole (Default), French, Spanish, Portuguese, English.
- **Architecture**: Text strings must never be hardcoded; use `next-intl`.

7. UX Principles
- **Offline-First**: UI must clearly indicate "Draft Saved" vs "Synced".
- **Mobile-First**: Optimized for constrained devices.
- **Trust**: Visual indicators of blockchain verification (Green Checkmarks).

8. Success Metrics
- **Onboarding Time**: New tenant provisioned < 10 minutes.
- **Offline Success**: >90% of forms submitted offline eventually sync successfully.

9. Risks & Mitigation
1. **Cross-Tenant Data Leaks**
   - **Risk**: A bug exposes Jacmel data to Cap-Haitien users.
   - **Mitigation**: Strict Row Level Security (RLS) on Postgres. All queries must filter by `tenant_id`.
2. **Key Management**
   - **Risk**: Losing blockchain keys for verification.
   - **Mitigation**: Managed custodial wallets for municipalities with multi-sig recovery.
3. **Internet Instability**
   - **Risk**: Long-term disconnects.
   - **Mitigation**: Extended local storage retention (IndexedDB) and SMS fallback.

10. Licensing
- Mozilla Public License 2.0 (MPL 2.0).



