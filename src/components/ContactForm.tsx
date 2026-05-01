"use client";

import { useEffect, useState } from "react";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { trackEvent } from "@/lib/analytics";
import { businessContact } from "@/lib/site-data";

type SubmitState = "idle" | "sending" | "redirecting" | "sent" | "fallback";
type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "organization"
  | "region"
  | "subject"
  | "message";

type FormValues = Record<FieldName, string>;

type FormErrors = Partial<Record<FieldName, string>>;

const DRAFT_STORAGE_KEY = "cvr-contact-draft";

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  region: "",
  subject: "",
  message: "",
};

function buildEmailDraftHref(data: {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  region: string;
  subject: string;
  message: string;
}) {
  const subject = encodeURIComponent(`CVR website enquiry: ${data.subject}`);
  const body = encodeURIComponent(
    [
      "Hi CVR Construction,",
      "",
      "I would like to enquire about a project.",
      "",
      `Name: ${data.firstName} ${data.lastName}`.trim(),
      `Email: ${data.email}`,
      data.organization ? `Organization: ${data.organization}` : "",
      `Region: ${data.region}`,
      `Subject: ${data.subject}`,
      "",
      "Project details:",
      data.message,
    ].filter(Boolean).join("\n")
  );

  return `${businessContact.emailHref}?subject=${subject}&body=${body}`;
}

