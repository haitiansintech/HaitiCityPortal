import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { loadNewsItem, getNewsSlugs, MarkdownRenderer } from "@/lib/content";
import { Calendar, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tCommon = await getTranslations("Common");

  const item = await loadNewsItem(slug, locale);
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto max-w-3xl px-4 md:px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {tCommon("backToHome")}
          </Link>

          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ink-secondary mb-4">
            <Calendar className="h-4 w-4" />
            {item.date}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-primary leading-tight">
            {item.title}
          </h1>

          {item.description && (
            <p className="mt-4 text-lg text-ink-secondary leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Article Body */}
      <div className="container mx-auto max-w-3xl px-4 md:px-6 py-12">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 md:p-12 text-ink-primary">
          {item.body ? (
            <MarkdownRenderer content={item.body} />
          ) : (
            <p className="text-ink-secondary italic">No additional content available.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {tCommon("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
