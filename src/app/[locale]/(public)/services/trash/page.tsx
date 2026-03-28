import { loadContent } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default async function TrashPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Load MDX content as the source of truth for this page
  const entry = await loadContent("services/trash", locale);
  const { steps, reports_title, reports_description, reports_button } = entry.data as {
    steps: string[];
    reports_title: string;
    reports_description: string;
    reports_button: string;
  };

  return (
    <div className="min-h-screen bg-canvas py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-ink-primary mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-brand-blue" />
            How It Works
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-weak shadow-sm space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-brand-blue font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-ink-secondary pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Report missed pickup */}
        <section className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {reports_title}
          </h3>
          <p className="text-sm text-orange-700 mb-4">{reports_description}</p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
            <Link href={"/report" as any}>{reports_button}</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
