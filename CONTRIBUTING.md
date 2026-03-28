# Contributing to Haiti City Portal

Thank you for your interest in contributing to the Haiti City Portal project. We welcome code contributions, bug reports, content translations, and feature requests.

## Contributor License Agreement (CLA)

By submitting a contribution to this project (including Pull Requests, Issues, and Code), you agree to the following terms:

**"By submitting a contribution to this project, you agree that Haiti City Portal Project has a perpetual, world-wide, non-exclusive license to use, modify, and sub-license your contribution commercially, with the intent of supporting project contributors."**

This ensures we can maintain project sustainability while keeping the core open for non-commercial use. All code contributions are licensed under **BSL 1.1** (see LICENSE.md).

---

## How to Contribute

### Code contributions

1. **Fork the repository** and create a feature branch.
2. **Follow the setup guide** in README.md to get the app running locally.
3. **Read the architecture rules** in `copilot-instructions.md` before writing any code.
4. **Submit a Pull Request** with a clear description of the change and why it is needed.
5. **Follow the code of conduct** and maintain professional interactions.
6. **Include copyright headers** in all new `.ts` and `.tsx` files.
7. **Add yourself** to the Contributors section below.

### Content / translation contributions

The portal supports four languages: English (`en`), French (`fr`), Haitian Creole (`ht`), and Spanish (`es`).

**To translate a service page or news article:**
1. Find the English file: `src/content/services/{slug}.mdx` or `src/content/news/{date-slug}.mdx`.
2. Create a new file with the locale suffix: `{slug}.fr.mdx`, `{slug}.ht.mdx`, or `{slug}.es.mdx`.
3. Translate the YAML frontmatter fields and the markdown body. Keep the frontmatter structure identical.
4. Submit a Pull Request.

**To translate UI strings:**
1. Find the key in `messages/en.json`.
2. Add the translation to the corresponding `messages/{locale}.json`.
3. Submit a Pull Request.

---

## Key Architecture Points

Before writing code, read these rules (full details in `copilot-instructions.md`):

- **Every database table must have a `tenant_id` column.** All queries must filter by it.
- **Never use integer IDs.** Always use `uuid().defaultRandom()`.
- **Never hardcode user-visible strings in components.** Short UI strings go in `messages/*.json`. Prose content goes in `src/content/**/*.mdx`.
- **Import `Link` from `@/i18n/navigation`**, not from `next/link`, to get automatic locale prefixes. (Exception: `src/app/not-found.tsx`.)
- **All pages live under `src/app/[locale]/`.** Never create routes outside this prefix.

---

## Development Setup

```bash
docker compose up -d        # Start local Postgres
cp .env.local.example .env.local
# Edit .env.local with DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
npm install
npm run db:push
npm run db:seed
npm run dev
```

---

## Branch Protection

The `main` branch requires:
- Signed commits (GPG)
- At least one approving review
- All status checks passing

See `docs/BRANCH_PROTECTION.md` for setup instructions.

---

## Why Vwa?

[Vwa](https://haitiansintech.com) is the professional verification platform for Haitian technologists. By linking your Vwa profile:

- You build a verified track record of civic tech contributions.
- You join the network of Haitian professionals building digital infrastructure.
- You help establish a new standard for transparency in Haitian leadership.

We encourage all contributors to add their Vwa profile link to their GitHub bio.

---

## Contributors

This project is built by Haitian technologists and allies committed to transparent governance.

### Core Contributors

- **[Project Maintainer](https://github.com/yourusername)** — Initial architecture and vision

### Contributors

<!-- Add your entry below this line -->
- **[Your Name](https://github.com/yourusername)** — [Vwa Profile](https://haitiansintech.com/profile/yourname) — Brief description of contribution
- **[Makendy Midouin](https://github.com/makendym)** — [Vwa Profile](https://haitiansintech.com/profile/makendym) — Fixed breadcrumb locale duplication bug (#12) and directory localization sync (#9)

---

Thank you for building Haiti's digital future.
