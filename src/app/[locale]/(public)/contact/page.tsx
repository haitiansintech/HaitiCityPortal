export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-white">Contact the municipality</h1>
      <p className="mt-4 text-sm text-slate-300">
        Reach our resident support desk Monday–Friday from 9am to 5pm via
        <a href="mailto:info@haiticity.org" className="ml-1 font-semibold text-emerald-300">info@haiticity.org</a>
        or call <span className="font-semibold text-white">+509 555-0100</span>.
      </p>
      <p className="mt-4 text-sm text-slate-300">
        For emergencies, dial <span className="font-semibold text-white">114</span> or contact your local emergency services.
      </p>
    </div>
  );
}
