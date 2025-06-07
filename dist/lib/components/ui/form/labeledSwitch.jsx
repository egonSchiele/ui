import React from "react";
import { Switch } from "./switch";
import { cn } from "../../../utils";
import { Label } from "./label";
export function LabeledSwitch({ id, checked, onCheckedChange, label, className = "", }) {
    return (<div className={cn("flex flex-row gap-2 items-center", className)}>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} className={cn("cursor-pointer")}/>
      <Label onClick={() => onCheckedChange(!checked)} htmlFor={id}>
        {label}
      </Label>
    </div>);
}
