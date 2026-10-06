import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date>(new Date(2026, 9, 5));

  return (
    <Calendar
      mode="single"
      required
      selected={date}
      onSelect={setDate}
      defaultMonth={date}
      className="rounded-md border"
    />
  );
}

export function CalendarRangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 9, 5),
    to: new Date(2026, 9, 9),
  });

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      defaultMonth={new Date(2026, 9, 1)}
      numberOfMonths={2}
      className="rounded-md border"
    />
  );
}
