"use client";

import { Info } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface BilingualGuideProps {
    title: {
        en: string;
        fr: string;
        ht: string;
    };
    description: {
        en: string;
        fr: string;
        ht: string;
    };
    variant?: "default" | "hero";
}

export function BilingualGuide({ title, description, variant = "default" }: BilingualGuideProps) {
    const { language } = useLanguage();

    // Safety check: ensure we default to English if the current language isn't supported by this component instance
    // or if the translation is missing. Use 'en' as safe fallback.
    const currentLang = (language in title) ? (language as keyof typeof title) : "en";

    if (variant === "hero") {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                        <Info className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-white/80 font-bold uppercase tracking-widest text-xs">
                        {currentLang === "ht" ? "Gid Ofisyèl" : "Official Guide"}
                    </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight transition-all duration-300">
                    {title[currentLang]}
                </h1>
                <p className="text-xl text-white/80 max-w-2xl leading-relaxed font-medium transition-all duration-300">
                    {description[currentLang]}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-extrabold text-ink-primary tracking-tight transition-all duration-300">
                    {title[currentLang]}
                </h1>
            </div>
            <p className="text-xl text-ink-secondary max-w-3xl leading-relaxed transition-all duration-300">
                {description[currentLang]}
            </p>
        </div>
    );
}
