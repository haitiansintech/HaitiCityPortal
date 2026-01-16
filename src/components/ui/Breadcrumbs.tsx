"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
    "services": "Services",
    "directory": "Directory",
    "plan-site": "Plan Sit la",
    "donate": "Donate",
    "transparency": "Transparency",
    "officials": "Officials",
    "report": "Report Issue",
    "pay": "Payments",
    "admin": "Dashboard",
    "handbook": "Municipal Handbook",
    "field-reports": "Field Reports",
    "emergency": "Crisis Center",
    "finance": "Finance",
    "audit-review": "Audit Review",
    "about": "About Us",
    "contact": "Contact",
    "events": "Events",
    "terms": "Terms",
    "privacy": "Privacy",
    "data": "Open Data",
};

export function Breadcrumbs() {
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);

    // Generate crumbs
    const crumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(1, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        // Simple title case for unknown segments, or lookup from map
        let label = routeLabels[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

        // Truncate long IDs
        if (label.length > 20 && /\d/.test(label)) {
            label = `${label.substring(0, 8)}...`;
        }

        return { href, label, isLast };
    });

    // JSON-LD Schema
    const breadcrumbListSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": process.env.NEXT_PUBLIC_BASE_URL || "https://haiticityportal.com"
            },
            ...crumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": crumb.label,
                "item": `https://haiticityportal.com${crumb.href}` // In generic usage, use absolute URL logic or env var
            }))
        ]
    };

    return (
        <nav aria-label="Breadcrumb" className="w-full bg-slate-50 border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
            />
            <div className="max-w-6xl mx-auto flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
                <Link
                    href="/"
                    className="flex items-center hover:text-brand-blue transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded"
                >
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Home</span>
                </Link>

                {crumbs.map((crumb, index) => (
                    <Fragment key={crumb.href}>
                        <ChevronRight className="h-4 w-4 mx-2 text-gray-300 flex-shrink-0" />
                        {crumb.isLast ? (
                            <span className="font-semibold text-gray-900" aria-current="page">
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                href={crumb.href}
                                className="hover:text-brand-blue transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded"
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </Fragment>
                ))}
            </div>
        </nav>
    );
}
