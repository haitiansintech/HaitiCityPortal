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
