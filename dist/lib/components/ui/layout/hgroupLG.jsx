import React from "react";
export function HGroupLG(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-lg";
    return (<div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
