export const dynamic = "force-static";

export async function GET() {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Haiti City Portal//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:sample-1@haiticityportal",
    `DTSTAMP:${timestamp}`,
    "SUMMARY:Town Hall Meeting",
    "DTSTART:20251101T230000Z",
    "DTEND:20251102T000000Z",
    "LOCATION:City Hall",
    "DESCRIPTION:Sample event exported from Haiti City Portal",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=haiti-city-events.ics",
    },
  });
}
