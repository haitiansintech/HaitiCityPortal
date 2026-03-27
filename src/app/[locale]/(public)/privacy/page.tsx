import { loadContent, MarkdownRenderer } from "@/lib/content";
import { InfoLayout } from "@/components/layout/InfoLayout";

export const dynamic = "force-static";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const entry = await loadContent("privacy", locale);
  return (
    <InfoLayout title={entry.title}>
      <MarkdownRenderer content={entry.body} />
    </InfoLayout>
  );
}
