"use client";

import { CircleAlert, CircleCheck, Send } from "lucide-react";

import { Button, FormField } from "@/components/ui";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactFormField } from "@/types/contact";
import { cn } from "@/utils/cn";
import { CONTACT_LIMITS } from "@/utils/validateContactForm";

export function ContactForm() {
  const { values, errors, status, statusMessage, updateField, submit } = useContactForm();
  const isSubmitting = status === "submitting";

  function bindField(field: ContactFormField) {
    return {
      value: values[field],
      disabled: isSubmitting,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        updateField(field, event.target.value)
    };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit();
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5" aria-describedby="contact-form-status">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          id="name"
          label="Name"
          error={errors.name}
          controlProps={{ ...bindField("name"), autoComplete: "name", maxLength: CONTACT_LIMITS.nameMax }}
        />
        <FormField
          id="email"
          label="Email"
          error={errors.email}
          controlProps={{ ...bindField("email"), type: "email", autoComplete: "email", inputMode: "email" }}
        />
      </div>

      <FormField
        id="company"
        label="Company"
        isOptional
        error={errors.company}
        controlProps={{ ...bindField("company"), autoComplete: "organization", maxLength: CONTACT_LIMITS.companyMax }}
      />

      <FormField
        id="message"
        label="Project details"
        isMultiline
        error={errors.message}
        helperText="What are you building, and what does success look like?"
        controlProps={{ ...bindField("message"), rows: 6, maxLength: CONTACT_LIMITS.messageMax }}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" isLoading={isSubmitting} loadingLabel="Sending…">
          Send message
          <Send aria-hidden="true" size={15} />
        </Button>

        <p
          id="contact-form-status"
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center gap-2 text-sm",
            status === "success" ? "text-status-success" : "text-status-error",
            !statusMessage && "sr-only"
          )}
        >
          {status === "success" ? <CircleCheck aria-hidden="true" size={16} /> : null}
          {status === "error" ? <CircleAlert aria-hidden="true" size={16} /> : null}
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
