import { Link } from "@/i18n/navigation";

export default function HtmlSitemap() {
    return (
        <div className="font-sans text-ink-primary">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                {/* Section 1: Citizens */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                        Pou Sitwayen yo <span className="text-gray-500 text-sm normal-case block md:inline font-normal">(For Residents)</span>
                    </h2>
                    <ul className="space-y-2">
                        <li><Link href="/services" className="hover:underline text-brand-blue">Tout Sèvis yo (All Services)</Link></li>
                        <li><Link href="/report" className="hover:underline">Rapòte Pwoblèm (Report Issue)</Link></li>
                        <li><Link href="/pay" className="hover:underline">Peye Taks (Pay Taxes)</Link></li>
                        <li><Link href="/directory" className="hover:underline">Kat Enfrastrikti (Directory Map)</Link></li>
                        <li><Link href="/services/birth-certificates" className="hover:underline text-sm ml-2 text-ink-secondary">- Batistè (Birth Certificates)</Link></li>
                        <li><Link href="/services/permits" className="hover:underline text-sm ml-2 text-ink-secondary">- Pèmi Konstriksyon (Permits)</Link></li>
                        <li><Link href="/services/trash" className="hover:underline text-sm ml-2 text-ink-secondary">- Fatra (Sanitation)</Link></li>
                        <li><Link href="/tax/lookup" className="hover:underline text-sm ml-2 text-ink-secondary">- Tcheke Estati (Check Status)</Link></li>
                    </ul>
                </section>

                {/* Section 2: Diaspora & Donors */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                        Pou Dyaspora <span className="text-gray-500 text-sm normal-case block md:inline font-normal">(Diaspora & Donors)</span>
                    </h2>
                    <ul className="space-y-2">
                        <li><Link href="/donate" className="hover:underline text-brand-blue">Fè yon Don (Donate)</Link></li>
                        <li><Link href="/transparency" className="hover:underline">Transparans (Financial Ledger)</Link></li>
                        <li><Link href="/directory" className="hover:underline">Gade Pwojè yo (View Projects)</Link></li>
                        <li><Link href="/about" className="hover:underline">Konsènan Nou (About Us)</Link></li>
                    </ul>
                </section>

                {/* Section 3: Officials (Internal) */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                        Ofisyèl Sèlman <span className="text-gray-500 text-sm normal-case block md:inline font-normal">(Official Access)</span>
                    </h2>
                    <ul className="space-y-2">
                        <li><Link href="/login" className="hover:underline text-brand-blue">Koneksyon (Login)</Link></li>
                        <li><Link href="/admin/field-reports" className="hover:underline">Dashbod Teren (Field Reports)</Link></li>
                        <li><Link href="/admin/handbook" className="hover:underline">Manyèl Pwosedi (Handbook)</Link></li>
                        <li><Link href="/admin/emergency" className="hover:underline text-red-600 font-bold">Sant Kriz (Crisis Center)</Link></li>
                    </ul>
                </section>

                {/* Section 4: General */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                        Enfòmasyon Jeneral <span className="text-gray-500 text-sm normal-case block md:inline font-normal">(General Info)</span>
                    </h2>
                    <ul className="space-y-2">
                        <li><Link href="/contact" className="hover:underline">Kontakte Nou (Contact)</Link></li>
                        <li><Link href="/officials" className="hover:underline">Otorite Lokal (Officials)</Link></li>
                        <li><Link href="/events" className="hover:underline">Evènman (Events)</Link></li>
                        <li><Link href="/data" className="hover:underline">Done Ouvè (Open Data)</Link></li>
                        <li className="pt-2 text-sm text-gray-500 font-medium">Legal</li>
                        <li><Link href="/terms" className="hover:underline text-sm text-ink-secondary">Kondisyon (Terms)</Link></li>
                        <li><Link href="/privacy" className="hover:underline text-sm text-ink-secondary">Vi Prive (Privacy)</Link></li>
                    </ul>
                </section>

            </div>
        </div>
    );
}
