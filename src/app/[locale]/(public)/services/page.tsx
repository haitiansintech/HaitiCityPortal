import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
  FileText,
  Trash2,
  Store,
  CreditCard,
  AlertTriangle,
  Calendar,
  ArrowRight,
  MapPin,
  Info,
  Users,
  Banknote,
  Gavel,
  ShieldCheck
} from "lucide-react";

export const metadata = {
  title: "City Services | Haiti City Portal",
  description: "Browse all available municipal services and information.",
};

export default function ServicesPage() {
  const categories = [
    {
      title: "Civic Documents",
      services: [
        { title: "Birth Certificates", icon: <FileText className="h-6 w-6" />, href: "/services/birth-certificates", description: "Request extracts from the National Archives." },
        { title: "National ID Info", icon: <Users className="h-6 w-6" />, href: "#", description: "Guidance on CIN and administrative IDs." }
      ]
    },
    {
      title: "Sanitation & Infrastructure",
      services: [
        { title: "Trash & Sanitation", icon: <Trash2 className="h-6 w-6" />, href: "/services/trash", description: "Pickup schedules and special requests." },
        { title: "Construction Permits", icon: <Store className="h-6 w-6" />, href: "/services/permits", description: "Apply for building and structural permits." },
        { title: "Report an Issue", icon: <AlertTriangle className="h-6 w-6" />, href: "/report", description: "Potholes, lighting, and public safety." }
      ]
    },
    {
      title: "Government & Leadership",
      services: [
        { title: "Meet Your Officials", icon: <Users className="h-6 w-6" />, href: "/officials", description: "Contact your CASEC, ASEC, and Mayor." },
        { title: "Governance Guide", icon: <ShieldCheck className="h-6 w-6" />, href: "/services/governance", description: "Understand how local elective bodies work." },
        { title: "City Council", icon: <Gavel className="h-6 w-6" />, href: "#", description: "Meeting minutes and municipal decrees." }
      ]
    },
    {
      title: "Payments & Finance",
      services: [
        { title: "Pay Taxes & Fees", icon: <CreditCard className="h-6 w-6" />, href: "/pay", description: "Property tax, business fees, and fines." },
        { title: "Service Status", icon: <Info className="h-6 w-6" />, href: "/tax/lookup", description: "Track your payments and quittances." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-canvas py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <header className="mb-16">
          <h1 className="text-4xl font-extrabold text-ink-primary mb-4 tracking-tight">Municipal Services</h1>
          <p className="text-xl text-ink-secondary max-w-2xl">
            Access city services, pay taxes, and connect with your government representatives all in one place.
          </p>
        </header>

        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category.title}>
              <h2 className="text-2xl font-bold text-ink-primary mb-8 border-b-2 border-brand-blue/20 pb-2 inline-block">
                {category.title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service) => (
                  <Link key={service.title} href={service.href} className="group">
                    <Card className="h-full border-weak hover:border-brand-blue/50 transition-all hover:shadow-md bg-white">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                          {service.icon}
                        </div>
                        <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-ink-secondary">{service.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <span className="text-xs font-bold text-brand-blue flex items-center gap-1 group-hover:underline">
                          View Details <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
