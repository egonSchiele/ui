import React from "react";
export function VGroupXL(props) {
    const { children, className = "" } = props;
    const sizeClass = "gap-xl";
    return (<div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>);
}
