import { loadContent } from "@/lib/content";
import { Info } from "lucide-react";

export default async function NationalIDPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entry = await loadContent("services/national-id", locale);
  const { title, description, coming_soon } = entry.data as {
    title: string;
    description: string;
    coming_soon: string;
  };

  return (
    <div className="min-h-screen bg-canvas py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Info className="h-16 w-16 text-brand-blue mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-ink-primary mb-4">{title}</h1>
        <p className="text-ink-secondary mb-8">{description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <p className="text-blue-800 font-medium text-lg">{coming_soon}</p>
          <p className="text-blue-600 mt-2 font-bold">Byento / Bientôt / Coming Soon</p>
        </div>
      </div>
    </div>
  );
}
