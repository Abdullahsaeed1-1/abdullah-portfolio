"use client";

import { useState } from "react";

import { submitContactForm } from "@/services/contact/submitContactForm";
import type {
  ContactFormErrors,
  ContactFormField,
  ContactFormValues,
  ContactSubmissionStatus
} from "@/types/contact";
import { hasContactErrors, validateContactForm } from "@/utils/validateContactForm";

const emptyValues: ContactFormValues = { name: "", email: "", company: "", message: "" };

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactSubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function updateField(field: ContactFormField, value: string) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));

    // Clear a field's error as soon as the visitor starts fixing it, never while they type elsewhere.
    if (errors[field]) {
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    }
  }

  async function submit() {
    const validationErrors = validateContactForm(values);

    if (hasContactErrors(validationErrors)) {
      setErrors(validationErrors);
      setStatus("error");
      setStatusMessage("Please check the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    const response = await submitContactForm(values);

    if (response.ok) {
      setValues(emptyValues);
      setErrors({});
      setStatus("success");
    } else {
      setErrors(response.errors ?? {});
      setStatus("error");
    }

    setStatusMessage(response.message);
  }

  return { values, errors, status, statusMessage, updateField, submit };
}
