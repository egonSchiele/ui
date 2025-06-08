import React from "react";
export function VGroupLG(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-lg";
    return (<div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
