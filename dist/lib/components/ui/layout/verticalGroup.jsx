import { cn, gapClassFromSize } from "../../../utils";
import React from "react";
export function VerticalGroup(props) {
    const { children, className = "", size = "xs" } = props;
    const sizeClass = gapClassFromSize(size);
    return (<div className={cn(`flex flex-col items-start`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
