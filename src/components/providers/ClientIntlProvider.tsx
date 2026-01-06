"use client";

import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ReactNode, useEffect } from "react";

interface Props {
    messages: AbstractIntlMessages;
    locale: string;
    timeZone: string;
    children: ReactNode;
}

export default function ClientIntlProvider({ messages, locale, timeZone, children }: Props) {
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = locale;
        }
    }, [locale]);

    return (
        <NextIntlClientProvider
            messages={messages}
            locale={locale}
            timeZone={timeZone}
            getMessageFallback={({ key, namespace }) => {
                // Provide a graceful fallback for 2G networks instead of raw technical keys
                // Since this is a client component, the function is allowed.
                return 'Loading...';
            }}
        >
            {children}
        </NextIntlClientProvider>
    );
}
