"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Accessibility,
  CalendarDays,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";


const quickTimes = [
  { label: "10:00 AM", value: "10:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "2:00 PM", value: "14:00" },
  { label: "4:00 PM", value: "16:00" },
] as const;
const consultationTypes = [
  "Kitchen selections",
  "Bathroom fixtures",
  "Surface review",
  "General showroom visit",
] as const;
const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const visitDetails = [
  {
    icon: Accessibility,
    title: "Accessible Entrance",
    body: "The showroom entrance is accessible.",
  },
  {
    icon: Car,
    title: "Appointment Parking",
    body: "1 hour free parking is available behind the showroom for appointments.",
  },
  {
    icon: Clock3,
    title: "Design Specialist",
    body: "Book time to compare products, finishes, fixtures, and project-fit options.",
  },
] as const;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateLabel(isoDate: string) {
  if (!isoDate) return "Select a date";

  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function isBookableDate(date: Date, today: Date) {
  const day = date.getDay();

  return date >= today && day >= 2 && day <= 6;
}

function getNextBookableDate(fromDate: Date) {
  const date = startOfDay(fromDate);

  for (let offset = 0; offset < 14; offset += 1) {
    const candidate = new Date(date);
    candidate.setDate(date.getDate() + offset);

    if (isBookableDate(candidate, date)) {
      return candidate;
    }
  }

  return date;
}

export function ShowroomAppointmentSection() {
  const [monthDate, setMonthDate] = useState(() =>
    startOfMonth(getNextBookableDate(new Date()))
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    toIsoDate(getNextBookableDate(new Date()))
  );
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedType, setSelectedType] =
    useState<(typeof consultationTypes)[number]>("Kitchen selections");

  const calendarDays = useMemo(() => {
    const today = startOfDay(new Date());
    const monthStart = startOfMonth(monthDate);
    const firstVisibleDate = new Date(monthStart);
    firstVisibleDate.setDate(monthStart.getDate() - monthStart.getDay());

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(firstVisibleDate);
      date.setDate(firstVisibleDate.getDate() + index);

      const isoDate = toIsoDate(date);
      const inCurrentMonth = date.getMonth() === monthDate.getMonth();

      return {
        date,
        isoDate,
        dayNumber: date.getDate(),
        inCurrentMonth,
        isPast: date < today,
        isBookable: inCurrentMonth && isBookableDate(date, today),
        isSelected: isoDate === selectedDate,
      };
    });
  }, [monthDate, selectedDate]);

  const monthLabel = new Intl.DateTimeFormat("en-CA", {
    month: "long",
    year: "numeric",
  }).format(monthDate);
  const isPreviousMonthDisabled = startOfMonth(monthDate) <= startOfMonth(new Date());

  const [submissionState, setSubmissionState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  async function submitAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionState === "sending") return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setSubmissionState("sending");
    setSubmissionMessage("");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, date: selectedDate, time: selectedTime, focus: selectedType }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not send your request. Please try again.");
      setSubmissionState("success");
      setSubmissionMessage("Your appointment request has been sent. CVR will contact you to confirm the time.");
      form.reset();
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(error instanceof Error ? error.message : "Could not send your request. Please try again.");
    }
  }

  return (
    <section
      id="design-specialist"
      aria-labelledby="appointment-heading"
      className="relative overflow-hidden bg-[var(--showroom-bg)] py-20 text-[var(--showroom-text)] md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="hidden"
      />

      <div className="site-shell relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-t border-[color:var(--showroom-line)] pt-10 lg:gap-12 lg:pt-14">
          <Reveal direction="up" duration={0.75} distance={30}>
            <div className="flex flex-col gap-8">
              <div className="mx-auto flex max-w-[72rem] flex-col items-center gap-6 text-center">
                <SectionEyebrow className="justify-center text-[0.78rem] tracking-[0.18em] text-[var(--showroom-text)]">
                  DESIGN SPECIALIST
                </SectionEyebrow>
                <h2
                  id="appointment-heading"
                  className="max-w-[15ch] text-[2.35rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[2.9rem] md:text-[3.4rem] lg:text-[4.1rem] xl:text-[4.5rem]"
                >
                  Book A Showroom Appointment.
                </h2>
                <p className="max-w-[46rem] text-[1rem] leading-7 text-[var(--showroom-muted)] md:text-[1.08rem]">
                  Request time with a design specialist to review product lines,
                  compare finishes, and narrow the choices before your renovation
                  decisions are locked in.
                </p>
              </div>

              <div className="grid gap-3 lg:grid-cols-3">
                {visitDetails.map((detail) => {
                  const Icon = detail.icon;

                  return (
                    <div
                      key={detail.title}
                      className="grid grid-cols-[2.8rem_minmax(0,1fr)] gap-4 border-t border-[color:var(--showroom-line)] pt-4"
                    >
                      <span className="flex h-11 w-11 items-center justify-center bg-[var(--showroom-inverse)] text-[var(--showroom-inverse-text)]">
                        <Icon aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={1.8} />
                      </span>
                      <span>
                        <span className="block text-[0.76rem] font-black uppercase tracking-[0.13em] text-[var(--showroom-text)]">
                          {detail.title}
                        </span>
                        <span className="mt-1 block text-[0.95rem] leading-6 text-[var(--showroom-muted)]">
                          {detail.body}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.12} duration={0.85} distance={34}>
            <div className="border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] p-5 shadow-[0_24px_70px_var(--showroom-shadow)] sm:p-6 lg:p-8 xl:p-10">
              <div className="mb-7 flex flex-col gap-4 border-b border-[color:var(--showroom-line)] pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--showroom-soft)]">
                    Appointment Calendar
                  </p>
                  <h3 className="mt-2 text-[1.6rem] font-black uppercase leading-[0.95] tracking-[-0.045em] sm:text-[2rem] md:text-[2.4rem]">
                    Choose A Preferred Slot
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[color:var(--showroom-line)] bg-[var(--showroom-inverse)] text-[var(--showroom-inverse-text)]">
                  <CalendarDays aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>

              <form onSubmit={submitAppointment} className="grid gap-7 lg:grid-cols-[minmax(0,34rem)_minmax(20rem,1fr)] lg:items-start lg:gap-10">
                <fieldset className="w-full max-w-[34rem]">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
                      Preferred Date
                    </legend>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Previous month"
                        disabled={isPreviousMonthDisabled}
                        onClick={() =>
                          setMonthDate((currentMonth) =>
                            currentMonth ? addMonths(currentMonth, -1) : currentMonth
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center border border-[color:var(--showroom-line)] text-[var(--showroom-text)] transition-colors hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)] focus-visible:ring-offset-2"
                      >
                        <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                      <p className="min-w-[8rem] text-center text-[0.78rem] font-black uppercase tracking-[0.12em] text-[var(--showroom-text)]">
                        {monthLabel}
                      </p>
                      <button
                        type="button"
                        aria-label="Next month"
                        onClick={() =>
                          setMonthDate((currentMonth) =>
                            currentMonth ? addMonths(currentMonth, 1) : currentMonth
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center border border-[color:var(--showroom-line)] text-[var(--showroom-text)] transition-colors hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)] focus-visible:ring-offset-2"
                      >
                        <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 border-l border-t border-[color:var(--showroom-line)]">
                    {weekdayLabels.map((day) => (
                      <div
                        key={day}
                        className="flex h-9 items-center justify-center border-b border-r border-[color:var(--showroom-line)] text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[var(--showroom-soft)]"
                      >
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day) =>
                      day.inCurrentMonth ? (
                        <button
                          key={day.isoDate}
                          type="button"
                          aria-pressed={day.isSelected}
                          aria-label={
                            day.isPast
                              ? `${formatDateLabel(day.isoDate)} unavailable, date has passed`
                              : formatDateLabel(day.isoDate)
                          }
                          disabled={!day.isBookable}
                          onClick={() => setSelectedDate(day.isoDate)}
                          className={`flex min-h-12 items-center justify-center border-b border-r border-[color:var(--showroom-line)] px-1 text-[0.82rem] font-black uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)] focus-visible:ring-inset sm:min-h-14 ${
                            day.isSelected
                              ? "bg-[var(--showroom-inverse)] text-[var(--showroom-inverse-text)]"
                              : day.isBookable
                                ? "bg-[var(--showroom-panel)] text-[var(--showroom-text)] hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)]"
                                : "cursor-not-allowed bg-[color:var(--showroom-grid)] text-[var(--showroom-soft)] opacity-70"
                          }`}
                        >
                          {day.dayNumber}
                        </button>
                      ) : (
                        <div
                          key={day.isoDate}
                          aria-hidden="true"
                          className="min-h-12 border-b border-r border-[color:var(--showroom-line)] bg-transparent sm:min-h-14"
                        />
                      )
                    )}
                  </div>
                  <p className="mt-3 text-[0.78rem] leading-6 text-[var(--showroom-soft)]">
                    Preferred appointment dates are Tuesday through Saturday. Times are subject to confirmation.
                  </p>
                </fieldset>

                <div className="grid gap-7 lg:border-l lg:border-[color:var(--showroom-line)] lg:pl-8">
                  <fieldset>
                    <legend className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
                      Preferred Time
                    </legend>
                    <label className="flex h-14 items-center gap-3 border border-[color:var(--showroom-line)] bg-[color:var(--showroom-grid)] px-4">
                      <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--showroom-soft)]" strokeWidth={1.8} />
                      <select
                        value={selectedTime}
                        onChange={(event) => setSelectedTime(event.target.value)}
                        className="h-full w-full bg-transparent text-[0.9rem] font-black uppercase tracking-[0.08em] text-[var(--showroom-text)] focus-visible:outline-none"
                      >
                        {quickTimes.map((time) => (
                          <option key={time.value} value={time.value}>
                            {time.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </fieldset>

                  <label className="flex flex-col gap-3">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
                      Appointment Focus
                    </span>
                    <select
                      value={selectedType}
                      onChange={(event) =>
                        setSelectedType(event.target.value as (typeof consultationTypes)[number])
                      }
                      className="h-14 border border-[color:var(--showroom-line)] bg-[color:var(--showroom-grid)] px-4 text-[0.9rem] font-semibold uppercase tracking-[0.04em] text-[var(--showroom-text)] focus-visible:border-[color:var(--showroom-inverse)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-line)]"
                    >
                      {consultationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="grid gap-4">
                    {[
                      { name: "name", label: "Your name", type: "text", autoComplete: "name", required: true },
                      { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
                      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: false },
                    ].map((field) => (
                      <label key={field.name} className="flex flex-col gap-2 text-sm">
                        <span>{field.label}{field.required ? " (required)" : " (optional)"}</span>
                        <input name={field.name} type={field.type} autoComplete={field.autoComplete} required={field.required} maxLength={field.name === "name" ? 120 : 254} className="h-12 w-full border border-[color:var(--showroom-line)] bg-[color:var(--showroom-grid)] px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)]" />
                      </label>
                    ))}
                    <label className="flex flex-col gap-2 text-sm">
                      <span>Project notes (optional)</span>
                      <textarea name="notes" rows={3} maxLength={3000} className="w-full border border-[color:var(--showroom-line)] bg-[color:var(--showroom-grid)] p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)]" />
                    </label>
                    <label className="hidden" aria-hidden="true">Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
                  </div>
                  <button
                    type="submit"
                    disabled={submissionState === "sending"}
                    className="inline-flex min-h-13 w-full items-center justify-center gap-2 bg-[var(--showroom-inverse)] px-5 py-4 text-center text-[0.68rem] font-bold uppercase tracking-widest text-[var(--showroom-inverse-text)] transition-opacity hover:opacity-82 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)] focus-visible:ring-offset-2"
                  >
                    <Mail aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {submissionState === "sending" ? "Sending request…" : "Request Appointment"}
                  </button>
                  <p role={submissionState === "error" ? "alert" : "status"} aria-live="polite" className="text-sm leading-6">
                    {submissionMessage}
                  </p>
                  <p className="text-[0.82rem] leading-6 text-[var(--showroom-soft)]">
                    This sends an appointment request. CVR will confirm the final date and time directly.
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
