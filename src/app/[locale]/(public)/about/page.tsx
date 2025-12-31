import { loadContent, MarkdownRenderer } from "@/lib/content";
import { InfoLayout } from "@/components/layout/InfoLayout";

export const dynamic = "force-static";

export default async function AboutPage() {
  const entry = await loadContent("about");
  return (
    <InfoLayout title={entry.title}>
      <MarkdownRenderer content={entry.body} />
    </InfoLayout>
  );
}
