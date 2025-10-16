import Link from "next/link";

interface DatasetCardProps {
  title: string;
  category: string;
  description?: string;
  downloadUrl?: string;
}

export function DatasetCard({ title, category, description, downloadUrl }: DatasetCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow">
      <div>
        <p className="text-xs uppercase tracking-wide text-emerald-300">{category}</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
        {description && <p className="mt-3 text-sm text-slate-300">{description}</p>}
      </div>
      {downloadUrl ? (
        <Link
          href={downloadUrl}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Download dataset
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 12 12 16.5 16.5 12m-4.5 4.5V3" />
          </svg>
        </Link>
      ) : (
        <p className="mt-6 text-sm text-slate-400">Download coming soon.</p>
      )}
    </article>
  );
}
