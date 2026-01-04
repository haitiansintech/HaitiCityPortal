"use client";

import { Link } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoLayoutProps {
    children: React.ReactNode;
    title: string;
    className?: string; // Allow overrides if needed
}

export function InfoLayout({ children, title, className }: InfoLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 md:py-20">
            <div
                className={cn(
                    "mx-auto w-full max-w-3xl bg-white shadow-sm border border-slate-100 rounded-3xl overflow-hidden",
                    className
                )}
            >
                {/* Header / Breadcrumb Section */}
                <div className="border-b border-slate-100 bg-white px-6 py-8 md:px-12 md:py-10">
                    <Link
                        href="/"
                        className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 hover:text-brand-blue transition-colors"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {title}
                    </h1>
                </div>

                {/* content Body */}
                <div className="px-6 py-12 md:px-12 md:py-16 text-slate-800 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
