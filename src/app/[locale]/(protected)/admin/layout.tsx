export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto">
      {children}
    </section>
  );
}
