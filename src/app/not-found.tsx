import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center sm:px-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">404</p>
        <h1 className="text-4xl font-semibold text-white">Page not found</h1>
        <p className="text-sm text-slate-300">
          The page you are looking for has moved or no longer exists. Use the navigation above or return to the landing page.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        Go back home
      </Link>
    </div>
  );
}
