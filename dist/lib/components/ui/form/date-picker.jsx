"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../../components/ui/calendar";
import { Button } from "../../../components/ui/form/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { cn } from "../../../utils";
function DatePicker(props) {
    var _a;
    const { value, defaultValue, onValueChange, placeholder = "Pick a date", disabled = false, disabledDates, defaultMonth, startMonth, endMonth, captionLayout = "label", locale, formatDate, name, className } = props, buttonProps = __rest(props, ["value", "defaultValue", "onValueChange", "placeholder", "disabled", "disabledDates", "defaultMonth", "startMonth", "endMonth", "captionLayout", "locale", "formatDate", "name", "className"]);
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = "value" in props;
    const selected = isControlled ? value : internalValue;
    function handleSelect(date) {
        if (!isControlled)
            setInternalValue(date);
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(date);
        setOpen(false);
    }
    return (<>
      {name && (<input type="hidden" name={name} value={selected ? format(selected, "yyyy-MM-dd") : ""} disabled={disabled} form={buttonProps.form}/>)}
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button {...buttonProps} type="button" variant="outline" disabled={disabled} data-slot="date-picker" data-empty={!selected} className={cn("w-[240px] max-w-full justify-start border-muted-foreground text-left font-normal data-[empty=true]:text-muted-foreground", className)}>
            <CalendarIcon aria-hidden="true" className="size-4 shrink-0"/>
            {selected
            ? (_a = formatDate === null || formatDate === void 0 ? void 0 : formatDate(selected)) !== null && _a !== void 0 ? _a : format(selected, "PPP", { locale })
            : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-[var(--radix-popover-content-available-height)] w-auto overflow-y-auto p-0" align="start" collisionPadding={8} aria-label={placeholder}>
          <Calendar mode="single" selected={selected} onSelect={handleSelect} defaultMonth={selected !== null && selected !== void 0 ? selected : defaultMonth} disabled={disabledDates} startMonth={startMonth} endMonth={endMonth} captionLayout={captionLayout} locale={locale} autoFocus/>
        </PopoverContent>
      </Popover>
    </>);
}
export { DatePicker };
