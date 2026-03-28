import { loadContent } from "@/lib/content";
import ServiceInfoPage from "@/components/ui/ServiceInfoPage";

export default async function BirthCertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entry = await loadContent("services/birth-certificates", locale);
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
      payLink="/pay"
    />
  );
}
