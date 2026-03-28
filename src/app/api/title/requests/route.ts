import { limiters } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { ok, retryAfter } = limiters.form(ip);
  if (!ok) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  await request.json().catch(() => null);
  return Response.json({ reference: "HT-REQ-2025-0001" });
}
