import type { ContactFormValues } from "@/types/contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

interface EmailDeliveryConfig {
  readonly apiKey: string;
  readonly from: string;
  readonly to: string;
}

export function getEmailDeliveryConfig(): EmailDeliveryConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return null;
  }

  return { apiKey, from, to };
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Talks to Resend's REST API directly so the project avoids an extra SDK dependency.
export async function sendContactEmail(config: EmailDeliveryConfig, values: ContactFormValues) {
  const companyLine = values.company ? `<p><strong>Company:</strong> ${escapeHtml(values.company)}</p>` : "";

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: values.email,
      subject: `New project inquiry from ${values.name}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(values.name)}</p><p><strong>Email:</strong> ${escapeHtml(values.email)}</p>${companyLine}<p>${escapeHtml(values.message).replaceAll("\n", "<br />")}</p>`
    }),
    signal: AbortSignal.timeout(10_000)
  });

  if (!response.ok) {
    throw new Error(`Email provider responded with ${response.status}`);
  }
}
