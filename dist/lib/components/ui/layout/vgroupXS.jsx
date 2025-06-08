import { cn } from "../../../utils";
import React from "react";
export function VGroupXS(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-xs";
    return (<div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
