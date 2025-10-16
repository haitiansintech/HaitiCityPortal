"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewIssuePage() {
  const supabase = createClient();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const contactEmail = String(form.get("contactEmail") ?? "").trim();

    if (!title) {
      setMessage("Please provide a title for the issue.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("issues").insert({
      title,
      description: description || null,
      contact_email: contactEmail || null,
      status: "submitted",
    });

    setIsSubmitting(false);

    if (error) {
      setMessage(`Unable to submit issue: ${error.message}`);
      return;
    }

    setMessage("Issue submitted successfully! Redirecting to issues list...");
    setTimeout(() => router.push("/issues"), 1200);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold text-white">Report an issue</h1>
        <p className="text-sm text-slate-300">
          Provide details so municipal teams can triage and respond quickly. Adding contact information helps us follow up if needed.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required placeholder="Streetlight outage near Rue Capois" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Describe what happened, include nearby landmarks, and any photos or details that help crews respond."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact email (optional)</Label>
          <Input id="contactEmail" name="contactEmail" type="email" placeholder="you@example.com" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            By submitting, you consent to follow-up communications about this issue.
          </p>
          <Button type="submit" disabled={isSubmitting} className="rounded-full">
            {isSubmitting ? "Submitting..." : "Submit issue"}
          </Button>
        </div>
        {message && (
          <div
            role="status"
            className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
