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
import React from "react";
import { cn } from "../../utils";
import { XMarkIcon } from "@heroicons/react/20/solid";
export function Banner(_a) {
    var { style, children, className, onDismiss } = _a, props = __rest(_a, ["style", "children", "className", "onDismiss"]);
    const textColor = style === "error"
        ? "text-destructive-foreground"
        : "text-primary-foreground";
    return (<div {...props} className={cn("flex w-full items-center gap-x-6 px-6 py-2.5 sm:px-3.5", style === "error" && "bg-destructive text-destructive-foreground", style === "info" && "bg-primary text-primary-foreground", className)}>
      <div className={cn("min-w-0 flex-1 text-sm/6", textColor)}>
        {children}
      </div>
      {onDismiss && (<div className="flex shrink-0 justify-end">
          <button type="button" className="-m-3 p-3 focus-visible:-outline-offset-4" onClick={onDismiss}>
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className={cn("size-5 ", textColor)}/>
          </button>
        </div>)}
    </div>);
}
