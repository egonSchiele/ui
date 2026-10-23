"use client";
import * as React from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/form/button";
import { Input } from "../../../components/ui/form/input";
import { Label } from "../../../components/ui/form/label";
import { cn } from "../../../utils";
function formatValue(value) {
    return value === null ? "" : String(value);
}
function normalizeValue(value, { min, max, step }) {
    const base = min !== null && min !== void 0 ? min : 0;
    const bounded = Math.min(max !== null && max !== void 0 ? max : Infinity, Math.max(min !== null && min !== void 0 ? min : -Infinity, value));
    const aligned = base + Math.round((bounded - base) / step) * step;
    const rounded = Number((Number.isFinite(aligned) ? aligned : bounded).toFixed(12));
    return Math.min(max !== null && max !== void 0 ? max : Infinity, Math.max(min !== null && min !== void 0 ? min : -Infinity, rounded));
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
    var _a, _b, _c;
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
    const steppingValue = parsedDraft.valid && parsedDraft.value !== null
        ? parsedDraft.value
        : ((_c = value !== null && value !== void 0 ? value : props.min) !== null && _c !== void 0 ? _c : 0);
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
        const next = steppingValue + amount * bounds.step;
        if (Number.isFinite(next)) {
            emit(normalizeValue(next, bounds));
        }
    }
    function onKeyDown(event) {
        if (event.key === "Escape") {
            event.preventDefault();
            restore();
        }
        if (event.key === "Enter") {
            event.preventDefault();
            commit();
        }
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            increment((event.key === "ArrowUp" ? 1 : -1) * (event.shiftKey ? 10 : 1));
        }
    }
    function onTextChange(event) {
        setDraft(event.target.value);
        setError(null);
    }
    return {
        value,
        draft,
        steppingValue,
        error,
        commit,
        increment,
        onKeyDown,
        onTextChange,
    };
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
        <Button type="button" variant="outline" size="icon" aria-label={`Decrease ${actionLabel}`} disabled={props.disabled ||
            (props.min !== undefined && field.steppingValue <= props.min)} onPointerDown={(event) => event.preventDefault()} onClick={() => field.increment(-1)}>
          <MinusIcon aria-hidden="true"/>
        </Button>
        <Input id={id} name={props.name} type="text" role="spinbutton" inputMode="decimal" autoComplete="off" value={field.draft} placeholder={props.placeholder} disabled={props.disabled} aria-label={props["aria-label"]} aria-labelledby={props["aria-labelledby"]} aria-describedby={describedBy || undefined} aria-invalid={Boolean(field.error)} aria-valuemin={props.min} aria-valuemax={props.max} aria-valuenow={(_c = field.value) !== null && _c !== void 0 ? _c : undefined} onChange={field.onTextChange} onBlur={field.commit} onKeyDown={field.onKeyDown}/>
        {props.unit && (<span className="text-sm text-muted-foreground">{props.unit}</span>)}
        <Button type="button" variant="outline" size="icon" aria-label={`Increase ${actionLabel}`} disabled={props.disabled ||
            (props.max !== undefined && field.steppingValue >= props.max)} onPointerDown={(event) => event.preventDefault()} onClick={() => field.increment(1)}>
          <PlusIcon aria-hidden="true"/>
        </Button>
      </div>
      {props.help && (<p id={`${id}-help`} className="text-sm text-muted-foreground">
          {props.help}
        </p>)}
      {field.error && (<p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {field.error}
        </p>)}
    </div>);
}
