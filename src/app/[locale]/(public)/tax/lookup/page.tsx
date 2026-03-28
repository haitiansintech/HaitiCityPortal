"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LookupResult {
  id: string;
  parcelId: string;
  nif: string;
  ownerName: string;
  amountDue: number;
  dueDate: string;
}

type SearchType = "parcel" | "nif";

export default function TaxLookupPage() {
  const [searchType, setSearchType] = useState<SearchType>("parcel");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LookupResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResults([]);

    if (!query.trim()) {
      setError("Enter a Parcel ID or NIF to search.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/tax/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchType, query: query.trim() }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? "Unable to search right now.");
      }
      const payload = (await response.json()) as { results: LookupResult[] };
      setResults(payload.results);
      if (payload.results.length === 0) {
        setError("No bills found for that identifier.");
      }
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : "Unable to search right now.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      {/* Page header */}
      <div className="mb-8 space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">Property Tax Lookup</h1>
        <p className="text-base text-gray-600">
          Search by parcel number or taxpayer identification (NIF) to view outstanding property tax bills. Results link to bill details.
        </p>
      </div>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <fieldset>
          <legend className="text-sm font-semibold text-gray-900">Search type</legend>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="parcel"
                checked={searchType === "parcel"}
                onChange={() => setSearchType("parcel")}
                className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              Parcel ID
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="nif"
                checked={searchType === "nif"}
                onChange={() => setSearchType("nif")}
                className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              NIF
            </label>
          </div>
        </fieldset>

        <div className="space-y-2">
          <label htmlFor="query" className="text-sm font-semibold text-gray-900">
            {searchType === "parcel" ? "Parcel ID" : "NIF"}
          </label>
          <Input
            id="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchType === "parcel" ? "e.g., PAP-2025-00123" : "e.g., 001-234-567-8"}
            aria-describedby="lookup-help"
            required
          />
          <p id="lookup-help" className="text-xs text-gray-500">
            Search accepts numbers and hyphens. Example parcel IDs look like PAP-2025-00123.
          </p>
        </div>

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-sky-600 text-white hover:bg-sky-700"
          >
            {isLoading ? "Searching…" : "Search"}
          </Button>
        </div>

        {error && (
          <p className="text-sm font-medium text-rose-600">{error}</p>
        )}
      </form>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Results</h2>
          <ul className="space-y-3">
            {results.map((bill) => (
              <li
                key={bill.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{bill.ownerName}</h3>
                    <p className="text-sm text-gray-500">
                      Parcel {bill.parcelId} · NIF {bill.nif}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Due {new Date(bill.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-xl font-bold text-sky-700">
                      {bill.amountDue.toLocaleString(undefined, { style: "currency", currency: "USD" })}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/tax/bill/${bill.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  View bill details
                  <svg
                    aria-hidden
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 21 10.5l-3.75 3.75M21 10.5H3" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
