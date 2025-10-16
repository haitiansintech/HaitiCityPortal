import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, municipality_code")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && profile?.role !== "staff") {
    redirect("/unauthorized");
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Haiti City Portal Dashboard</h1>
      <p>Welcome, {profile?.full_name || user.email}</p>
      <p className="text-sm opacity-70">
        Role: {profile?.role} · Municipality: {profile?.municipality_code || "—"}
      </p>
    </div>
  );
}
