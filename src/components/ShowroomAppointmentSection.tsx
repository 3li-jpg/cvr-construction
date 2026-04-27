"use client";

import { useMemo, useState } from "react";
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
import { showroomContact } from "@/lib/site-data";

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
    body: "The showroom entrance is accessible for booked showroom visits.",
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

function formatTimeLabel(time: string) {
  if (!time) return "Select a time";

  const [hourValue, minuteValue] = time.split(":").map(Number);
  const date = new Date(2026, 0, 1, hourValue, minuteValue);

  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
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

  const bookingHref = useMemo(() => {
    const subject = encodeURIComponent("Showroom appointment request");
    const body = encodeURIComponent(
      [
        "Hi CVR Showroom,",
        "",
        "I would like to book a showroom appointment with a design specialist.",
        "",
        `Preferred date: ${formatDateLabel(selectedDate)}`,
        `Preferred time: ${formatTimeLabel(selectedTime)}`,
        `Appointment focus: ${selectedType}`,
        "",
        "Name:",
        "Phone:",
        "Project notes:",
      ].join("\n")
    );

    return `${showroomContact.emailHref}?subject=${subject}&body=${body}`;
  }, [selectedDate, selectedTime, selectedType]);

  return (
    <section
      aria-labelledby="appointment-heading"
      className="relative overflow-hidden bg-white py-20 text-black md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.42] [background-image:linear-gradient(rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="site-shell relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-t border-black/10 pt-10 lg:gap-12 lg:pt-14">
          <Reveal direction="up" duration={0.75} distance={30}>
            <div className="flex flex-col gap-8">
              <div className="flex max-w-[72rem] flex-col gap-6">
                <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-black">
                  DESIGN SPECIALIST
                </SectionEyebrow>
                <h2
                  id="appointment-heading"
                  className="max-w-[15ch] text-[2.35rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[2.9rem] md:text-[3.4rem] lg:text-[4.1rem] xl:text-[4.5rem]"
                >
                  Book A Showroom Appointment.
                </h2>
                <p className="max-w-[46rem] text-[1rem] leading-7 text-black/64 md:text-[1.08rem]">
                  Reserve time with a design specialist to review product lines,
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
                      className="grid grid-cols-[2.8rem_minmax(0,1fr)] gap-4 border-t border-black/10 pt-4"
                    >
                      <span className="flex h-11 w-11 items-center justify-center bg-black text-white">
                        <Icon aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={1.8} />
                      </span>
                      <span>
                        <span className="block text-[0.76rem] font-black uppercase tracking-[0.13em] text-black">
                          {detail.title}
                        </span>
                        <span className="mt-1 block text-[0.95rem] leading-6 text-black/62">
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
            <div className="border border-black/12 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.07)] sm:p-6 lg:p-8 xl:p-10">
              <div className="mb-7 flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black/45">
                    Appointment Calendar
                  </p>
                  <h3 className="mt-2 text-[1.6rem] font-black uppercase leading-[0.95] tracking-[-0.045em] sm:text-[2rem] md:text-[2.4rem]">
                    Choose A Preferred Slot
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-black/12 bg-black text-white">
                  <CalendarDays aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>

              <div className="grid gap-7 lg:grid-cols-[minmax(0,34rem)_minmax(20rem,1fr)] lg:items-start lg:gap-10">
                <fieldset className="w-full max-w-[34rem]">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/48">
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
                        className="flex h-9 w-9 items-center justify-center border border-black/12 text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                      >
                        <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                      <p className="min-w-[8rem] text-center text-[0.78rem] font-black uppercase tracking-[0.12em] text-black">
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
                        className="flex h-9 w-9 items-center justify-center border border-black/12 text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                      >
                        <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 border-l border-t border-black/10">
                    {weekdayLabels.map((day) => (
                      <div
                        key={day}
                        className="flex h-8 items-center justify-center border-b border-r border-black/10 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-black/45"
                      >
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day) => (
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
                        className={`min-h-10 border-b border-r border-black/10 px-1 text-[0.72rem] font-black uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset sm:min-h-11 ${
                          day.isSelected
                            ? "bg-black text-white"
                            : day.isBookable
                              ? "bg-white text-black hover:bg-black hover:text-white"
                              : day.inCurrentMonth
                                ? "cursor-not-allowed bg-[#f0f0f0] text-[#8d8d8d] opacity-70 dark:bg-[#121212] dark:text-[#4d5663]"
                                : "cursor-not-allowed bg-transparent text-transparent"
                        }`}
                      >
                        {day.dayNumber}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-[0.78rem] leading-6 text-black/48">
                    Available appointment dates are Tuesday through Saturday.
                  </p>
                </fieldset>

                <div className="grid gap-7 lg:border-l lg:border-black/10 lg:pl-8">
                  <fieldset>
                    <legend className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/48">
                      Preferred Time
                    </legend>
                    <label className="flex h-14 items-center gap-3 border border-black/12 bg-black/[0.03] px-4">
                      <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0 text-black/45" strokeWidth={1.8} />
                      <select
                        value={selectedTime}
                        onChange={(event) => setSelectedTime(event.target.value)}
                        className="h-full w-full bg-transparent text-[0.9rem] font-black uppercase tracking-[0.08em] text-black focus-visible:outline-none"
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
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/48">
                      Appointment Focus
                    </span>
                    <select
                      value={selectedType}
                      onChange={(event) =>
                        setSelectedType(event.target.value as (typeof consultationTypes)[number])
                      }
                      className="h-14 border border-black/12 bg-black/[0.03] px-4 text-[0.9rem] font-semibold uppercase tracking-[0.04em] text-black focus-visible:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
                    >
                      {consultationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="border-t border-black/10 pt-5">
                    <a
                      href={bookingHref}
                      className="inline-flex min-h-13 w-full items-center justify-center gap-2 bg-black px-5 text-center text-[0.68rem] font-bold uppercase tracking-widest text-white transition-colors hover:bg-black/82 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                      <Mail aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
                      Request Appointment
                    </a>
                  </div>

                  <p className="text-[0.82rem] leading-6 text-black/50">
                    Appointment requests open your email with the selected details
                    filled in. CVR will confirm the final time directly.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
