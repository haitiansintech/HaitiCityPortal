import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <body className="min-h-screen font-sans bg-canvas text-ink">
                {children}
            </body>
        </html>
    );
}
