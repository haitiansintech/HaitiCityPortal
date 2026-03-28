import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { getTenantBySubdomain } from "@/lib/tenants";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, Clock, AlertTriangle, MapPin, MessageSquare } from "lucide-react";

export default async function ContactPage() {
  const headersList = await headers();
  const subdomain = headersList.get("x-tenant-subdomain") || "demo";
  const tenant = await getTenantBySubdomain(subdomain);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 py-10">
          <h1 className="text-4xl font-extrabold text-ink-primary tracking-tight">
            Contact {tenant?.name || "the Municipality"}
          </h1>
          <p className="mt-3 text-lg text-ink-secondary">
            We're here to help. Reach us by phone, email, or visit us in person.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 md:px-6 py-12 space-y-6">

        {/* Emergency Banner */}
        <div className="flex items-start gap-4 rounded-2xl bg-red-50 border border-red-200 p-6">
          <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-700 text-base">For emergencies</p>
            <p className="text-red-600 mt-1">
              Dial <span className="font-bold text-red-700">114</span> (Police) or{" "}
              <span className="font-bold text-red-700">116</span> (Medical) or contact your local emergency services.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 sm:grid-cols-2">

          {/* Phone */}
          <div className="flex items-start gap-4 rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 flex-shrink-0">
              <Phone className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="font-bold text-ink-primary text-base mb-1">Hotline</p>
              <a
                href="tel:129"
                className="text-2xl font-extrabold text-brand-blue hover:underline"
              >
                129
              </a>
              <p className="text-sm text-ink-secondary mt-1">24/7 emergency alerts & updates</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 flex-shrink-0">
              <Mail className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="font-bold text-ink-primary text-base mb-1">Email</p>
              <a
                href="mailto:info@haiticity.org"
                className="text-brand-blue font-semibold hover:underline break-all"
              >
                info@haiticity.org
              </a>
              <p className="text-sm text-ink-secondary mt-1">General inquiries & support</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex items-start gap-4 rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 flex-shrink-0">
              <Clock className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="font-bold text-ink-primary text-base mb-1">Office Hours</p>
              <p className="text-ink-primary font-semibold">Monday – Friday</p>
              <p className="text-ink-secondary text-sm">9:00 am – 5:00 pm</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4 rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 flex-shrink-0">
              <MapPin className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="font-bold text-ink-primary text-base mb-1">Mairie (City Hall)</p>
              <p className="text-ink-primary font-semibold">{tenant?.name || "Municipality"}</p>
              <p className="text-ink-secondary text-sm">Haiti</p>
            </div>
          </div>
        </div>

        {/* Report / Suggest CTA */}
        <div className="flex items-start gap-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 p-6">
          <MessageSquare className="h-6 w-6 text-brand-blue flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-ink-primary text-base">Have an issue to report?</p>
            <p className="text-ink-secondary mt-1 text-sm">
              Use the portal to report potholes, missed trash pickup, streetlight outages, and more — your report goes directly to the responsible official.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/report"
                className="inline-flex items-center rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-brand-blue/90 transition-colors"
              >
                Report an Issue
              </Link>
              <Link
                href="/officials"
                className="inline-flex items-center rounded-lg border border-brand-blue px-4 py-2 text-sm font-bold text-brand-blue hover:bg-brand-blue/5 transition-colors"
              >
                Contact an Official
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
