import React from "react";
export function HGroupMD(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-md";
    return (<div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
