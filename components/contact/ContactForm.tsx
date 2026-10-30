"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { contactCopy } from "@/content/contact";
import { cn } from "@/lib/cn";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = keyof typeof contactCopy.fields;
type FieldErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const controlClass =
  "mt-2 block w-full rounded-[12px] border border-line bg-cream px-4 py-3 text-body text-ink transition-colors duration-150 hover:border-muted focus:border-ink aria-[invalid=true]:border-olive";

function validate(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const read = (name: FieldName) => String(formData.get(name) ?? "").trim();

  (["name", "email", "message", "budget"] as const).forEach((name) => {
    if (!read(name)) {
      errors[name] = contactCopy.errors.required;
    }
  });

  if (!errors.email && !EMAIL_PATTERN.test(read("email"))) {
    errors.email = contactCopy.errors.email;
  }

  return errors;
}

function FieldError({ name, error }: { readonly name: FieldName; readonly error?: string }) {
  return error ? (
    <span id={`${name}-error`} className="ml-3 font-mono text-mono text-accent">
      {error}
    </span>
  ) : null;
}

interface ContactFormProps {
  readonly accessKey: string;
}

export function ContactForm({ accessKey }: ContactFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // A filled honeypot means a bot: pretend success and send nothing.
    if (formData.get("botcheck")) {
      setStatus("success");
      return;
    }

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      const firstInvalid = Object.keys(fieldErrors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!accessKey) {
      setStatus("error");
      setStatusMessage(contactCopy.errors.notConfigured);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Web3Forms rejected the submission");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setStatusMessage(contactCopy.errors.failed);
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="font-display text-h1 text-ink">
        {contactCopy.success}
      </p>
    );
  }

  const describedBy = (name: FieldName) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form
      action={WEB3FORMS_ENDPOINT}
      method="POST"
      noValidate
      onSubmit={handleSubmit}
      className="space-y-10"
    >
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="New enquiry from abdullahwork.me" />
      {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <label className="block text-small text-ink">
          {contactCopy.fields.name}
          <FieldError name="name" error={errors.name} />
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={controlClass}
          />
        </label>
        <label className="block text-small text-ink">
          {contactCopy.fields.email}
          <FieldError name="email" error={errors.email} />
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={controlClass}
          />
        </label>
      </div>

      <label className="block text-small text-ink">
        {contactCopy.fields.message}
        <FieldError name="message" error={errors.message} />
        <textarea
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={cn(controlClass, "resize-y")}
        />
      </label>

      <label className="block text-small text-ink md:max-w-[50%]">
        {contactCopy.fields.budget}
        <FieldError name="budget" error={errors.budget} />
        <select
          name="budget"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={describedBy("budget")}
          className={controlClass}
        >
          <option value="" disabled>
            —
          </option>
          {contactCopy.budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
        >
          {status === "submitting" ? contactCopy.submitting : contactCopy.submit}
        </Button>
        <p role="alert" className="font-mono text-mono text-accent">
          {status === "error" ? statusMessage : null}
        </p>
      </div>
    </form>
  );
}
