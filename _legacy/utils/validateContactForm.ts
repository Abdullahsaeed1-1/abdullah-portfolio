import type { ContactFormErrors, ContactFormValues } from "@/types/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = {
  nameMax: 100,
  companyMax: 120,
  messageMin: 20,
  messageMax: 4000
} as const;

// Shared by the browser and the API route so both enforce identical rules.
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const message = values.message.trim();

  if (name.length === 0) {
    errors.name = "Please tell me your name.";
  } else if (name.length > CONTACT_LIMITS.nameMax) {
    errors.name = "That name is a little long — please shorten it.";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter an email address I can reply to.";
  }

  if (values.company.trim().length > CONTACT_LIMITS.companyMax) {
    errors.company = "Please shorten the company name.";
  }

  if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `A few more details help — at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Please keep the message under ${CONTACT_LIMITS.messageMax} characters.`;
  }

  return errors;
}

export function hasContactErrors(errors: ContactFormErrors) {
  return Object.keys(errors).length > 0;
}

export function parseContactPayload(payload: unknown): ContactFormValues | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const readString = (key: string) => (typeof record[key] === "string" ? (record[key] as string) : "");

  return {
    name: readString("name"),
    email: readString("email"),
    company: readString("company"),
    message: readString("message")
  };
}
