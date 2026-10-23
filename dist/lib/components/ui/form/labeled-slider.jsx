"use client";
import * as React from "react";
import { Button } from "../../../components/ui/form/button";
import { Label } from "../../../components/ui/form/label";
import { NumberField } from "../../../components/ui/form/number-field";
import { Slider } from "../../../components/ui/form/slider";
import { cn } from "../../../utils";
export function LabeledSlider(props) {
    var _a, _b, _c;
    const generatedId = React.useId();
    const id = (_a = props.id) !== null && _a !== void 0 ? _a : generatedId;
    const [internalValue, setInternalValue] = React.useState((_b = props.defaultValue) !== null && _b !== void 0 ? _b : null);
    const value = props.value === undefined ? internalValue : props.value;
    const placeholderValid = props.placeholderValue !== undefined &&
        Number.isFinite(props.placeholderValue) &&
        props.placeholderValue >= props.min &&
        props.placeholderValue <= props.max;
    const missingDefault = value === null && !placeholderValid;
    const disabled = Boolean(props.disabled || missingDefault);
    const thumbValue = value !== null && value !== void 0 ? value : (placeholderValid ? ((_c = props.placeholderValue) !== null && _c !== void 0 ? _c : props.min) : props.min);
    const descriptionId = props.help || missingDefault ? `${id}-help` : undefined;
    function change(nextValue) {
        var _a;
        if (props.value === undefined) {
            setInternalValue(nextValue);
        }
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, nextValue);
    }
    return (<div data-slot="labeled-slider" className={cn("flex flex-col gap-3", props.className)}>
      <div className="flex items-center justify-between gap-3">
        <Label id={`${id}-label`} htmlFor={id}>
          {props.label}
        </Label>
        {props.onReset && (<Button type="button" size="sm" variant="ghost" disabled={props.disabled} onClick={props.onReset} aria-label={`Reset ${props.label}`}>
            Reset
          </Button>)}
      </div>
      <div className="flex items-center gap-4">
        <Slider value={thumbValue} onChange={change} onCommit={props.onCommit} min={props.min} max={props.max} step={props.step} disabled={disabled} aria-labelledby={`${id}-label`} aria-describedby={descriptionId} className="min-w-12 flex-1"/>
        <NumberField id={id} value={value} onChange={change} onCommit={props.onCommit} min={props.min} max={props.max} step={props.step} emptyValue={placeholderValid ? "allow" : "reject"} placeholder={placeholderValid ? String(props.placeholderValue) : undefined} disabled={disabled} unit={props.unit} aria-label={props.label} aria-describedby={descriptionId} className="w-40 shrink-0"/>
      </div>
      {descriptionId && (<p id={descriptionId} className={cn("text-sm", missingDefault ? "text-destructive" : "text-muted-foreground")}>
          {missingDefault ? "A valid default value is required." : props.help}
        </p>)}
    </div>);
}
