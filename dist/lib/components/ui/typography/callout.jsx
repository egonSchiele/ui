import { cn } from "../../../utils";
import React from "react";
export function Callout(props) {
    const { text, className } = props;
    return (<p className={cn("text-xl/8 text-primary/90", className || "")} {...props}>
      {text}
    </p>);
}
