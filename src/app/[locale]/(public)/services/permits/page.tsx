import { loadContent } from "@/lib/content";
import { CheckCircle2, FileText } from "lucide-react";

export default async function PermitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const entry = await loadContent("services/permits", locale);
  const { steps, req_id, req_address, req_quittance, req_articles } = entry.data as {
    steps: string[];
    req_id: string;
    req_address: string;
    req_quittance: string;
    req_articles: string;
  };

  return (
    <div className="min-h-screen bg-canvas py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-ink-primary mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-brand-blue" />
            How to Apply
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

        {/* Requirements */}
        <section>
          <h2 className="text-2xl font-semibold text-ink-primary mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-brand-blue" />
            Required Documents
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-weak shadow-sm">
            <ul className="space-y-3">
              {[req_id, req_address, req_quittance, req_articles].map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-ink-secondary">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
