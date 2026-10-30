import type { ContactApiResponse, ContactFormValues } from "@/types/contact";

const CONTACT_ENDPOINT = "/api/contact";
const NETWORK_ERROR_MESSAGE = "Could not reach the server. Check your connection and try again.";

export async function submitContactForm(values: ContactFormValues): Promise<ContactApiResponse> {
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    return (await response.json()) as ContactApiResponse;
  } catch {
    return { ok: false, message: NETWORK_ERROR_MESSAGE };
  }
}
