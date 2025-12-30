interface BillPageProps {
  params: Promise<{ id: string }>;
}

export default async function TaxBillPage({ params }: BillPageProps) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-white">Bill {id}</h1>
      <p className="mt-4 text-sm text-slate-300">
        Detailed billing information is coming soon. For immediate assistance, contact the tax office at
        <a href="mailto:tax@haiticity.org" className="ml-1 font-semibold text-emerald-300">tax@haiticity.org</a>.
      </p>
    </div>
  );
}
