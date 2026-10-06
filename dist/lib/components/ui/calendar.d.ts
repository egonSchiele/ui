import * as React from "react";
import { DayPicker, type DayButton } from "react-day-picker";
import { Button } from "../../components/ui/form/button";
export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, ...props }: CalendarProps): React.JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>): React.JSX.Element;
export { Calendar, CalendarDayButton };
