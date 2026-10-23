"use client";
import * as React from "react";
import { Button } from "../../../components/ui/form/button";
import { Label } from "../../../components/ui/form/label";
import { NumberField } from "../../../components/ui/form/number-field";
import { Slider } from "../../../components/ui/form/slider";
import { cn } from "../../../utils";
function useLabeledSliderValue(props) {
    var _a, _b;
    const [internalValue, setInternalValue] = React.useState((_a = props.defaultValue) !== null && _a !== void 0 ? _a : null);
    const value = props.value === undefined ? internalValue : props.value;
    const placeholderValid = props.placeholderValue !== undefined &&
        Number.isFinite(props.placeholderValue) &&
        props.placeholderValue >= props.min &&
        props.placeholderValue <= props.max;
    const missingDefault = value === null && !placeholderValid;
    const disabled = Boolean(props.disabled || missingDefault);
    const thumbValue = value !== null && value !== void 0 ? value : (placeholderValid ? ((_b = props.placeholderValue) !== null && _b !== void 0 ? _b : props.min) : props.min);
    function change(nextValue) {
        var _a;
        if (props.value === undefined) {
            setInternalValue(nextValue);
        }
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, nextValue);
    }
    function reset() {
        var _a, _b;
        if (props.value === undefined) {
            setInternalValue((_a = props.defaultValue) !== null && _a !== void 0 ? _a : null);
        }
        (_b = props.onReset) === null || _b === void 0 ? void 0 : _b.call(props);
    }
    return {
        value,
        placeholderValid,
        missingDefault,
        disabled,
        thumbValue,
        change,
        reset,
    };
}
function LabeledSliderHeader({ id, label, disabled, onReset, }) {
    return (<div className="flex items-center justify-between gap-3">
      <Label id={`${id}-label`} htmlFor={id}>
        {label}
      </Label>
      {onReset && (<Button type="button" size="sm" variant="ghost" disabled={disabled} onClick={onReset} aria-label={`Reset ${label}`}>
          Reset
        </Button>)}
    </div>);
}
export function LabeledSlider(props) {
    var _a;
    const generatedId = React.useId();
    const id = (_a = props.id) !== null && _a !== void 0 ? _a : generatedId;
    const slider = useLabeledSliderValue(props);
    const descriptionId = props.help || slider.missingDefault ? `${id}-help` : undefined;
    return (<div data-slot="labeled-slider" className={cn("flex flex-col gap-3", props.className)}>
      <LabeledSliderHeader id={id} label={props.label} disabled={props.disabled} onReset={props.onReset ? slider.reset : undefined}/>
      <div className="flex items-center gap-4">
        <Slider value={slider.thumbValue} onChange={slider.change} onCommit={props.onCommit} min={props.min} max={props.max} step={props.step} disabled={slider.disabled} aria-labelledby={`${id}-label`} aria-describedby={descriptionId} className="min-w-12 flex-1"/>
        <NumberField id={id} value={slider.value} onChange={slider.change} onCommit={props.onCommit} min={props.min} max={props.max} step={props.step} emptyValue={slider.placeholderValid ? "allow" : "reject"} placeholder={slider.placeholderValid ? String(props.placeholderValue) : undefined} disabled={slider.disabled} unit={props.unit} aria-label={props.label} aria-describedby={descriptionId} className="w-40 shrink-0"/>
      </div>
      {descriptionId && (<p id={descriptionId} className={cn("text-sm", slider.missingDefault
                ? "text-destructive"
                : "text-muted-foreground")}>
          {slider.missingDefault
                ? "A valid default value is required."
                : props.help}
        </p>)}
    </div>);
}
