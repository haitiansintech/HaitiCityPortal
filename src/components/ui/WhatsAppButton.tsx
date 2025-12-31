"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
    phoneNumber: string;
}

export default function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
    if (!phoneNumber) return null;

    // Remove any non-digit characters for the link
    const cleanNumber = phoneNumber.replace(/\D/g, "");

    return (
        <a
            href={`https://wa.me/${cleanNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle className="h-7 w-7 fill-current" />
            <span className="absolute right-full mr-3 hidden rounded-md bg-white px-2 py-1 text-xs font-bold text-gray-700 shadow-sm md:block whitespace-nowrap border border-gray-100">
                Besoin d'aide ? WhatsApp
            </span>
        </a>
    );
}
