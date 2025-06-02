import React from "react";
import { Switch } from "./switch";
import { cn } from "@/utils";
import { Label } from "./label";

export type LabeledSwitchProps = {
  id: string;
  checked: boolean;
  onCheckedChange(checked: boolean): void;
  label: string;
  className?: string;
};

export function LabeledSwitch({
  id,
  checked,
  onCheckedChange,
  label,
  className = "",
}: LabeledSwitchProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn("cursor-pointer")}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
