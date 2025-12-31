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
import {
  FileText,
  Trash2,
  Store,
  CreditCard,
  AlertTriangle,
  Calendar,
  ArrowRight,
  MapPin,
  Phone,
  Info
} from "lucide-react";

export default function Home() {
  const commonServices = [
    {
      icon: <FileText className="h-10 w-10 text-brand-blue" />,
      title: "Birth Certificates",
      description: "Request or verify birth certificates online.",
      link: "/services/birth-certificates"
    },
    {
      icon: <Trash2 className="h-10 w-10 text-brand-blue" />,
      title: "Trash Pickup",
      description: "Schedule pickup or report missed collection.",
      link: "/services/trash"
    },
    {
      icon: <Store className="h-10 w-10 text-brand-blue" />,
      title: "Business Permits",
      description: "Apply for or renew business licenses.",
      link: "/services/permits"
    },
    {
      icon: <CreditCard className="h-10 w-10 text-brand-blue" />,
      title: "Pay Property Tax",
      description: "Look up and pay your property tax online.",
      link: "/tax/lookup"
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-brand-blue" />,
      title: "Report an Issue",
      description: "Report potholes, streetlights, or other problems.",
      link: "/issues/new"
    },
    {
      icon: <Calendar className="h-10 w-10 text-brand-blue" />,
      title: "Community Events",
      description: "Find town halls, clinics, and local meetings.",
      link: "/events"
    },
  ];

  const quickActions = [
    { label: "Report Pothole", icon: <MapPin className="h-5 w-5" />, href: "/issues/new" },
    { label: "Pay Parking Ticket", icon: <CreditCard className="h-5 w-5" />, href: "/services/parking" },
    { label: "Trash Schedule", icon: <Trash2 className="h-5 w-5" />, href: "/services/trash" },
    { label: "Emergency Alerts", icon: <Phone className="h-5 w-5" />, href: "/alerts" },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION (Full Width) */}
      <section className="relative w-full bg-brand-blue/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-blue shadow-sm border border-brand-blue/20">
              ONE CITY, ONE COMMUNITY
            </div>
            <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-ink-primary md:text-6xl lg:text-7xl">
              Welcome to the <br />
              <span className="text-brand-blue">Haiti City Portal</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-ink-secondary md:text-xl">
              Connect with your local government, access services, and help build a stronger community—whether you're here at home or supporting from abroad.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-lg font-semibold shadow-lg">
                Report an Issue
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg bg-white">
                Sponsor a Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTION BAR (Boston Style - High Contrast) */}
      <section className="w-full bg-brand-blue py-8 border-y border-brand-blue">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-white/10 p-4 text-white transition-colors hover:bg-white/20"
              >
                {action.icon}
                <span className="font-semibold">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES (Grid) */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex items-center justify-between border-b-4 border-brand-blue pb-4">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-ink-primary">
              Featured Services
            </h2>
            <Link href="/services" className="hidden text-brand-blue hover:underline font-semibold md:block">
              View All Services →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commonServices.map((service, index) => (
              <Link key={index} href={service.link} className="group block h-full">
                <Card className="h-full border-2 border-neutral-100 transition-all group-hover:border-brand-blue/50 group-hover:shadow-md">
                  <CardHeader>
                    <div className="mb-4 inline-flex rounded-lg bg-brand-blue/10 p-3 group-hover:bg-brand-blue/20">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-ink-primary group-hover:text-brand-blue">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ink-secondary">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <span className="flex items-center text-sm font-bold text-brand-blue uppercase tracking-wider group-hover:underline">
                      Get Started <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">View All Services</Button>
          </div>
        </div>
      </section>

      {/* 4. LATEST UPDATES (News) */}
      <section className="w-full bg-neutral-100 py-16 md:py-24 border-t border-neutral-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 border-b-4 border-neutral-300 pb-4">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-ink-primary">
              Recent Updates
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { date: "Feb 12, 2025", title: "Hurricane season readiness webinars", desc: "Weekly preparedness sessions with emergency management leaders." },
              { date: "Jan 28, 2025", title: "New sanitation pick-up pilot in Carrefour", desc: "Track pilot progress and report feedback directly in the portal." },
              { date: "Jan 15, 2025", title: "Community grant applications due March 15", desc: "Download the grant data pack and submit proposals digitally." }
            ].map((news, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg bg-white p-6 shadow-sm border border-neutral-200 hover:border-brand-blue/50">
                <span className="text-sm font-bold uppercase text-ink-secondary tracking-widest">{news.date}</span>
                <h3 className="text-xl font-bold text-brand-blue hover:underline cursor-pointer">
                  {news.title}
                </h3>
                <p className="text-ink-secondary">{news.desc}</p>
                <div className="mt-auto pt-4">
                  <span className="text-sm font-semibold text-brand-blue cursor-pointer hover:underline">Read more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
