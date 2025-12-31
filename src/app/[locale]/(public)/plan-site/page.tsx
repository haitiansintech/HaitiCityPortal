import HtmlSitemap from "@/components/ui/HtmlSitemap";

export const metadata = {
    title: "Sitemap | Haiti City Portal",
    description: "Complete list of pages and services on the portal.",
};

export default function SitemapPage() {
    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 border-b border-gray-100 pb-6">
                    <h1 className="text-3xl font-black text-ink-primary mb-2">Plan Sit la (Sitemap)</h1>
                    <p className="text-ink-secondary mb-4">
                        A simple, text-based overview of all sections for quick access.
                    </p>
                    <a
                        href="https://github.com/haitiansintech/HaitiCityPortal/issues/new?template=bug_report.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-red-600 hover:text-red-700 underline"
                    >
                        Report a Bug / Signale yon Pwoblèm Teknik
                    </a>
                </header>
                <HtmlSitemap />
            </div>
        </div>
    );
}
