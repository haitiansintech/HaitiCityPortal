import { loadContent } from "@/lib/content";
import ServiceInfoPage from "@/components/ui/ServiceInfoPage";
import TowingLookup from "@/components/services/TowingLookup";

export default async function TowingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entry = await loadContent("services/towing", locale);
  const { title, description, steps, documents, fees } = entry.data as {
    title: string;
    description: string;
    steps: string[];
    documents: string[];
    fees: string;
  };

  return (
    <ServiceInfoPage
      title={title}
      description={description}
      steps={steps}
      documents={documents}
      fees={fees}
      secondaryAction={<TowingLookup />}
    />
  );
}
