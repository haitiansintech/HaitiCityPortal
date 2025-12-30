📘 Haiti City Portal — Product Requirements Document (PRD)
Version 1.0

1. Overview
Haiti City Portal (HCP) is an open-source municipal services platform designed to modernize local governance in Haiti and empower both residents and the Haitian diaspora.
HCP provides standardized digital city websites, access to municipal services, online payments, and multilingual communication channels. 
HCP is designed for low-bandwidth environments, full multilingual support, and seamless integration with diaspora-friendly payment rails.

2. Vision & Objectives
Primary Objectives
Digitize municipal services across Haitian cities.


Ensure mobile-first, low-bandwidth access for citizens.


Enable diaspora engagement and sponsorship of municipal services.


Establish an open-source civic technology foundation for Haiti.


Create practical workforce development opportunities through open-source collaboration.


Secondary Objectives
Improve governmental transparency and public trust.


Standardize municipal workflows (payments, permits, licensing).


Promote regional integration with Caribbean and Latin American partners.


Foster data-driven municipal decision-making.



3. Target Users
Primary Users
Haitian Citizens (Constituents)
 Need accessible tools to request services (trash pickup, water, certificates), view updates, and make payments. Require high contrast, large text, and obvious buttons for essential services.


Haitian Diaspora (Diaspora Constituents)
 Looking to sponsor services, support municipalities, and stay informed. Need emotional connection through imagery and clear transparency to see where contributions go.


Secondary Users
Municipal Government Officials
 Responsible for publishing updates, processing requests, and managing local services. Use the platform to serve constituents.


Open-Source Developers
 Contributing modules and providing technical improvements.


Tertiary Stakeholders
NGOs and donor organizations


Journalists and watchdog groups


Civic researchers


Educational institutions



4. Core Features (MVP)
Municipal Features
Announcements and alerts


City department and services directory


Digital forms (permits, licensing, service requests)


Civic payments (property tax, service fees) via MonCash and Stripe


Municipality dashboard with basic metrics


Citizen Features
Account creation and login


Submit and track service requests


Pay municipal fees


Follow city updates


Diaspora Features
Cross-border payments


Sponsorship/donation flows for municipal initiatives


Full multilingual support


System Features
Low-bandwidth optimization


Mobile-first responsive layout


Offline caching for critical content


Modular API-based architecture


Required launch languages:
 Haitian Creole (default), French, Spanish, Brazilian Portuguese, English



5. Future Features (Post-MVP)
GIS-based property lookup (OpenStreetMap)


Digital land and business registry


311 issue reporting with optional geotagging


Garbage pickup routes / sanitation status


Data analytics & transparency dashboards


AI-assisted citizen helpflows


React Native mobile app


Diaspora remittance integrations



6. Multilingual Requirements
The system must support five languages at launch:
Haitian Creole (HT) — default


French (FR)


Spanish (ES)


Brazilian Portuguese (PT-BR)


English (EN)


Requirements
All UI content must be available in all five languages.


English serves as the base string set for localization.


Language switcher must appear in header, mobile menu, and footer.


User preferences must persist across sessions.


Layout must remain visually stable regardless of language length.



7. UX Principles
Mobile-first for Haiti’s mobile-dominant population


Low-bandwidth resilience (2G/3G survivable)


Offline-capable via caching for key content


High readability—clear typography & spacing


Accessible color contrast & interaction design


Trust-driven UI including verified municipality indicators



8. Success Metrics
Municipality Adoption
10+ municipalities onboarded in Year 1


25+ in Year 2


Citizen Engagement
500–1,500 daily unique visitors per city


1,000+ digital civic transactions per city annually


Developer Ecosystem
25+ open-source contributors


Active module development from the community


Impact
200+ students or trainees participate in technical workforce programs



9. Risks & Mitigation
1. Low Municipal Adoption
Risk: Municipalities may not adopt or maintain digital tools.
Mitigation: Provide training, templates, onboarding support, and low-cost hosting.
2. Internet Instability
Risk: Poor connectivity limits access.
Mitigation: Offline caching, low-bandwidth UI, SMS fallback for core services (future).
3. Payment Reliability
Risk: MonCash outages or failures interrupt payments.
Mitigation: Multi-rail payment redundancy (Stripe, bank transfer).
4. Government Turnover & Instability
Risk: Political change disrupts adoption or continuity.
Mitigation: Non-partisan positioning, diaspora-supported models, transparent OSS governance.
5. Trust & Credibility
Risk: Citizens may distrust digital services.
Mitigation: Open-source transparency, visible verification of municipalities.
6. Digital Literacy Barriers
Risk: Not all citizens will be comfortable navigating digital services.
Mitigation: Simple UX, multilingual support, instructional microcopy.
7. Resource Constraints
Risk: Cities may lack staff or technical capacity.
Mitigation: Offer white-glove onboarding, SLAs, and plug-and-play modules.
8. Security & Privacy Concerns
Risk: Sensitive data may be mishandled or exposed.
Mitigation: Strong encryption, restricted admin access, regular audits.

10. Licensing
The Haiti City Portal core platform will be released under the Mozilla Public License 2.0 (MPL 2.0).
Why MPL 2.0
MPL is chosen for the following reasons:
1. Transparency & Public Trust
All modifications to existing Haiti City Portal source files must be shared back under the same license, which ensures that civic infrastructure remains inspectable, auditable, and accountable.
2. Flexibility for Municipal & Regional Partners
MPL allows government agencies, NGOs, integrators, and regional technology partners to create separate custom modules or integrations without open-sourcing those additions, reducing barriers to adoption and collaboration.
3. Compatibility With Large-Scale Deployment
MPL avoids the procurement complexity associated with stricter copyleft licenses.
 This makes it easier for municipalities and international organizations to evaluate, deploy, and adapt the platform.
4. Prevents Code Lock-In
All enhancements to the core must remain open-source, maintaining long-term accessibility and preventing the fragmentation of critical civic infrastructure.
5. Ecosystem-Friendly
MPL has been successfully used in large-scale open-source and government-facing projects (e.g., Firefox, CKAN, OpenMRS) where transparency and flexibility are both required.

Revenue Streams
Paid hosting plans for municipalities


Paid support tiers (SLAs)


Custom feature development


Municipal workforce training


Diaspora sponsorship processing fees



11. Governance & Maintenance
Roles
OSS Maintainers – oversee codebase


Language Maintainers – ensure translations (HT, FR, ES, PT-BR, EN)


Municipal Liaisons – manage city onboarding


Training Lead – workforce development programs


Support Team – operational SLAs


Cadence
Quarterly feature releases


Monthly patch releases


Continuous community contributions


Annual roadmap review



12. Appendices
Glossary of municipal terminology


Wireframes (to be added)


Sample citizen user journeys


Low-bandwidth UI guidelines


