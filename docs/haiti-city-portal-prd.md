Haiti City Portal
Product Requirements Document (PRD) + Technical Specification
Version 1.0

1. Overview
Haiti City Portal (HCP) is an open-source municipal services platform designed to modernize local governance in Haiti and empower Haitian citizens and the diaspora. The system provides standardized city websites, digital service delivery, civic payments, and cross-border engagement while remaining fully transparent and open-source. Paid hosting, support, and customization services will sustain long-term operations.

2. Vision & Objectives
Primary Objectives
Digitize municipal services across Haitian cities.


Enable low-bandwidth-optimized access to government services.


Support diaspora civic engagement and sponsorship.


Provide open-source digital public infrastructure for local governments.


Create workforce development opportunities in Haiti and the diaspora.


Secondary Objectives
Improve municipal transparency and performance tracking.


Standardize workflows for permits, payments, and records.


Enable regional collaboration with Caribbean and Latin American partners.



3. Target Users
Primary Users
Municipal government officials


Haitian citizens (local residents)


Haitian diaspora (US, DR, Chile, Brazil, Canada, Europe)


Developers and open-source contributors


Secondary Users
NGOs and donors


Journalists and civic organizations


Educational institutions



4. Core Features (MVP)
Municipal Features
Announcements and alerts


City department directory


Digital forms (permits, licensing, requests)


Payment processing (property tax, service fees) via MonCash and Stripe


Citizen dashboard


Municipality dashboard with metrics


Citizen Features
Account creation & login


View/submit service requests


Pay municipal fees


Follow city updates


Diaspora Features
Cross-border payments


Sponsorship and donation flows


Multilingual interface


System Features
Low-bandwidth optimization


Offline caching


API-based modular architecture


Five-language support (EN, HT, FR, ES, PT-BR)



5. Future Features (Post-MVP)
GIS property lookup (OpenStreetMap)


Digital land registry


311 issue reporting with geotagging


Cleaning routes / garbage pickup status


Data analytics and transparency dashboards


AI-assisted citizen services


Mobile app (React Native)


Integration with diaspora remittance sponsors



6. Multilingual Requirements (Required at Launch)
Languages Supported
Haitian Creole (HT) — default


French (FR)


Spanish (ES)


Brazilian Portuguese (PT-BR)


English (EN)


Key Requirements
Entire UI must support all five languages.


English is base language for all translation keys.


Language switcher must appear in header, mobile menu, and footer.


Layout must remain stable across languages.


User selection must persist across sessions.



7. UX Principles
Mobile-first for Haiti


Low-bandwidth design (2G/3G survivable)


Offline caching for critical content


Highly readable fonts


Color accessibility compliance


Trust-focused design (official municipality verification badges)



8. Success Metrics
10+ municipalities onboarded (Year 1)


500–1,500 daily unique users per city


1,000+ digital civic transactions per city


25+ open-source contributors


200+ students trained through the workforce pipeline



9. Risks & Mitigation
Risk
Mitigation
Low adoption
Onboarding support, training
Internet instability
Offline mode, caching
Payment disruptions
Multi-rail payment integrations
Government turnover
Institutional partnership strategy
Security concerns
Modern encryption, strict access levels


10. Technical Architecture
Frontend
Next.js / React


Tailwind or Styled Components


Next-i18next or Lingui for internationalization


Service Workers for offline caching


Backend
Node.js (Fastify or NestJS) or Django REST Framework


PostgreSQL


Redis for caching


S3-compatible storage


Supabase or custom auth


APIs
REST + GraphQL


Webhooks for payments & status updates


Payments
MonCash


Stripe for diaspora payments


Optional bank integrations



11. System Components
Web App
Citizen portal


Municipality portal


Admin CMS


Backend Services
Authentication


Payment service


Notifications (SMS, WhatsApp optional)


Data analytics service


Infrastructure
Docker


Terraform


Vercel/DigitalOcean/Supabase hosting



12. Multilingual Technical Specification (i18n)
12.1 i18n Architecture
English is base language.


All text externalized into translation files.


Graceful fallback to English if translation is missing.



12.2 Folder Structure
/src
  /i18n
    /locales
      /en/*.json
      /ht/*.json
      /fr/*.json
      /es/*.json
      /pt-BR/*.json
    i18n.ts
    detector.ts


12.3 Translation Key Format
Use descriptive names:
"auth.login.title": "Sign In"
"form.submit": "Submit"
"payment.success": "Your payment was successful"

Avoid vague keys.

12.4 Language Detection Order
User profile setting


LocalStorage


Browser language


Default: Haitian Creole



12.5 CMS Multilingual Data Structure
Example announcement:
{
  "title": {
    "en": "...",
    "ht": "...",
    "fr": "...",
    "es": "...",
    "pt-BR": "..."
  }
}


12.6 Backend Requirements
Accept Accept-Language header


Respect ?lang= query parameter


Fallback logic on server



12.7 Translation Workflow
English finalized


Machine translation draft


Human review (required)


GitHub PR workflow


Annual glossary update


Tools recommended: DeepL, GPT-4.1, Weblate or Crowdin.

12.8 Testing Requirements
Automated
Missing keys checker


Key duplication detection


Snapshot tests to catch layout breakage


Manual
Test each language on:
Mobile


Desktop


Offline mode


Forms


Payments



12.9 Performance Requirements
Lazy-load translation namespaces


Translation bundle < 50KB per language


Cache-first loading for repeated visits



13. Data Models (High-Level)
User
id


name


email


language


role (citizen, admin, municipality, diaspora)


municipalityId


Announcement
id


municipalityId


title (multilingual object)


body (multilingual object)


publishDate


Payment
id


userId


amount


type


status


gateway



14. API Endpoints (Sample)
GET /announcements?lang=ht
Returns multilingual announcements.
POST /payments/moncash
Initiates MonCash payment.
GET /municipality/{id}/services
Returns city-specific services.

15. Deployment Requirements
CI/CD via GitHub Actions


Staging + production environments


Automated rollback


Infrastructure as Code (Terraform)


Observability via Logtail, Grafana, or Supabase logs



16. Licensing & Business Model
Open-Source License
AGPL or MPL recommended


Revenue Streams
Paid hosting


Paid SLAs


Custom development


Municipal training


Diaspora sponsorship processing



17. Governance & Maintenance
Roles
OSS Maintainers


Language Maintainers


Municipal Liaisons


Training Team


Technical Support Team


Cadence
Quarterly feature updates


Monthly patch releases


Continuous community contributions



18. Appendices
Glossary of standardized municipal terminology


UI wireframes (to be added)


Sample user journeys


Low-bandwidth UI principles doc
