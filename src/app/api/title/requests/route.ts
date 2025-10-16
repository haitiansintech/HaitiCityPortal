export async function POST(request: Request) {
  await request.json().catch(() => null);
  return Response.json({ reference: "HT-REQ-2025-0001" });
}
