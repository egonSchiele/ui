import * as React from "react";
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
} from "@/components/ui/form/radio-group";
import { Label } from "@/components/ui/form/label";

const shippingOptions = [
  { value: "standard", label: "Standard", disabled: false },
  { value: "express", label: "Express", disabled: false },
  { value: "overnight", label: "Overnight (unavailable)", disabled: true },
];

export function RadioGroupDemo(props: RadioGroupProps) {
  const id = React.useId();

  return (
    <form>
      <RadioGroup {...props}>
        {shippingOptions.map(({ value, label, disabled }) => (
          <div key={value} className="flex items-center gap-2">
            <RadioGroupItem
              id={`${id}-${value}`}
              value={value}
              disabled={disabled}
            />
            <Label htmlFor={`${id}-${value}`}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </form>
  );
}

export function ControlledRadioGroupDemo(props: RadioGroupProps) {
  const [value, setValue] = React.useState("standard");

  return (
    <div className="grid gap-3">
      <RadioGroupDemo {...props} value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
    </div>
  );
}
