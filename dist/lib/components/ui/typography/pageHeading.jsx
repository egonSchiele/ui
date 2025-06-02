import { cn } from "../../../utils";
import React from "react";
export function PageHeading({ children, accentText, accentColor = "text-chart-2", className, }) {
    return (<div className="min-w-0 flex flex-col gap-2">
      {accentText && (<p className={cn("text-base/7 font-semibold", accentColor)}>
          {accentText}
        </p>)}
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">
        {children}
      </h1>
    </div>);
}
