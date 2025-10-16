"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else router.push("/admin");
  }

  return (
    <form onSubmit={signIn} className="max-w-sm p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <input className="border rounded px-3 py-2 w-full" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="border rounded px-3 py-2 w-full" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className="bg-black text-white rounded px-3 py-2">Sign in</button>
      {msg && <p className="text-sm pt-2 text-red-600">{msg}</p>}
    </form>
  );
}
