"use client";

import { Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const title = "Calendar as Appointment Picker";

type AppointmentTime = {
  label: string;
  value: string;
};

type CalendarThreeProps = {
  selectedDate: Date | undefined;
  selectedTime: string;
  availableTimes: readonly AppointmentTime[];
  onDateSelect: (date: Date | undefined) => void;
  onTimeSelect: (time: string) => void;
  isDateDisabled?: (date: Date) => boolean;
  className?: string;
};

const CalendarThree = ({
  selectedDate,
  selectedTime,
  availableTimes,
  onDateSelect,
  onTimeSelect,
  isDateDisabled,
  className,
}: CalendarThreeProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid overflow-hidden border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] text-[var(--showroom-text)] shadow-[0_24px_70px_var(--showroom-shadow)] lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="p-3 sm:p-5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            disabled={isDateDisabled}
            buttonVariant="ghost"
            className="w-full bg-transparent p-0 [--cell-radius:0px] [--cell-size:clamp(2.55rem,7.1vw,4.7rem)]"
            classNames={{
              root: "w-full",
              months: "w-full",
              month: "w-full gap-5",
              nav: "top-0",
              button_previous:
                "rounded-none border border-[color:var(--showroom-line)] bg-transparent text-[var(--showroom-text)] hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)] disabled:opacity-25",
              button_next:
                "rounded-none border border-[color:var(--showroom-line)] bg-transparent text-[var(--showroom-text)] hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)] disabled:opacity-25",
              month_caption:
                "h-(--cell-size) justify-center px-[calc(var(--cell-size)+0.5rem)]",
              caption_label:
                "text-[0.86rem] font-black uppercase tracking-[0.16em] text-[var(--showroom-text)]",
              weekdays:
                "grid grid-cols-7 border-l border-t border-[color:var(--showroom-line)]",
              weekday:
                "flex h-11 items-center justify-center rounded-none border-b border-r border-[color:var(--showroom-line)] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--showroom-soft)]",
              week: "mt-0 grid grid-cols-7",
              day: "min-h-(--cell-size) rounded-none border-b border-r border-[color:var(--showroom-line)] p-0",
              outside:
                "text-transparent aria-selected:text-transparent [&_button]:pointer-events-none",
              disabled:
                "text-[var(--showroom-soft)] opacity-45 [&_button]:cursor-not-allowed",
              today:
                "rounded-none bg-[color:var(--showroom-grid)] text-[var(--showroom-text)]",
            }}
          />
        </div>

        <div className="border-t border-[color:var(--showroom-line)] bg-[color:var(--showroom-grid)] p-4 lg:border-l lg:border-t-0">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center bg-[var(--showroom-inverse)] text-[var(--showroom-inverse-text)]">
              <Clock3 aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--showroom-soft)]">
                Preferred Time
              </p>
              <p className="mt-1 text-[0.84rem] font-black uppercase tracking-[0.08em] text-[var(--showroom-text)]">
                Available Slots
              </p>
            </div>
          </div>

          <ScrollArea className="h-[15rem] pr-2 sm:h-[18rem] lg:h-[28.4rem]">
            <div className="grid gap-2">
              {availableTimes.map((time) => {
                const isSelected = selectedTime === time.value;

                return (
                  <Button
                    key={time.value}
                    type="button"
                    onClick={() => onTimeSelect(time.value)}
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "h-12 rounded-none border px-4 text-[0.78rem] font-black uppercase tracking-[0.14em]",
                      isSelected
                        ? "border-[color:var(--showroom-inverse)] bg-[var(--showroom-inverse)] text-[var(--showroom-inverse-text)] hover:opacity-85"
                        : "border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] text-[var(--showroom-text)] hover:border-[color:var(--showroom-inverse)] hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)]"
                    )}
                  >
                    {time.label}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CalendarThree;
