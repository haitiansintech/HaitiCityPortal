/**
 * Locale-layout loading state — src/app/[locale]/loading.tsx
 *
 * Shown by Next.js while any page within the [locale] segment is streaming.
 * Renders a subtle full-page skeleton that matches the site's neutral palette
 * so the transition feels smooth rather than jarring.
 */

export default function LocaleLoading() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4"
      aria-label="Loading page content"
      role="status"
    >
      {/* Pulsing content skeleton */}
      <div className="w-full max-w-2xl space-y-4 animate-pulse">
        {/* Simulated h1 */}
        <div className="h-8 w-2/3 rounded-lg bg-neutral-200" />
        {/* Simulated subtitle */}
        <div className="h-4 w-1/2 rounded bg-neutral-200" />
        {/* Simulated body lines */}
        <div className="space-y-2 pt-4">
          <div className="h-3 w-full rounded bg-neutral-100" />
          <div className="h-3 w-11/12 rounded bg-neutral-100" />
          <div className="h-3 w-4/5 rounded bg-neutral-100" />
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
