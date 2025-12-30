import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const commonServices = [
  {
    href: "/services/certificates",
    label: "Birth Certificates",
    description: "Request or verify birth certificates online.",
    icon: "📄",
  },
  {
    href: "/services/trash",
    label: "Trash Pickup",
    description: "Schedule pickup or report missed collection.",
    icon: "🗑️",
  },
  {
    href: "/services/permits",
    label: "Business Permits",
    description: "Apply for or renew business licenses.",
    icon: "🏪",
  },
  {
    href: "/tax/lookup",
    label: "Pay Property Tax",
    description: "Look up and pay your property tax online.",
    icon: "💰",
  },
  {
    href: "/issues/new",
    label: "Report an Issue",
    description: "Report potholes, streetlights, or other problems.",
    icon: "⚠️",
  },
  {
    href: "/events",
    label: "Community Events",
    description: "Find town halls, clinics, and local meetings.",
    icon: "📅",
  },
];

const announcements = [
  {
    id: 1,
    title: "Hurricane season readiness webinars",
    href: "/events",
    date: "Feb 12, 2025",
    summary: "Weekly preparedness sessions with emergency management leaders.",
  },
  {
    id: 2,
    title: "New sanitation pick-up pilot in Carrefour",
    href: "/issues",
    date: "Jan 28, 2025",
    summary: "Track pilot progress and report feedback directly in the portal.",
  },
  {
    id: 3,
    title: "Community grant applications due March 15",
    href: "/data",
    date: "Jan 15, 2025",
    summary: "Download the grant data pack and submit proposals digitally.",
  },
];

const stats = [
  { label: "Problems solved", value: "1,248" },
  { label: "Datasets online", value: "86" },
  { label: "Volunteer hours", value: "32K" },
  { label: "Neighborhood partners", value: "54" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Strict Semantic Layout */}
      <section className="bg-white border-b border-gray-200">
        <div className="container flex flex-col md:flex-row gap-8 items-center py-12 md:py-16">

          {/* Left Column: Text & Actions */}
          <div className="flex flex-1 flex-col items-start space-y-6 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue">
              One City, One Community
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl leading-tight">
              Make your city better, together.
            </h1>
            <p className="text-lg text-ink leading-relaxed max-w-2xl">
              Whether you live down the street or love Haiti from abroad, this is your place to connect, support, and build.
            </p>

            {/* Unified Primary Actions - Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/issues/new">Report an Issue</Link>
              </Button>
              <Button asChild variant="destructive" size="lg" className="h-12 px-8 text-base">
                <Link href="/sponsor">Sponsor a Project</Link>
              </Button>
            </div>

            {/* Community Impact Ticker */}
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-100 bg-canvas p-4 w-full max-w-md">
              <span className="text-2xl">🇭🇹</span>
              <div>
                <span className="block text-xs font-bold uppercase text-gray-500">Community Impact</span>
                <p className="text-sm font-medium text-ink">
                  <span className="text-action-red font-bold">12 potholes fixed</span> & <span className="text-action-red font-bold">3 streetlights restored</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Illustration */}
          <div className="flex justify-center md:justify-end flex-1">
            <Image
              src="/hero_community_illustration_1766494590343.png"
              alt="Vibrant Haitian community illustration"
              width={600}
              height={400}
              className="w-full max-w-lg h-auto drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Common Services - Semantic Grid */}
      <section className="bg-canvas border-y border-gray-200 py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-left">
            <h2 className="text-3xl font-bold text-ink">Common Services</h2>
            <p className="mt-2 text-lg text-gray-600">Access the most requested municipal services.</p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {commonServices.map((service) => (
              <Link key={service.href} href={service.href} className="h-full block group">
                <Card className="h-full transition-all duration-200 hover:border-brand-blue hover:shadow-md">
                  <CardHeader>
                    <div className="mb-4 text-4xl">{service.icon}</div>
                    <CardTitle className="text-xl font-bold text-ink-primary">
                      {service.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600">
                      {service.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm font-bold text-brand-blue flex items-center gap-1 group-hover:underline">
                      Get Started <span>→</span>
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-4 border-brand-blue pl-4">
              <p className="text-4xl font-extrabold text-ink">{stat.value}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements - Semantic Grid */}
      <section className="bg-white pb-20 pt-8">
        <div className="container">
          <div className="mb-10 text-left">
            <h2 className="text-3xl font-bold text-ink">Recent Updates</h2>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
                    {announcement.date}
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    <Link href={announcement.href} className="hover:text-brand-blue transition-colors">
                      {announcement.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-neutral-600">
                    {announcement.summary}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild className="p-0 h-auto font-bold text-brand-blue">
                    <Link href={announcement.href}>Read more →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
