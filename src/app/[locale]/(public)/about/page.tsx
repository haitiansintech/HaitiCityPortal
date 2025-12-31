import { loadContent, MarkdownRenderer } from "@/lib/content";
import { InfoLayout } from "@/components/layout/InfoLayout";

export const dynamic = "force-static";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const entry = await loadContent("about", locale);
  return (
    <InfoLayout title={entry.title}>
      <MarkdownRenderer content={entry.body} />
    </InfoLayout>
  );
}
