<!--
Languages: English (this file) | Français (CONTENT_GUIDE.fr.md) | Kreyòl (CONTENT_GUIDE.ht.md) | Español (CONTENT_GUIDE.es.md)
-->

**Languages:** **English** · [Français](CONTENT_GUIDE.fr.md) · [Kreyòl Ayisyen](CONTENT_GUIDE.ht.md) · [Español](CONTENT_GUIDE.es.md)

[← Docs index](README.md) · [Project README](../README.md) · [Glossary](GLOSSARY.md)

---

# Content Guide

How to translate or edit content **without installing anything** — only a web browser and a GitHub account. Designed for translators, communications staff, and anyone who wants to improve the portal's text.

## Table of Contents

- [What you can edit](#what-you-can-edit)
- [Setting up a GitHub account](#setting-up-a-github-account)
- [Editing a file in the GitHub web UI](#editing-a-file-in-the-github-web-ui)
- [Editing a UI label (`messages/*.json`)](#editing-a-ui-label-messagesjson)
- [Translating a service description](#translating-a-service-description)
- [Adding a news article](#adding-a-news-article)
- [Editing a static page (About, Privacy, Terms)](#editing-a-static-page-about-privacy-terms)
- [Markdown basics](#markdown-basics)
- [Frontmatter cheat sheet](#frontmatter-cheat-sheet)
- [Common mistakes](#common-mistakes)
- [Getting help](#getting-help)

---

## What you can edit

Everything is text. Three places hold content:

| Type | Location | Example |
|---|---|---|
| UI labels (short text) | `messages/{locale}.json` | "Submit", "Pay now", nav menu items |
| Service descriptions, news, legal pages | `src/content/**/*.mdx` | Trash service page, hurricane news article |
| Translations of either | Same files with `.fr.`, `.ht.`, `.es.` suffix | `services/trash.fr.mdx` |

Editing happens through GitHub's web UI. No software to install. No Git knowledge required.

[↑ Back to top](#table-of-contents)

---

## Setting up a GitHub account

If you already have one, skip this.

1. Go to <https://github.com/signup>.
2. Enter your email, create a password and username.
3. Confirm the verification email.
4. (Optional) Add a profile photo and your role at the commune.

That's it. You don't need any GitHub plan beyond the free tier.

[↑ Back to top](#table-of-contents)

---

## Editing a file in the GitHub web UI

Same five steps for every edit:

1. Sign in at <https://github.com>.
2. Navigate to the file you want to edit (links below).
3. Click the **pencil icon** in the upper right.
4. Make your edits in the browser.
5. Scroll down. Choose **Create a new branch for this commit and start a pull request** (the default is fine for most edits). Click **Propose changes**.
6. On the next screen click **Create pull request**.

A maintainer will review and merge it. Within a few minutes of merging, your change is live on the portal.

If you don't have write access to the main repository, GitHub will offer to **fork** it for you — accept this. Your edit goes into your own copy of the project, and the Pull Request asks the project to merge your improvement.

[↑ Back to top](#table-of-contents)

---

## Editing a UI label (`messages/*.json`)

UI labels are short pieces of text in the navbar, buttons, form labels, etc.

Each language has its own JSON file:

| Language | File |
|---|---|
| English | [`messages/en.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/en.json) |
| French | [`messages/fr.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/fr.json) |
| Haitian Creole | [`messages/ht.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/ht.json) |
| Spanish | [`messages/es.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/es.json) |

### Example: improving a Creole translation

Open `messages/ht.json`. You see something like:

```json
{
  "Nav": {
    "home": "Akèy",
    "services": "Sèvis",
    "report": "Rapòte",
    "pay": "Peye"
  }
}
```

To improve "Rapòte" to "Siyale yon Pwoblèm":

1. Click the pencil icon.
2. Change the value (the right side of the colon, in quotes).
3. Submit a Pull Request as described above.

> **Important:** never change the **keys** (left side: `home`, `services`, `report`, `pay`). The keys are referenced in code. Only change the **values** (the translations).

> **Important:** if you add a new key in `en.json`, you must add it in **all four** language files. Otherwise the page will display a `MISSING_MESSAGE` error.

[↑ Back to top](#table-of-contents)

---

## Translating a service description

Service descriptions are MDX files in [`src/content/services/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content/services).

The base file is `{slug}.mdx` (English). Translations are `{slug}.fr.mdx`, `{slug}.ht.mdx`, `{slug}.es.mdx`.

### Example: adding a Creole translation for "Trash Collection"

1. Open the English version: [`src/content/services/trash.mdx`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/src/content/services/trash.mdx).
2. Copy its full contents.
3. In a new tab, navigate to `src/content/services/`.
4. Click **Add file → Create new file**.
5. Name it `trash.ht.mdx`.
6. Paste the English contents.
7. Translate the values in the frontmatter (the YAML between `---` lines):
   ```yaml
   ---
   title: Ramasaj Fatra
   description: Sèvis ramasaj fatra nan komin lan.
   steps:
     - Mete fatra w nan sak ki gen koulè
     - Pote l deyò pòt jou ramasaj la
     - Verifye orè a
   documents:
     - Okenn dokiman pa nesesè
   fees: Gratis
   ---
   ```
8. Translate the markdown body below the frontmatter.
9. Submit the Pull Request.

If you only translate part of the file, that's fine — the system falls back to English for any missing piece.

> **Important:** keep the frontmatter **field names** (`title`, `description`, `steps`, `documents`, `fees`) in English. Only translate their **values**.

[↑ Back to top](#table-of-contents)

---

## Adding a news article

News articles are MDX files in [`src/content/news/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content/news).

Filename pattern: `YYYY-MM-DD-{short-slug}.mdx`.

### Example: hurricane preparedness, May 2026

1. Navigate to `src/content/news/`.
2. **Add file → Create new file**.
3. Name it `2026-05-20-hurricane-prep.mdx`.
4. Paste this template:

```mdx
---
date: "May 20, 2026"
dateISO: "2026-05-20"
title: "Hurricane season preparedness"
description: "What every family should do before June 1."
---

The Haitian hurricane season begins June 1. The mayor's office urges every household to prepare a 72-hour emergency kit:

- Drinking water (4 litres per person per day)
- Non-perishable food
- Flashlight and spare batteries
- Battery-powered radio
- First-aid kit
- Copies of identity documents in a waterproof bag

Public shelters will be activated as needed. The list is published at /directory.
```

5. Submit the Pull Request.
6. Within minutes of merge, the article appears on the homepage and at `/news`.

To translate, repeat with `2026-05-20-hurricane-prep.fr.mdx`, `.ht.mdx`, `.es.mdx`.

> **Tip:** date filenames sort alphabetically, so newest-first ordering is automatic. Use `YYYY-MM-DD` exactly.

[↑ Back to top](#table-of-contents)

---

## Editing a static page (About, Privacy, Terms)

Static pages live at the root of [`src/content/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content). Same format and same workflow as services and news.

| Page | File |
|---|---|
| About | `about.mdx` (and `.fr.mdx`, `.ht.mdx`, `.es.mdx`) |
| Privacy | `privacy.mdx` |
| Terms | `terms.mdx` |
| Tech | `tech.mdx` |

[↑ Back to top](#table-of-contents)

---

## Markdown basics

Markdown is a simple text format. Here are the only things you need:

| Syntax | Renders as |
|---|---|
| `# Heading 1` | Big title |
| `## Heading 2` | Section title |
| `### Heading 3` | Sub-section |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `- item` | bullet list |
| `1. item` | numbered list |
| `[link text](https://example.com)` | [link text](https://example.com) |
| `![alt text](image.jpg)` | image |
| `> quote` | blockquote |
| ` `code` ` | inline code |

That's all you need. No HTML, no fancy tricks.

[↑ Back to top](#table-of-contents)

---

## Frontmatter cheat sheet

Frontmatter is the structured block at the top of every MDX file, between two `---` lines. It's YAML.

### Service page

```yaml
---
title: Service name (display)
description: One-line description for cards
steps:
  - Step one
  - Step two
documents:
  - Document required
fees: Fee description (a string, e.g. "100 HTG" or "Free")
---
```

### News article

```yaml
---
date: "Month DD, YYYY"
dateISO: "YYYY-MM-DD"
title: "Article title"
description: "Short excerpt."
---
```

### Static page

```yaml
---
title: Page title
description: Short page description
---
```

> **YAML quirks:** strings with colons or special characters need to be in quotes. Lists use `- ` (dash space) at the start of each line. Indentation matters — use two spaces.

[↑ Back to top](#table-of-contents)

---

## Common mistakes

| Mistake | Result | Fix |
|---|---|---|
| Renamed a JSON key (left side) | Page shows `MISSING_MESSAGE` | Rename it back; keys are code references |
| Forgot the closing `---` after frontmatter | Page is blank or errors | Add the second `---` |
| Wrong filename for a translation | The translation is silently ignored | Match the pattern exactly: `slug.fr.mdx`, etc. |
| Changed dateISO format | News article disappears or sorts wrong | Use `YYYY-MM-DD` only |
| Broke YAML indentation | Page errors | Two-space indent, never tab |
| Used Markdown `_underscore_` for italics | Sometimes works, sometimes weird | Prefer `*asterisks*` |
| Trailing comma in JSON | File won't parse | Remove the trailing comma |

If a Pull Request fails CI checks (red X), don't panic — read the message at the bottom of the PR. It usually points to the line. Fix and push again.

[↑ Back to top](#table-of-contents)

---

## Getting help

- **Stuck on a translation?** Open the PR anyway — note in the description "needs review by native speaker".
- **Stuck on Git/GitHub?** Open an issue: <https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose>.
- **General questions:** `info@haiticity.org`.

We deeply value content contributions. They are often the highest-impact changes — code without good text helps nobody.

[↑ Back to top](#table-of-contents)

---

[← Docs index](README.md) · [Admin Manual](ADMIN_MANUAL.md) · [Architecture →](ARCHITECTURE.md)
