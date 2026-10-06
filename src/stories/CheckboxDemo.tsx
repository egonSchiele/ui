import * as React from "react";
import { Checkbox, type CheckboxProps } from "@/components/ui/form/checkbox";
import { Label } from "@/components/ui/form/label";

export function CheckboxDemo(props: CheckboxProps) {
  const id = React.useId();

  return (
    <form className="flex items-center gap-2">
      <Checkbox {...props} id={id} />
      <Label htmlFor={id}>Email me product updates</Label>
    </form>
  );
}

export function ControlledCheckboxDemo(props: CheckboxProps) {
  const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(false);

  return (
    <div className="grid gap-3">
      <CheckboxDemo {...props} checked={checked} onCheckedChange={setChecked} />
      <p className="text-sm text-muted-foreground">
        {checked ? "Subscribed" : "Not subscribed"}
      </p>
    </div>
  );
}

const channels = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "push", label: "Push" },
];

export function CheckboxGroupDemo() {
  const id = React.useId();
  const [selected, setSelected] = React.useState<string[]>(["email"]);
  const allSelected = selected.length === channels.length;
  const someSelected = selected.length > 0;

  function toggleChannel(value: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value)
    );
  }

  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-sm font-medium">Notification channels</legend>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${id}-all`}
          checked={allSelected ? true : someSelected ? "indeterminate" : false}
          onCheckedChange={(checked) =>
            setSelected(checked === true ? channels.map(({ value }) => value) : [])
          }
        />
        <Label htmlFor={`${id}-all`}>Select all</Label>
      </div>
      {channels.map(({ value, label }) => (
        <div key={value} className="ml-6 flex items-center gap-2">
          <Checkbox
            id={`${id}-${value}`}
            name="channels"
            value={value}
            checked={selected.includes(value)}
            onCheckedChange={(checked) => toggleChannel(value, checked === true)}
          />
          <Label htmlFor={`${id}-${value}`}>{label}</Label>
        </div>
      ))}
    </fieldset>
  );
}
