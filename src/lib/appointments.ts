export const appointmentTimes = ["10:00", "12:00", "14:00", "16:00"] as const;
export const appointmentFocuses = ["Kitchen selections", "Bathroom fixtures", "Surface review", "General showroom visit"] as const;

export function validateAppointment(body: Record<string, unknown>, now = new Date()) {
  const get = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const data = { name: get("name"), email: get("email"), phone: get("phone"), notes: get("notes"), date: get("date"), time: get("time"), focus: get("focus") };
  if (!data.name || data.name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254) {
    return { error: "Enter your name and a valid email address." };
  }
  if (data.phone.length > 254 || data.notes.length > 3000) return { error: "Your phone number or project notes are too long." };
  const date = new Date(`${data.date}T12:00:00Z`);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== data.date || data.date < today || date.getUTCDay() < 2 || date.getUTCDay() > 6) {
    return { error: "Choose a current or future date from Tuesday through Saturday." };
  }
  if (!(appointmentTimes as readonly string[]).includes(data.time) || !(appointmentFocuses as readonly string[]).includes(data.focus)) {
    return { error: "Choose an available appointment time and focus." };
  }
  return { data };
}
