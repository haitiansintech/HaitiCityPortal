import { loadContent } from "@/lib/content";
import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";

export default async function CulturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entry = await loadContent("services/culture", locale);
  const { title, description, steps, documents, fees, youtube_title, youtube_description, youtube_button } =
    entry.data as {
      title: string;
      description: string;
      steps: string[];
      documents: string[];
      fees: string;
      youtube_title: string;
      youtube_description: string;
      youtube_button: string;
    };

  return (
    <ServiceInfoPage
      title={title}
      description={description}
      steps={steps}
      documents={documents}
      fees={fees}
      secondaryAction={
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center gap-2">
            <Youtube className="h-5 w-5" />
            {youtube_title}
          </h3>
          <p className="text-sm text-red-700 mb-4">{youtube_description}</p>
          <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              {youtube_button}
            </a>
          </Button>
        </div>
      }
    />
  );
}
