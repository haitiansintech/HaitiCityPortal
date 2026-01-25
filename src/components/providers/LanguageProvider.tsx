"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocale } from "next-intl";
type Language = "en" | "fr" | "ht" | "es";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Default to English or check localStorage
    const locale = useLocale();
    const [language, setLanguageState] = useState<Language>(locale as Language);

    useEffect(() => {
        const saved = localStorage.getItem("hcp-language") as Language;
        if (saved && ["en", "fr", "ht", "es"].includes(saved)) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("hcp-language", lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
