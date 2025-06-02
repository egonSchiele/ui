import { cn } from "../../../utils";
import React from "react";
export function Paragraph(props) {
    const { text, className } = props;
    return (<p className={cn("mx-auto max-w-3xl text-base/7 text-primary/90", className || "")} {...props}>
      {text}
    </p>);
}
