/**
 * POST /api/tax/lookup
 *
 * Mock tax lookup endpoint.
 *
 * NOTE: This endpoint is NOT yet connected to a real tax system or the
 * Direction Générale des Impôts (DGI) API. It exists as a functional
 * placeholder that demonstrates the lookup UX and allows front-end
 * development to proceed independently of backend integrations.
 *
 * When ENABLE_LOCAL_MODE is active (all non-production environments by
 * default), the endpoint searches the hardcoded `sampleBills` array and
 * returns matching records. In production (when ENABLE_LOCAL_MODE is not
 * set), the handler returns an empty result set until the real integration
 * is implemented.
 *
 * Accepted body shape:
 *   { searchType: "parcel" | "nif", query: string }
 */

/**
 * Placeholder tax bill records for local development and demos.
 *
 * These are fictional but realistic-looking entries covering common Haitian
 * parcel ID and NIF (Numéro d'Identification Fiscale) formats. They are used
 * exclusively when ENABLE_LOCAL_MODE is active and are never stored in or
 * read from the database.
 */
const sampleBills = [
  {
    id: "HT-BILL-2025-0001",
    parcelId: "PAP-2025-00123",
    nif: "001-234-567-8",
    ownerName: "Marie Jean",
    amountDue: 245.75,
    dueDate: "2025-03-31",
  },
  {
    id: "HT-BILL-2025-0002",
    parcelId: "PAP-2025-00456",
    nif: "009-876-543-2",
    ownerName: "Jacques Pierre",
    amountDue: 687.5,
    dueDate: "2025-04-15",
  },
  {
    id: "HT-BILL-2025-0003",
    parcelId: "CAP-2024-00012",
    nif: "004-111-999-3",
    ownerName: "Assocation Nou Tout",
    amountDue: 1200,
    dueDate: "2025-02-28",
  },
];

import { limiters } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { ok, retryAfter } = limiters.search(ip);
  if (!ok) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const payload = (await request.json().catch(() => null)) as
    | { searchType?: string; query?: string }
    | null;

  if (!payload || !payload.query || !payload.searchType) {
    return Response.json({ error: "Missing search parameters." }, { status: 400 });
  }

  const { searchType, query } = payload;
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return Response.json({ error: "Missing search value." }, { status: 400 });
  }

  // ENABLE_LOCAL_MODE gates whether the mock data or the (future) real
  // integration is used. In all non-production environments this defaults to
  // true so developers can test the lookup flow without a live tax system.
  const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true" || process.env.NODE_ENV !== "production";

  if (!enableLocalMode) {
    // Production integration would go here.
    return Response.json({ results: [] });
  }

  // searchType determines which field to match against:
  //   "parcel" — looks up by parcel number (cadastral ID assigned by the mairie)
  //   "nif"    — looks up by NIF (Numéro d'Identification Fiscale, the national
  //              taxpayer ID issued by the Direction Générale des Impôts)
  const results = sampleBills.filter((bill) => {
    if (searchType === "parcel") {
      return bill.parcelId.toLowerCase().includes(normalizedQuery);
    }
    if (searchType === "nif") {
      return bill.nif.toLowerCase().includes(normalizedQuery);
    }
    return false;
  });

  return Response.json({ results });
}
