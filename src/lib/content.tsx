/**
 * Content loading and rendering utilities.
 *
 * MDX files live in src/content/ and follow a locale-suffix naming convention:
 *   src/content/{slug}.mdx            → English (default)
 *   src/content/{slug}.fr.mdx         → French
 *   src/content/{slug}.ht.mdx         → Haitian Creole
 *   src/content/{slug}.es.mdx         → Spanish
 *
 * Slugs may include subdirectories, e.g. "services/birth-certificates" or
 * "pages/impact". loadContent() always falls back to the English file when a
 * locale-specific file is not found, so partially-translated content degrades
 * gracefully rather than crashing.
 *
 * Frontmatter (YAML between --- delimiters) carries structured data such as
 * titles, step arrays, fees, and document lists. The parsed values are
 * returned on the `data` field and consumed directly by page components.
 * The markdown body (everything after the frontmatter) is rendered by
 * MarkdownRenderer, which uses react-markdown for full inline-formatting
 * support (bold, links, lists, headings).
 */

import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const contentDir = path.join(process.cwd(), "src/content");
const newsDir = path.join(contentDir, "news");

export interface ContentEntry {
  /** Page title — from frontmatter `title:` or the first H1 in the body. */
  title: string;
  /** Markdown body text, with frontmatter stripped. */
  body: string;
  /** All frontmatter fields as a plain object. Cast to a typed interface in the calling page. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

/**
 * Reads and parses an MDX/Markdown content file, with automatic locale
 * fallback to English.
 *
 * Results are memoized per (slug, locale) pair for the lifetime of the
 * React render using React.cache, so multiple components on the same page
 * can call loadContent() without redundant disk reads.
 *
 * @param slug   - Path relative to src/content/, without extension.
 *                 May include subdirectories: "services/trash", "pages/impact".
 * @param locale - BCP-47 locale string ("en", "fr", "ht", "es").
 *                 Defaults to English when omitted or when the locale file is absent.
 */
export const loadContent = cache(async (slug: string, locale?: string): Promise<ContentEntry> => {
  // Normalise path separator for Windows compatibility
  const slugPath = slug.split("/").join(path.sep);
  let filePath = path.join(contentDir, `${slugPath}.mdx`);

  if (locale && locale !== "en") {
    const localePath = path.join(contentDir, `${slugPath}.${locale}.mdx`);
    try {
      await fs.access(localePath);
      filePath = localePath;
    } catch {
      // Locale file not found — fall back to English silently.
    }
  }

  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  // Title comes from frontmatter first, then from the first H1 in the body.
  let title = (data.title as string) ?? "";
  let body = content.trim();

  if (!title) {
    const lines = body.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("# ")) {
        title = lines[i].replace(/^#\s+/, "").trim();
        lines.splice(i, 1);
        body = lines.join("\n").trim();
        break;
      }
    }
  }

  return { title: title || slug, body, data };
});

/** Shape of a single news item loaded from the news/ MDX directory. */
export interface NewsItem {
  /** URL-friendly slug derived from the filename, e.g. "2025-02-12-hurricane-season". */
  slug: string;
  /** Localised display date string from frontmatter, e.g. "Feb 12, 2025". */
  date: string;
  /** ISO date string used for sorting, e.g. "2025-02-12". */
  dateISO: string;
  /** Localised article title. */
  title: string;
  /** Short excerpt shown on the homepage card. */
  description: string;
  /** Full markdown body, available for a detail page in the future. */
  body: string;
}

/**
 * Loads all news items from src/content/news/, sorted newest-first.
 *
 * For each English base file (e.g. "2025-02-12-hurricane-season.mdx") the
 * function checks whether a locale-specific variant exists and reads that
 * instead, falling back to English gracefully.
 *
 * Results are memoised per locale for the lifetime of the React render.
 *
 * @param locale - BCP-47 locale string ("en", "fr", "ht", "es").
 * @param limit  - Maximum number of items to return (default 3).
 */
