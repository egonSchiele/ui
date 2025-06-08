import React from "react";
export function HGroupXS(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-xs";
    return (<div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
