import { cn } from "../../../utils";
import React from "react";
export function PageHeading2({ children, className, actions, }) {
    return (<div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className={cn("text-2xl/7 font-bold text-primary sm:truncate sm:text-3xl sm:tracking-tight", className)}>
          {children}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">{actions}</div>
    </div>);
}
