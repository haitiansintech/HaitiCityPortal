"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center sm:px-6">
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-widest text-rose-600">Something went wrong</p>
        <h1 className="text-4xl font-bold text-gray-900">We hit a snag</h1>
        <p className="text-base text-gray-600">
          An unexpected error occurred. Try reloading the page or returning to the previous screen.
        </p>
      </div>
      <Button onClick={reset} className="rounded-full bg-sky-600 text-white hover:bg-sky-700">
        Try again
      </Button>
    </div>
  );
}
