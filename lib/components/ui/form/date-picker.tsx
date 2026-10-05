"use client";

import * as React from "react";
import { format, type Locale } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import { Button } from "@/components/ui/form/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils";

export type DatePickerProps = Omit<
  React.ComponentProps<"button">,
  "value" | "defaultValue" | "onChange" | "onClick" | "children" | "type"
> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  onClick?: React.ComponentProps<typeof Button>["onClick"];
  placeholder?: string;
  disabledDates?: CalendarProps["disabled"];
  defaultMonth?: Date;
  startMonth?: Date;
  endMonth?: Date;
  captionLayout?: CalendarProps["captionLayout"];
  locale?: Locale;
  formatDate?: (date: Date) => string;
};

function DatePicker(props: DatePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    placeholder = "Pick a date",
    disabled = false,
    disabledDates,
    defaultMonth,
    startMonth,
    endMonth,
    captionLayout = "label",
    locale,
    formatDate,
    name,
    className,
    ...buttonProps
  } = props;
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = "value" in props;
  const selected = isControlled ? value : internalValue;

  function handleSelect(date: Date | undefined) {
    if (!isControlled) setInternalValue(date);
    onValueChange?.(date);
    setOpen(false);
  }

  return (
    <>
      {name && (
        <input
          type="hidden"
          name={name}
          value={selected ? format(selected, "yyyy-MM-dd") : ""}
          disabled={disabled}
          form={buttonProps.form}
        />
      )}
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            {...buttonProps}
            type="button"
            variant="outline"
            disabled={disabled}
            data-slot="date-picker"
            data-empty={!selected}
            className={cn(
              "w-[240px] max-w-full justify-start border-muted-foreground text-left font-normal data-[empty=true]:text-muted-foreground",
              className
            )}
          >
            <CalendarIcon aria-hidden="true" className="size-4 shrink-0" />
            {selected
              ? formatDate?.(selected) ?? format(selected, "PPP", { locale })
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="max-h-[var(--radix-popover-content-available-height)] w-auto overflow-y-auto p-0"
          align="start"
          collisionPadding={8}
          aria-label={placeholder}
        >
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={selected ?? defaultMonth}
            disabled={disabledDates}
            startMonth={startMonth}
            endMonth={endMonth}
            captionLayout={captionLayout}
            locale={locale}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export { DatePicker };