function validateField(name: FieldName, value: string) {
  const trimmedValue = value.trim();

  if (name === "organization") {
    return "";
  }

  if (!trimmedValue) {
    return "This field is required.";
  }

  if (name === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedValue)) {
      return "Enter a valid email address.";
    }
  }

  return "";
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [values, setValues] = useState<FormValues>(() => {
    if (typeof window === "undefined") {
      return initialValues;
    }

    try {
      const savedDraft = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);

      if (!savedDraft) {
        return initialValues;
      }

      const parsedDraft = JSON.parse(savedDraft) as Partial<FormValues>;
      return { ...initialValues, ...parsedDraft };
    } catch {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      return initialValues;
    }
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState(
    "Submitting opens an email draft with your project details prefilled for CVR Construction. Nothing is sent until you send the email from your mail app."
  );
  const [emailDraftHref, setEmailDraftHref] = useState("");

  useEffect(() => {
    try {
      window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values));
    } catch {
      // Ignore storage write failures and keep the in-memory draft.
    }
  }, [values]);

  const getFieldClassName = (name: FieldName) =>
    `h-18 border px-6 text-[1rem] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ${
      errors[name]
        ? "border-red-500/70 bg-red-50 focus-visible:border-red-600 focus-visible:ring-red-500/20"
        : "border-border bg-muted/30 focus-visible:border-ring focus-visible:ring-ring/20"
    }`;

  const getTextareaClassName = (name: FieldName) =>
    `min-h-[12rem] resize-none border px-6 py-5 text-[1rem] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ${
      errors[name]
        ? "border-red-500/70 bg-red-50 focus-visible:border-red-600 focus-visible:ring-red-500/20"
        : "border-border bg-muted/30 focus-visible:border-ring focus-visible:ring-ring/20"
    }`;

  const setFieldValue = (name: FieldName, value: string) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const nextError = validateField(name, value);

      if (!nextError) {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      }

      return {
        ...current,
        [name]: nextError,
      };
    });
  };

  const handleBlur = (name: FieldName) => {
    const nextError = validateField(name, values[name]);

    setErrors((current) => {
      if (!nextError) {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      }

      return {
        ...current,
        [name]: nextError,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("sending");

    const nextErrors = Object.entries(values).reduce<FormErrors>((accumulator, [key, value]) => {
      const fieldName = key as FieldName;
      const fieldError = validateField(fieldName, value);

      if (fieldError) {
        accumulator[fieldName] = fieldError;
      }

      return accumulator;
    }, {});

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitState("idle");
      setStatusMessage("Please correct the highlighted fields before opening your email draft.");
      return;
    }

    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      organization: values.organization.trim(),
      region: values.region.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    const draftHref = buildEmailDraftHref(payload);

    setEmailDraftHref(draftHref);
    try {
      window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values));
    } catch {
      // Ignore storage write failures and continue with the email handoff.
    }

    trackEvent({
      event: "email_enquiry_started",
      label: payload.subject || "general-enquiry",
      location: "contact-form",
      method: "mailto",
    });

    setSubmitState("redirecting");
    setStatusMessage(
      "Opening your email draft. If it does not open, use the manual email link below."
    );
    window.location.assign(draftHref);
  };

  return (
    <>
      <form className="mt-8 space-y-9 md:mt-9 lg:mt-10" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-muted-foreground">
              FIRST NAME*
            </span>
            <input
              type="text"
              name="firstName"
              required
              autoComplete="given-name"
              placeholder="Jamie…"
              value={values.firstName}
              onChange={(event) => setFieldValue("firstName", event.currentTarget.value)}
              onBlur={() => handleBlur("firstName")}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "contact-firstName-error" : undefined}
              className={getFieldClassName("firstName")}
            />
            {errors.firstName ? (
              <span id="contact-firstName-error" className="text-sm text-red-700">
                {errors.firstName}
              </span>
            ) : null}
          </label>

          <label className="flex flex-col gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-muted-foreground">
              LAST NAME*
            </span>
            <input
              type="text"
              name="lastName"
              required
              autoComplete="family-name"
              placeholder="Smith…"
              value={values.lastName}
              onChange={(event) => setFieldValue("lastName", event.currentTarget.value)}
              onBlur={() => handleBlur("lastName")}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "contact-lastName-error" : undefined}
              className={getFieldClassName("lastName")}
            />
            {errors.lastName ? (
              <span id="contact-lastName-error" className="text-sm text-red-700">
                {errors.lastName}
              </span>
            ) : null}
          </label>
        </div>

        <label className="flex flex-col gap-4">
          <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-muted-foreground">
            EMAIL*
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            spellCheck={false}
            placeholder="name@example.com…"
            value={values.email}
            onChange={(event) => setFieldValue("email", event.currentTarget.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={getFieldClassName("email")}
          />
          {errors.email ? (
            <span id="contact-email-error" className="text-sm text-red-700">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-4">
          <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-muted-foreground">
            ORGANIZATION
          </span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            placeholder="Home, business, or property name…"
            value={values.organization}
            onChange={(event) => setFieldValue("organization", event.currentTarget.value)}
            onBlur={() => handleBlur("organization")}
            className={getFieldClassName("organization")}
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-muted-foreground">
              REGION*
            </span>
            <input
              type="text"
              name="region"
              required
              autoComplete="address-level2"
              placeholder="Victoria, Oak Bay, Saanich, Langford…"
              value={values.region}
              onChange={(event) => setFieldValue("region", event.currentTarget.value)}
              onBlur={() => handleBlur("region")}
              aria-invalid={Boolean(errors.region)}
              aria-describedby={errors.region ? "contact-region-error" : undefined}
              className={getFieldClassName("region")}
            />
            {errors.region ? (
              <span id="contact-region-error" className="text-sm text-red-700">
                {errors.region}
              </span>
            ) : null}
          </label>

          <label className="flex flex-col gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-muted-foreground">
              SUBJECT*
            </span>
            <input
              type="text"
              name="subject"
              required
              autoComplete="off"
              placeholder="Kitchen renovation, bathroom remodel, commercial upgrade…"
              value={values.subject}
              onChange={(event) => setFieldValue("subject", event.currentTarget.value)}
              onBlur={() => handleBlur("subject")}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              className={getFieldClassName("subject")}
            />
            {errors.subject ? (
              <span id="contact-subject-error" className="text-sm text-red-700">
                {errors.subject}
              </span>
            ) : null}
          </label>
        </div>

        <label className="flex flex-col gap-4">
          <span className="text-[0.82rem] font-semibold uppercase tracking-[-0.03em] text-muted-foreground">
            MESSAGE*
          </span>
          <textarea
            name="message"
            required
            rows={7}
            autoComplete="off"
            placeholder="Tell us about the space, your goals, timeline, and any details that matter…"
            value={values.message}
            onChange={(event) => setFieldValue("message", event.currentTarget.value)}
            onBlur={() => handleBlur("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={getTextareaClassName("message")}
          />
          {errors.message ? (
            <span id="contact-message-error" className="text-sm text-red-700">
              {errors.message}
            </span>
          ) : null}
        </label>

        <InteractiveHoverButton
          aria-describedby="contact-form-note"
          data-analytics-event="contact_primary_cta_clicked"
          data-analytics-label="open_email_draft"
          data-analytics-location="contact-form"
          className="px-4.5 text-[0.68rem] tracking-[0.08em] md:px-5 md:text-[0.76rem]"
          disabled={submitState === "sending"}
          type="submit"
        >
          {submitState === "sending"
            ? "PREPARING DRAFT…"
            : submitState === "redirecting"
              ? "OPENING EMAIL…"
              : "OPEN EMAIL DRAFT"}
        </InteractiveHoverButton>
      </form>

      <p
        id="contact-form-note"
        aria-live="polite"
        className="mt-5 text-[0.88rem] leading-relaxed text-muted-foreground"
      >
        {statusMessage}
      </p>

      {emailDraftHref ? (
        <a
          href={emailDraftHref}
          className="mt-4 inline-flex w-fit items-center gap-2 border-b border-current pb-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-foreground transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Open Email Draft Manually
        </a>
      ) : null}
    </>
  );
}
