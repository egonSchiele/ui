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
    const [resetCount, setResetCount] = React.useState(0);
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
        var _a, _b, _c;
        if (props.value === undefined) {
            const restored = (_a = props.defaultValue) !== null && _a !== void 0 ? _a : null;
            setInternalValue(restored);
            if (restored !== internalValue) {
                (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, restored);
            }
        }
        // The count keys the NumberField, so Reset also clears an invalid draft
        // when the value itself does not change.
        setResetCount((count) => count + 1);
        (_c = props.onReset) === null || _c === void 0 ? void 0 : _c.call(props);
    }
    return {
        value,
        placeholderValid,
        missingDefault,
        disabled,
        thumbValue,
        resetCount,
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
    const compact = props.density === "compact";
    const descriptionId = props.help || slider.missingDefault ? `${id}-help` : undefined;
    return (<div data-slot="labeled-slider" className={cn("flex flex-col", compact ? "gap-2" : "gap-3", props.className)}>
      <LabeledSliderHeader id={id} label={props.label} disabled={props.disabled} onReset={props.onReset ? slider.reset : undefined}/>
      <div className={cn("flex items-center", compact ? "gap-2" : "gap-4")}>
        <Slider value={slider.thumbValue} onChange={slider.change} onCommit={props.onCommit} min={props.min} max={props.max} step={props.step} disabled={slider.disabled} aria-labelledby={`${id}-label`} aria-describedby={descriptionId} className="min-w-12 flex-1"/>
        <NumberField key={slider.resetCount} id={id} value={slider.value} onChange={slider.change} onCommit={props.onCommit} min={props.min} max={props.max} step={props.step} emptyValue={slider.placeholderValid ? "allow" : "reject"} placeholder={slider.placeholderValid ? String(props.placeholderValue) : undefined} disabled={slider.disabled} unit={props.unit} density={props.density} showSteppers={!compact} invalidBlur={props.invalidBlur} aria-label={props.label} aria-describedby={descriptionId} className={cn("shrink-0", compact ? "w-[5.5rem]" : "w-40")}/>
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
