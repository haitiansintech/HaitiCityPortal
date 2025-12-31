"use client";

import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ReactNode } from "react";

interface Props {
    messages: AbstractIntlMessages;
    locale: string;
    children: ReactNode;
}

export default function ClientIntlProvider({ messages, locale, children }: Props) {
    return (
        <NextIntlClientProvider
            messages={messages}
            locale={locale}
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
