export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly company: string;
  readonly message: string;
}

export type ContactFormField = keyof ContactFormValues;

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export type ContactSubmissionStatus = "idle" | "submitting" | "success" | "error";

export interface ContactApiResponse {
  readonly ok: boolean;
  readonly message: string;
  readonly errors?: ContactFormErrors;
}
