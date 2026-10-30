import { NextResponse } from "next/server";

import { getEmailDeliveryConfig, sendContactEmail } from "@/lib/email";
import type { ContactApiResponse } from "@/types/contact";
import { hasContactErrors, parseContactPayload, validateContactForm } from "@/utils/validateContactForm";

function respond(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return respond({ ok: false, message: "The request could not be read. Please try again." }, 400);
  }

  const values = parseContactPayload(payload);

  if (!values) {
    return respond({ ok: false, message: "The request could not be read. Please try again." }, 400);
  }

  const errors = validateContactForm(values);

  if (hasContactErrors(errors)) {
    return respond({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }

  const deliveryConfig = getEmailDeliveryConfig();

  if (!deliveryConfig) {
    return respond(
      { ok: false, message: "The form is not connected yet. Please reach out by email instead." },
      503
    );
  }

  try {
    await sendContactEmail(deliveryConfig, values);
  } catch (error) {
    console.error("Contact email delivery failed", error);

    return respond(
      { ok: false, message: "Your message could not be sent right now. Please try again in a moment." },
      502
    );
  }

  return respond({ ok: true, message: "Thanks — your message is on its way. I will reply soon." }, 200);
}
