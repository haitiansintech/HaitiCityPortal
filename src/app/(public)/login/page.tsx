"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setMsg("Invalid credentials");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      setMsg("An error occurred");
    }
  }

  return (
    <form onSubmit={handleSignIn} className="max-w-sm p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <input className="border rounded px-3 py-2 w-full" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border rounded px-3 py-2 w-full" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-black text-white rounded px-3 py-2">Sign in</button>
      {msg && <p className="text-sm pt-2 text-red-600">{msg}</p>}
    </form>
  );
}
