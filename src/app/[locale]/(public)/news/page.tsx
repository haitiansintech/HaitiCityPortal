import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { loadAllNewsItems } from "@/lib/content";
import { Calendar, ArrowRight } from "lucide-react";

export default async function NewsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("HomePage.news");
  const tCommon = await getTranslations("Common");

  const items = await loadAllNewsItems(locale);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline mb-6"
          >
            ← {tCommon("backToHome")}
          </Link>
          <h1 className="text-4xl font-extrabold text-ink-primary tracking-tight">
            {t("title")}
          </h1>
        </div>
      </div>

      {/* Article List */}
      <div className="container mx-auto max-w-5xl px-4 md:px-6 py-12">
        {items.length === 0 ? (
          <p className="text-ink-secondary text-lg">No updates yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}` as any}
                className="group flex flex-col sm:flex-row items-start gap-6 rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm hover:border-brand-blue/50 hover:shadow-md transition-all"
              >
                {/* Date badge */}
                <div className="flex-shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-secondary whitespace-nowrap pt-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-ink-primary group-hover:text-brand-blue group-hover:underline mb-2">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-ink-secondary leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 self-center text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
