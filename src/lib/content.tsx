import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

const contentDir = path.join(process.cwd(), "src/content");

export interface ContentEntry {
  title: string;
  body: string;
}

export const loadContent = cache(async (slug: string): Promise<ContentEntry> => {
  const filePath = path.join(contentDir, `${slug}.mdx`);
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
          return (
            <Tag key={index} className="text-2xl font-semibold text-white">
              {node.content}
            </Tag>
          );
        }
        if (node.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6 text-slate-300">
              {node.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="text-slate-300">
            {node.content}
          </p>
        );
      })}
    </div>
  );
}
