import { NextResponse } from "next/server";
import { Resend } from "resend";
import { businessContact } from "@/lib/site-data";

export const dynamic = "force-dynamic";

// ponytail: single shared client, keys read per-request so env rotation needs no restart
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

const FROM_ADDRESS = process.env.CONTACT_FROM_ADDRESS ?? "info@cvrconstruction.ca";
// ponytail: optional test/staging recipient; unset in production so it routes to businessContact.email
const TO_ADDRESS = process.env.CONTACT_TO_ADDRESS ?? businessContact.email;
const MAX_MESSAGE = 5000;

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  region?: string;
  subject?: string;
  message?: string;
  // honeypot: must be empty
  website?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: filled = bot, pretend success so bots move on
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const organization = (body.organization ?? "").trim();
  const region = (body.region ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!firstName || !lastName || !email || !region || !subject || !message) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Message is too long." }, { status: 422 });
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const emailSubject = `CVR website enquiry: ${subject}`;

  const lines = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    organization ? `Organization: ${organization}` : "",
    `Region: ${region}`,
    `Subject: ${subject}`,
    "",
    "Project details:",
    message,
  ].filter(Boolean);

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: `CVR Website <${FROM_ADDRESS}>`,
      to: TO_ADDRESS,
      replyTo: email,
      subject: emailSubject,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ error: "Could not send email. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ error: "Could not send email. Please try again." }, { status: 500 });
  }
}
