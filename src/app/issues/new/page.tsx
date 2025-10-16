"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewIssuePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    setLoading(true);

    const { error } = await supabase.from("issues").insert({ title, description });
    setLoading(false);

    setMessage(error ? `❌ ${error.message}` : "✅ Issue submitted successfully!");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold">Report an Issue</h1>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input name="title" id="title" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" rows={4} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
      {message && <p className="pt-2 text-sm">{message}</p>}
    </form>
  );
}
