import React from "react";
export function VGroupSM(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-sm";
    return (<div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
