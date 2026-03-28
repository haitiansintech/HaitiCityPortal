import { loadContent, MarkdownRenderer } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react";

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entry = await loadContent("services/governance", locale);
  const { title, intro, footer_quote, footer_cta_text, footer_cta_button } = entry.data as {
    title: string;
    intro: string;
    footer_quote: string;
    footer_cta_text: string;
    footer_cta_button: string;
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-blue to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-white/70" />
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
              Governance Guide
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{title}</h1>
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed">{intro}</p>
        </div>
      </div>

      {/* MDX body — sections with H2/H3/lists rendered by MarkdownRenderer */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <MarkdownRenderer content={entry.body} />
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 text-white py-12 px-4 text-center">
        <p className="text-2xl font-bold italic mb-6">{footer_quote}</p>
        <p className="text-white/70 max-w-xl mx-auto mb-8">{footer_cta_text}</p>
        <Button asChild size="lg" className="bg-brand-blue hover:bg-action-hover text-white rounded-xl">
          <Link href={"/officials" as any}>
            <Users className="h-5 w-5 mr-2" />
            {footer_cta_button}
          </Link>
        </Button>
      </div>
    </div>
  );
}
