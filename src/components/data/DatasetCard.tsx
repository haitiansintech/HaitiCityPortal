import Link from "next/link";

interface DatasetCardProps {
  title: string;
  category: string;
  description?: string;
  downloadUrl?: string;
}

export function DatasetCard({ title, category, description, downloadUrl }: DatasetCardProps) {
  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-400/20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-orange-400/10 opacity-0 transition group-hover:opacity-100" aria-hidden />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-cyan-200">
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            {category}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 ring-1 ring-white/10">
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25h17.25M3 9h13.5M3 12.75h17.25M3 16.5h9" />
            </svg>
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
        {description && <p className="mt-3 text-sm text-slate-300">{description}</p>}
      </div>
      {downloadUrl ? (
        <Link
          href={downloadUrl}
          className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
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
        <p className="relative mt-6 text-sm text-slate-400">Download coming soon.</p>
      )}
    </article>
  );
}
