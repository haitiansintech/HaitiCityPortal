"use client";

/**
 * Locale-scoped error boundary — src/app/[locale]/error.tsx
 *
 * Catches unhandled errors thrown in any page within the [locale] layout.
 * Rendered client-side by Next.js when an error propagates past a page's own
 * try/catch. Provides a reset button so users can retry without a full reload.
 */

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LocaleError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error reporting service in production (e.g. Sentry)
    console.error("[LocaleError]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>

      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        Something went wrong
      </h1>
      <p className="mb-8 max-w-md text-base text-gray-600">
        An unexpected error occurred. You can try again or return to the
        homepage.
        {error.digest && (
          <span className="mt-2 block text-xs text-gray-400">
            Error ID: {error.digest}
          </span>
        )}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-full bg-sky-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-sky-700 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-gray-300 px-6 py-2.5 text-sm font-bold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
