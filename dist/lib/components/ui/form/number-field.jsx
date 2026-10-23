"use client";
import * as React from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/form/button";
import { Input } from "../../../components/ui/form/input";
import { Label } from "../../../components/ui/form/label";
import { cn } from "../../../utils";
const SHIFT_STEP_MULTIPLIER = 10;
const FLOAT_PRECISION_DIGITS = 12;
function formatValue(value) {
    return value === null ? "" : String(value);
}
function normalizeValue(value, { min, max, step }) {
    const base = min !== null && min !== void 0 ? min : 0;
    const bounded = Math.min(max !== null && max !== void 0 ? max : Infinity, Math.max(min !== null && min !== void 0 ? min : -Infinity, value));
    const aligned = base + Math.round((bounded - base) / step) * step;
    const rounded = Number((Number.isFinite(aligned) ? aligned : bounded).toFixed(FLOAT_PRECISION_DIGITS));
    return Math.min(max !== null && max !== void 0 ? max : Infinity, Math.max(min !== null && min !== void 0 ? min : -Infinity, rounded));
}
function nextSteppedValue({ current, amount, bounds, }) {
    var _a;
    const next = current === null ? ((_a = bounds.min) !== null && _a !== void 0 ? _a : 0) : current + amount * bounds.step;
    if (!Number.isFinite(next)) {
        return current;
    }
    const stepped = normalizeValue(next, bounds);
    // Clamping an out-of-range value can move it against the step direction.
    // A native number input leaves the value alone in that case.
    const movesBackward = current !== null && (stepped - current) * amount < 0;
    return movesBackward ? current : stepped;
}
function parseDraft(draft, allowEmpty) {
    const text = draft.trim();
    if (text === "") {
        return allowEmpty
            ? { valid: true, value: null }
            : { valid: false, message: "Enter a number." };
    }
    const numeric = Number(text);
    if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(text) ||
        !Number.isFinite(numeric)) {
        return { valid: false, message: "Enter a finite number." };
    }
    return { valid: true, value: numeric };
}
function useNumberField(props) {
    var _a, _b;
    const [internalValue, setInternalValue] = React.useState((_a = props.defaultValue) !== null && _a !== void 0 ? _a : null);
    const value = props.value !== undefined ? props.value : internalValue;
    const [draft, setDraft] = React.useState(formatValue(value));
    const [error, setError] = React.useState(null);
    const [commitVersion, setCommitVersion] = React.useState(0);
    const bounds = {
        min: props.min,
        max: props.max,
        step: (_b = props.step) !== null && _b !== void 0 ? _b : 1,
    };
    const parsedDraft = parseDraft(draft, true);
    const steppingValue = parsedDraft.valid
        ? parsedDraft.value
        : value;
    const canIncrease = nextSteppedValue({ current: steppingValue, amount: 1, bounds }) !==
        steppingValue;
    const canDecrease = nextSteppedValue({ current: steppingValue, amount: -1, bounds }) !==
        steppingValue;
    React.useEffect(() => {
        setDraft(formatValue(value));
        setError(null);
    }, [value, commitVersion]);
    function restore() {
        setDraft(formatValue(value));
        setError(null);
    }
    function emit(next) {
        var _a, _b;
        setDraft(formatValue(next));
        setError(null);
        if (props.value === undefined) {
            setInternalValue(next);
        }
        if (next !== value) {
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, next);
        }
        (_b = props.onCommit) === null || _b === void 0 ? void 0 : _b.call(props, next);
        setCommitVersion((version) => version + 1);
    }
    function commit() {
        if (draft === formatValue(value) && error === null) {
            return;
        }
        const parsed = parseDraft(draft, props.emptyValue !== "reject");
        if (!parsed.valid) {
            setError(parsed.message);
            return;
        }
        emit(parsed.value === null ? null : normalizeValue(parsed.value, bounds));
    }
    function increment(amount) {
        const next = nextSteppedValue({
            current: steppingValue,
            amount,
            bounds,
        });
        if (next !== steppingValue) {
            emit(next);
        }
    }
    function onKeyDown(event) {
        if (event.key === "Escape") {
            event.preventDefault();
            restore();
        }
        if (event.key === "Enter") {
            const parsed = parseDraft(draft, props.emptyValue !== "reject");
            if (!parsed.valid) {
                event.preventDefault();
                setError(parsed.message);
                return;
            }
            if (draft !== formatValue(value)) {
                event.preventDefault();
            }
            commit();
        }
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            increment((event.key === "ArrowUp" ? 1 : -1) *
                (event.shiftKey ? SHIFT_STEP_MULTIPLIER : 1));
        }
    }
    function onTextChange(event) {
        setDraft(event.target.value);
        setError(null);
    }
    return {
        value,
        draft,
        canIncrease,
        canDecrease,
        error,
        commit,
        increment,
        onKeyDown,
        onTextChange,
    };
}
function StepButton({ direction, label, disabled, onStep, }) {
    return (<Button type="button" variant="outline" size="icon" aria-label={`${direction === -1 ? "Decrease" : "Increase"} ${label}`} disabled={disabled} onPointerDown={(event) => {
            event.preventDefault();
        }} onClick={() => onStep(direction)}>
      {direction === -1 ? (<MinusIcon aria-hidden="true"/>) : (<PlusIcon aria-hidden="true"/>)}
    </Button>);
}
export function NumberField(props) {
    var _a, _b, _c;
    const generatedId = React.useId();
    const id = (_a = props.id) !== null && _a !== void 0 ? _a : generatedId;
    const field = useNumberField(props);
    const describedBy = [
        props["aria-describedby"],
        props.help ? `${id}-help` : null,
        field.error ? `${id}-error` : null,
    ]
        .filter(Boolean)
        .join(" ");
    const actionLabel = typeof props.label === "string"
        ? props.label
        : ((_b = props["aria-label"]) !== null && _b !== void 0 ? _b : "value");
    return (<div className={cn("flex flex-col gap-2", props.className)} data-slot="number-field">
      {props.label && <Label htmlFor={id}>{props.label}</Label>}
      <div className="flex items-center gap-2">
        <StepButton direction={-1} label={actionLabel} disabled={Boolean(props.disabled) || !field.canDecrease} onStep={field.increment}/>
        <Input id={id} name={props.name} type="text" role="spinbutton" inputMode="decimal" autoComplete="off" value={field.draft} placeholder={props.placeholder} disabled={props.disabled} aria-label={props["aria-label"]} aria-labelledby={props["aria-labelledby"]} aria-describedby={describedBy || undefined} aria-invalid={Boolean(field.error) || Boolean(props.invalid)} aria-valuemin={props.min} aria-valuemax={props.max} aria-valuenow={(_c = field.value) !== null && _c !== void 0 ? _c : undefined} onChange={field.onTextChange} onBlur={field.commit} onKeyDown={field.onKeyDown}/>
        {props.unit && (<span className="text-sm text-muted-foreground">{props.unit}</span>)}
        <StepButton direction={1} label={actionLabel} disabled={Boolean(props.disabled) || !field.canIncrease} onStep={field.increment}/>
      </div>
      {props.help && (<p id={`${id}-help`} className="text-sm text-muted-foreground">
          {props.help}
        </p>)}
      {field.error && (<p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {field.error}
        </p>)}
    </div>);
}
