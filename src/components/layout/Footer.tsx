import Link from "next/link";
import LocaleSwitcher from "@/components/Nav/LocaleSwitcher";

// ✅ Task P0: Footer implemented
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5 bg-black/90 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h4 className="mb-2 font-semibold">About</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><Link href="/about" className="hover:underline">About the portal</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Contact</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><a href="mailto:info@haiticity.org" className="hover:underline">info@haiticity.org</a></li>
              <li><Link href="/contact" className="hover:underline">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Open Data</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><Link href="/data" className="hover:underline">Datasets</Link></li>
              <li><Link href="/api" className="hover:underline">API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Legal</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><Link href="/terms" className="hover:underline">Terms</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} Haiti City Portal</div>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}