import * as React from "react";
import { format } from "date-fns";
import { DatePicker, type DatePickerProps } from "@/components/ui/form/date-picker";
import { Button } from "@/components/ui/form/button";
import { Label } from "@/components/ui/form/label";

export function DatePickerDemo(props: DatePickerProps) {
  const id = React.useId();

  return (
    <form className="grid gap-2">
      <Label htmlFor={id}>Appointment date</Label>
      <DatePicker {...props} id={id} />
    </form>
  );
}

export function ControlledDatePickerDemo(props: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="grid gap-3">
      <DatePickerDemo {...props} value={date} onValueChange={setDate} />
      <p className="text-sm text-muted-foreground">
        Selected date: {date ? format(date, "yyyy-MM-dd") : "None"}
      </p>
      <Button
        type="button"
        variant="secondary"
        disabled={!date}
        onClick={() => setDate(undefined)}
      >
        Clear date
      </Button>
    </div>
  );
}
