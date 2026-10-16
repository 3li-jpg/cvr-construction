import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateAppointment } from "@/lib/appointments";
import { showroomContact } from "@/lib/site-data";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const fields = body as Record<string, unknown>;
  if (typeof fields.website === "string" && fields.website.trim()) return NextResponse.json({ ok: true });
  const result = validateAppointment(fields);
  if (!result.data) return NextResponse.json({ error: result.error }, { status: 422 });
  const data = result.data;
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Appointment requests are temporarily unavailable. Please call the showroom." }, { status: 503 });
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `CVR Showroom <${process.env.CONTACT_FROM_ADDRESS ?? "info@cvrconstruction.ca"}>`,
      to: process.env.APPOINTMENT_TO_ADDRESS || showroomContact.email,
      replyTo: data.email,
      subject: `Showroom appointment request: ${data.date} at ${data.time}`,
      text: [
        "Showroom appointment request (not yet confirmed)",
        `Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || "Not provided"}`,
        `Preferred date: ${data.date}`, `Preferred time: ${data.time} (Victoria, BC)`,
        `Appointment focus: ${data.focus}`, "", "Project notes:", data.notes || "None provided",
      ].join("\n"),
    });
    if (error) return NextResponse.json({ error: "Could not send your request. Please try again or call the showroom." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not send your request. Please try again or call the showroom." }, { status: 502 });
  }
}
