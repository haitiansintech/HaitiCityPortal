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

export async function POST(request: Request) {
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

  const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true" || process.env.NODE_ENV !== "production";

  if (!enableLocalMode) {
    // Production integration would go here.
    return Response.json({ results: [] });
  }

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
