"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  parcelId: string;
  address: string;
  purpose: string;
  notes: string;
}

const initialState: FormData = {
  fullName: "",
  email: "",
  phone: "",
  parcelId: "",
  address: "",
  purpose: "",
  notes: "",
};

const steps = ["Requester", "Property", "Purpose", "Review"] as const;

export default function TitleRequestWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const isReviewStep = currentStep === steps.length - 1;

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 0:
        return Boolean(form.fullName && form.email);
      case 1:
        return Boolean(form.parcelId && form.address);
      case 2:
        return Boolean(form.purpose);
      default:
        return true;
    }
  }, [currentStep, form]);

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit() {
    if (!isReviewStep) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/title/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Unable to submit request");
      }
      const payload = (await response.json()) as { reference: string };
      setReference(payload.reference);
    } catch (error) {
      console.error(error);
      setReference("HT-REQ-ERROR");
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-4 rounded-2xl border border-emerald-400/40 bg-slate-900/70 p-8 text-center">
          <h1 className="text-3xl font-semibold text-white">Request submitted</h1>
          <p className="text-sm text-slate-300">
            Thank you, {form.fullName}. Your title verification request has been received.
          </p>
          <p className="text-lg font-semibold text-emerald-300">Reference: {reference}</p>
          <Button onClick={() => setCurrentStep(0)} className="rounded-full" variant="outline">
            Track status (coming soon)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-semibold text-white">Title verification request</h1>
        <p className="text-sm text-slate-300">
          Complete the steps below to submit a title verification request. You can review the summary before sending.
        </p>
        <ol className="flex flex-wrap gap-3 text-sm text-slate-300">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold ${
                  index === currentStep
                    ? "border-emerald-300 bg-emerald-500/20 text-emerald-200"
                    : index < currentStep
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-200"
                    : "border-white/30 text-slate-400"
                }`}
              >
                {index + 1}
              </span>
              <span className={index === currentStep ? "font-semibold text-white" : undefined}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow">
        {currentStep === 0 && (
          <div className="space-y-4">
            <Input
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder="Full name"
              aria-label="Full name"
              required
            />
            <Input
              value={form.email}
              type="email"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              required
            />
            <Input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="Phone (optional)"
              aria-label="Phone"
            />
          </div>
        )}
        {currentStep === 1 && (
          <div className="space-y-4">
            <Input
              value={form.parcelId}
              onChange={(event) => updateField("parcelId", event.target.value)}
              placeholder="Parcel ID"
              aria-label="Parcel ID"
              required
            />
            <Textarea
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              placeholder="Property address"
              aria-label="Property address"
              rows={3}
              required
            />
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-4">
            <Textarea
              value={form.purpose}
              onChange={(event) => updateField("purpose", event.target.value)}
              placeholder="Describe the reason for verification"
              aria-label="Purpose"
              rows={4}
              required
            />
            <Textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Additional notes (optional)"
              aria-label="Additional notes"
              rows={3}
            />
          </div>
        )}
        {isReviewStep && (
          <div className="space-y-4 text-sm text-slate-200">
            <div>
              <h2 className="text-lg font-semibold text-white">Requester</h2>
              <p>{form.fullName}</p>
              <p>{form.email}</p>
              {form.phone && <p>{form.phone}</p>}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Property</h2>
              <p>Parcel: {form.parcelId}</p>
              <p>{form.address}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Purpose</h2>
              <p className="whitespace-pre-line">{form.purpose || "No purpose provided."}</p>
              {form.notes && (
                <p className="mt-2 whitespace-pre-line text-slate-300">Additional notes: {form.notes}</p>
              )}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button type="button" className="rounded-full" onClick={handleSubmit} disabled={!canProceed || submitting}>
            {isReviewStep ? (submitting ? "Submitting..." : "Submit request") : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