export const loadNewsItems = cache(async (locale?: string, limit = 3): Promise<NewsItem[]> => {
  let files: string[];
  try {
    files = await fs.readdir(newsDir);
  } catch {
    // Directory doesn't exist yet — return empty array instead of crashing.
    return [];
  }

  // Locale suffix pattern: ".fr.mdx", ".ht.mdx", ".es.mdx"
  const localePattern = /\.(fr|ht|es)\.mdx$/;

  // Only process base (English) files — locale variants are resolved per-item.
  const baseFiles = files
    .filter((f) => f.endsWith(".mdx") && !localePattern.test(f))
    .sort()
    .reverse(); // Date-prefixed filenames sort newest-first when reversed

  const items = await Promise.all(
    baseFiles.slice(0, limit).map(async (filename): Promise<NewsItem> => {
      const slug = filename.replace(/\.mdx$/, "");

      // Resolve locale-specific file, fall back to English base file.
      let filePath = path.join(newsDir, filename);
      if (locale && locale !== "en") {
        const localePath = path.join(newsDir, `${slug}.${locale}.mdx`);
        try {
          await fs.access(localePath);
          filePath = localePath;
        } catch {
          // Locale file not found — stay with English.
        }
      }

      const raw = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        date: (data.date as string) ?? "",
        dateISO: (data.dateISO as string) ?? "",
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        body: content.trim(),
      };
    })
  );

  return items;
});

/**
 * Loads a single news item by slug, with locale fallback.
 *
 * Wraps loadContent so callers get a typed NewsItem rather than the generic
 * ContentEntry. Returns null when the file does not exist so the detail page
 * can render a 404 instead of throwing.
 *
 * @param slug   - Filename without extension, e.g. "2025-02-12-hurricane-season".
 * @param locale - BCP-47 locale string ("en", "fr", "ht", "es").
 */
export const loadNewsItem = cache(async (slug: string, locale?: string): Promise<NewsItem | null> => {
  try {
    const entry = await loadContent(`news/${slug}`, locale);
    return {
      slug,
      date: (entry.data.date as string) ?? "",
      dateISO: (entry.data.dateISO as string) ?? "",
      title: entry.title,
      description: (entry.data.description as string) ?? "",
      body: entry.body,
    };
  } catch {
    return null;
  }
});

/**
 * Returns slugs for all English base news files — used by generateStaticParams
 * so Next.js can pre-render every news detail page at build time.
 */
export async function getNewsSlugs(): Promise<string[]> {
  let files: string[];
  try {
    files = await fs.readdir(newsDir);
  } catch {
    return [];
  }
  const localePattern = /\.(fr|ht|es)\.mdx$/;
  return files
    .filter((f) => f.endsWith(".mdx") && !localePattern.test(f))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort()
    .reverse();
}

/**
 * Returns the total number of published news articles (English base files only).
 * Cheap — only reads the directory listing, no file parsing.
 */
export async function getNewsCount(): Promise<number> {
  return (await getNewsSlugs()).length;
}

/**
 * Loads every news item from src/content/news/ for the /news index page.
 * Unlike loadNewsItems() there is no limit — all articles are returned newest-first.
 *
 * @param locale - BCP-47 locale string ("en", "fr", "ht", "es").
 */
export const loadAllNewsItems = cache(async (locale?: string): Promise<NewsItem[]> => {
  const slugs = await getNewsSlugs();
  return Promise.all(
    slugs.map(async (slug): Promise<NewsItem> => {
      const item = await loadNewsItem(slug, locale);
      // loadNewsItem only returns null for truly missing files; slugs come from
      // getNewsSlugs() so every file is guaranteed to exist.
      return item!;
    })
  );
});

/**
 * Renders a Markdown string to React elements using react-markdown.
 *
 * Applies project-consistent Tailwind typography classes to every element
 * so that content from MDX files renders with the same visual style as the
 * surrounding UI without requiring the @tailwindcss/typography plugin.
 */
export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold tracking-tight text-inherit mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-inherit mt-6 mb-3">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-inherit leading-relaxed text-lg mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc space-y-2 pl-6 text-inherit marker:text-blue-600 mb-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal space-y-2 pl-6 text-inherit mb-4">{children}</ol>
        ),
        li: ({ children }) => <li className="pl-1">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-brand-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
