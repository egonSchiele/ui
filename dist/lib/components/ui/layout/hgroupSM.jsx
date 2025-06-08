import React from "react";
export function HGroupSM(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-sm";
    return (<div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
