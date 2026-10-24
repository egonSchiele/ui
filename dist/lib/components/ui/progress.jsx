var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../utils";
export function Progress(_a) {
    var { label, value, max = 100, showValue = false, className, indicatorClassName, containerClassName } = _a, props = __rest(_a, ["label", "value", "max", "showValue", "className", "indicatorClassName", "containerClassName"]);
    const maximum = Number.isFinite(max) && max > 0 ? max : 100;
    const current = typeof value === "number" && Number.isFinite(value)
        ? Math.min(maximum, Math.max(0, value))
        : null;
    const percentage = current === null ? null : (current / maximum) * 100;
    return (<div className={cn("w-full", containerClassName)} data-slot="progress-container">
      <ProgressPrimitive.Root {...props} data-slot="progress" aria-label={label} value={current} max={maximum} className={cn("bg-secondary relative h-2 w-full overflow-hidden rounded-full", className)}>
        <ProgressPrimitive.Indicator data-slot="progress-indicator" className={cn("bg-primary h-full transition-[width] motion-reduce:transition-none", current === null &&
            "w-1/3 animate-pulse motion-reduce:animate-none", indicatorClassName)} style={percentage === null ? undefined : { width: `${percentage}%` }}/>
      </ProgressPrimitive.Root>
      {showValue && (<span className="text-muted-foreground mt-1 block text-right text-xs" aria-hidden="true">
          {percentage === null ? "In progress" : `${Math.round(percentage)}%`}
        </span>)}
    </div>);
}
