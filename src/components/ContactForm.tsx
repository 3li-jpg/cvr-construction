"use client";

import { useState } from "react";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { trackEvent } from "@/lib/analytics";

type SubmitState = "idle" | "sending" | "sent";

function buildWhatsAppMessage(data: {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  region: string;
  subject: string;
  message: string;
}) {
  const lines = [
    "New CVR Construction website enquiry",
    "",
    `Name: ${data.firstName} ${data.lastName}`.trim(),
    `Email: ${data.email}`,
    data.organization ? `Organization: ${data.organization}` : "",
    `Region: ${data.region}`,
    `Subject: ${data.subject}`,
    "",
    "Project Details:",
    data.message,
  ].filter(Boolean);

  return encodeURIComponent(lines.join("\n"));
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const fieldClassName =
    "h-18 border border-black/8 bg-black/[0.03] px-6 text-[1rem] text-black placeholder:text-black/28 focus-visible:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15";
  const textareaClassName =
    "min-h-[12rem] resize-none border border-black/8 bg-black/[0.03] px-6 py-5 text-[1rem] text-black placeholder:text-black/28 focus-visible:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim(),
      region: String(formData.get("region") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    const whatsappUrl = `https://wa.me/12508801270?text=${buildWhatsAppMessage(payload)}`;
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    trackEvent({
      event: "whatsapp_enquiry_started",
      label: payload.subject || "general-enquiry",
      location: "contact-form",
      method: popup ? "popup" : "redirect",
    });

    if (!popup) {
      window.location.assign(whatsappUrl);
    }

    form.reset();
    setSubmitState("sent");
  };

  return (
    <>
      <form className="mt-12 space-y-9 lg:mt-14" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-black/45">
              FIRST NAME*
            </span>
            <input
              type="text"
              name="firstName"
              required
              autoComplete="given-name"
              placeholder="Jamie…"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-black/45">
              LAST NAME*
            </span>
            <input
              type="text"
              name="lastName"
              required
              autoComplete="family-name"
              placeholder="Smith…"
              className={fieldClassName}
            />
          </label>
        </div>

        <label className="flex flex-col gap-4">
          <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-black/45">
            EMAIL*
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            spellCheck={false}
            placeholder="name@example.com…"
            className={fieldClassName}
          />
        </label>

        <label className="flex flex-col gap-4">
          <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-black/45">
            ORGANIZATION
          </span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            placeholder="Home, business, or property name…"
            className={fieldClassName}
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-black/45">
              REGION*
            </span>
            <input
              type="text"
              name="region"
              required
              autoComplete="address-level2"
              placeholder="Victoria, Oak Bay, Saanich, Langford…"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-black/45">
              SUBJECT*
            </span>
            <input
              type="text"
              name="subject"
              required
              autoComplete="off"
              placeholder="Kitchen renovation, bathroom remodel, commercial upgrade…"
              className={fieldClassName}
            />
          </label>
        </div>

        <label className="flex flex-col gap-4">
          <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-black/45">
            MESSAGE*
          </span>
          <textarea
            name="message"
            required
            rows={7}
            autoComplete="off"
            placeholder="Tell us about the space, your goals, timeline, and any details that matter…"
            className={textareaClassName}
          />
        </label>

        <InteractiveHoverButton
          aria-describedby="contact-form-note"
          data-analytics-event="contact_primary_cta_clicked"
          data-analytics-label="open_whatsapp_draft"
          data-analytics-location="contact-form"
          className="tracking-[0.08em] px-8 text-[0.9rem]"
          disabled={submitState === "sending"}
          type="submit"
        >
          {submitState === "sending" ? "OPENING WHATSAPP…" : "OPEN WHATSAPP DRAFT"}
        </InteractiveHoverButton>
      </form>

      <p
        id="contact-form-note"
        aria-live="polite"
        className="mt-5 text-[0.88rem] leading-relaxed text-black/58"
      >
        {submitState === "sent"
          ? "Your message draft has been opened in WhatsApp. If it did not open, contact CVR at info@cvrconstruction.ca or +1 250 880 1270."
          : "Submitting opens WhatsApp with your project details prefilled for CVR Construction. Nothing is sent until you confirm the message in WhatsApp."}
      </p>
    </>
  );
}
