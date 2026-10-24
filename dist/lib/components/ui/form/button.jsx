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
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
            outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-sm": "size-8",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
function preventPendingActivation(event) {
    event.preventDefault();
    event.stopPropagation();
}
function getPendingChild({ children, pendingLabel, }) {
    if (!React.isValidElement(children)) {
        return children;
    }
    return React.cloneElement(children, Object.assign(Object.assign({ "aria-busy": true, "aria-disabled": true, tabIndex: -1, onClickCapture: preventPendingActivation }, (pendingLabel != null ? { children: pendingLabel } : {})), (children.type === "button" ? { disabled: true } : {})));
}
function Button(_a) {
    var { className, variant, size, asChild = false, pending = false, pendingLabel, children } = _a, props = __rest(_a, ["className", "variant", "size", "asChild", "pending", "pendingLabel", "children"]);
    const sharedProps = {
        "data-slot": "button",
        "aria-busy": pending || props["aria-busy"],
        className: cn(buttonVariants({ variant, size, className }), pending && "pointer-events-none opacity-50"),
    };
    const content = pending
        ? (pendingLabel !== null && pendingLabel !== void 0 ? pendingLabel : children)
        : children;
    if (asChild) {
        const child = pending
            ? getPendingChild({ children, pendingLabel })
            : children;
        return (<Slot {...props} {...sharedProps} aria-disabled={pending || props["aria-disabled"]} tabIndex={pending ? -1 : props.tabIndex} onClickCapture={pending ? preventPendingActivation : props.onClickCapture}>
        {child}
      </Slot>);
    }
    if (typeof props.href === "string") {
        return (<a {...props} {...sharedProps} aria-disabled={pending || props["aria-disabled"]} tabIndex={pending ? -1 : props.tabIndex} onClickCapture={pending ? preventPendingActivation : props.onClickCapture}>
        {content}
      </a>);
    }
    return (<button {...props} {...sharedProps} disabled={pending || props.disabled}>
      {content}
    </button>);
}
export { Button, buttonVariants };
