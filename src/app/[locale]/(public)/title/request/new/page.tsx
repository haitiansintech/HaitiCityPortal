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
        <div className="space-y-4 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Request submitted</h1>
          <p className="text-base text-gray-600">
            Thank you, {form.fullName}. Your title verification request has been received.
          </p>
          <p className="text-lg font-semibold text-sky-700">Reference: {reference}</p>
          <Button onClick={() => setCurrentStep(0)} className="rounded-full" variant="outline">
            Track status (coming soon)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      {/* Page header */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Title Verification Request</h1>
        <p className="text-base text-gray-600">
          Complete the steps below to submit a title verification request. You can review the summary before sending.
        </p>

        {/* Step indicators */}
        <ol className="flex flex-wrap gap-3 text-sm text-gray-600">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold ${
                  index === currentStep
                    ? "border-sky-600 bg-sky-100 text-sky-700"
                    : index < currentStep
                    ? "border-sky-500 bg-sky-100 text-sky-600"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {index + 1}
              </span>
              <span className={index === currentStep ? "font-semibold text-gray-900" : "text-gray-500"}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Form card */}
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
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
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Requester</h2>
              <p>{form.fullName}</p>
              <p>{form.email}</p>
              {form.phone && <p>{form.phone}</p>}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Property</h2>
              <p>Parcel: {form.parcelId}</p>
              <p>{form.address}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Purpose</h2>
              <p className="whitespace-pre-line">{form.purpose || "No purpose provided."}</p>
              {form.notes && (
                <p className="mt-2 whitespace-pre-line text-gray-500">Additional notes: {form.notes}</p>
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
          <Button
            type="button"
            className="rounded-full bg-sky-600 text-white hover:bg-sky-700"
            onClick={handleSubmit}
            disabled={!canProceed || submitting}
          >
            {isReviewStep ? (submitting ? "Submitting…" : "Submit request") : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
