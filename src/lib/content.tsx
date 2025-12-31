import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

const contentDir = path.join(process.cwd(), "src/content");

export interface ContentEntry {
  title: string;
  body: string;
}

export const loadContent = cache(async (slug: string, locale?: string): Promise<ContentEntry> => {
  let filePath = path.join(contentDir, `${slug}.mdx`);

  if (locale && locale !== 'en') {
    const localePath = path.join(contentDir, `${slug}.${locale}.mdx`);
    try {
      await fs.access(localePath);
      filePath = localePath;
    } catch {
      // Fallback to default English file
    }
  }

  const raw = await fs.readFile(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  let title = "";
  const bodyLines: string[] = [];

  for (const line of lines) {
    if (!title && line.startsWith("# ")) {
      title = line.replace(/^#\s+/, "").trim();
      continue;
    }
    bodyLines.push(line);
  }

  return { title: title || slug, body: bodyLines.join("\n").trim() };
});

type MarkdownNode =
  | { type: "heading"; level: number; content: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] };

function parseMarkdown(content: string): MarkdownNode[] {
  const lines = content.split(/\r?\n/);
  const nodes: MarkdownNode[] = [];
  let listBuffer: string[] = [];

  function flushList() {
    if (listBuffer.length > 0) {
      nodes.push({ type: "list", items: listBuffer });
      listBuffer = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    if (/^##\s+/.test(trimmed)) {
      flushList();
      nodes.push({ type: "heading", level: 2, content: trimmed.replace(/^##\s+/, "").trim() });
      continue;
    }
    if (/^#\s+/.test(trimmed)) {
      flushList();
      nodes.push({ type: "heading", level: 1, content: trimmed.replace(/^#\s+/, "").trim() });
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      listBuffer.push(trimmed.replace(/^[-*]\s+/, "").trim());
      continue;
    }
    flushList();
    nodes.push({ type: "paragraph", content: trimmed });
  }

  flushList();
  return nodes;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const nodes = parseMarkdown(content);
  return (
    <div className="space-y-6">
      {nodes.map((node, index) => {
        if (node.type === "heading") {
          const Tag = (`h${Math.min(node.level, 3)}` as unknown) as keyof JSX.IntrinsicElements;
          const isChanges = node.content.toLowerCase().includes("changes");
          return (
            <Tag key={index} className={`font-bold tracking-tight text-inherit ${node.level === 1 ? 'text-4xl mb-6' : 'text-2xl mt-8 mb-4'}`}>
              {node.content}
            </Tag>
          );
        }
        if (node.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6 text-inherit marker:text-blue-600">
              {node.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1">{item}</li>
              ))}
            </ul>
          );
        }

        // Simple heuristic for "Changes" box or important notes
        // If it follows a "Changes" header (not tracked here easily without state) specifically, or maybe we just check content.
        // For now, let's keep it simple text-inherit.
        // Detect "Changes" box logic loosely based on content or if we had a previous header state.
        // Since we don't have state here, let's just render the paragraph.
        // However, the user asked to Highlight the final "Changes" clause.
        // Let's check if the content starts with specific phrase.
        const isUpdateNotice = node.content.toLowerCase().startsWith("we may update");

        if (isUpdateNotice) {
          return (
            <div key={index} className="mt-6 p-6 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 font-medium">
              <p>{node.content}</p>
            </div>
          )
        }

        return (
          <p key={index} className="text-inherit leading-relaxed text-lg">
            {node.content}
          </p>
        );
      })}
    </div>
  );
}
