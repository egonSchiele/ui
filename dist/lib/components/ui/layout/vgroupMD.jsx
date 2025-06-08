import { cn } from "../../../utils";
import React from "react";
export function VGroupMD(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-md";
    return (<div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
