import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user?.email) redirect("/login");

  const profile = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
    columns: {
      role: true,
      name: true,
      municipality_code: true,
      email: true,
    },
  });

  if (profile?.role !== "admin" && profile?.role !== "staff") {
    redirect("/unauthorized");
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-6xl lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Haiti City Portal dashboard</h1>
            <p className="mt-1 text-sm text-slate-300">
              Manage municipal data, approve issues, and coordinate with city partners.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
            Admin access
          </span>
        </div>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 text-sm text-slate-200">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Signed in as</dt>
            <dd className="mt-1 text-lg font-semibold text-white">
              {profile?.name || session.user.email}
            </dd>
            <dd className="mt-2 text-xs text-slate-400">{session.user.email}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 text-sm text-slate-200">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Permissions</dt>
            <dd className="mt-1 flex flex-wrap items-center gap-2 text-white">
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                {profile?.role ?? "Viewer"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-200">
                Municipality {profile?.municipality_code || "—"}
              </span>
            </dd>
            <dd className="mt-2 text-xs text-slate-400">
              Contact digital services to adjust permissions or switch municipalities.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
