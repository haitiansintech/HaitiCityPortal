import { loadContent } from "@/lib/content";
import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { AlertTriangle } from "lucide-react";

export default async function CleanupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entry = await loadContent("services/cleanup", locale);
  const { title, description, steps, documents, fees, reports_title, reports_description, reports_button } =
    entry.data as {
      title: string;
      description: string;
      steps: string[];
      documents: string[];
      fees: string;
      reports_title: string;
      reports_description: string;
      reports_button: string;
    };

  return (
    <ServiceInfoPage
      title={title}
      description={description}
      steps={steps}
      documents={documents}
      fees={fees}
      secondaryAction={
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {reports_title}
          </h3>
          <p className="text-sm text-orange-700 mb-4">{reports_description}</p>
          <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
            <Link href={"/report" as any}>{reports_button}</Link>
          </Button>
        </div>
      }
    />
  );
}
