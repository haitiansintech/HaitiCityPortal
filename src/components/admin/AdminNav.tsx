"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ClipboardList, Banknote } from "lucide-react";

export default function AdminNav() {
    const pathname = usePathname();

    const links = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/requests", label: "Requests", icon: ClipboardList },
        { href: "/admin/finance", label: "Finance", icon: Banknote },
    ];

    return (
        <nav className="flex items-center space-x-4 mb-8 bg-white p-2 rounded-lg border shadow-sm">
            {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                            isActive
                                ? "bg-brand-blue text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        <Icon className={cn("mr-2 h-4 w-4", isActive ? "text-white" : "text-gray-400")} />
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}
