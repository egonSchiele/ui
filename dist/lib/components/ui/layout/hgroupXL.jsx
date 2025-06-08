import React from "react";
export function HGroupXL(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-xl";
    return (<div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
