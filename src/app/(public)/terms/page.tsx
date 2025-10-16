import { loadContent, MarkdownRenderer } from "@/lib/content";

export const dynamic = "force-static";

export default async function TermsPage() {
  const entry = await loadContent("terms");
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-white">{entry.title}</h1>
      <div className="mt-6">
        <MarkdownRenderer content={entry.body} />
      </div>
    </div>
  );
}
