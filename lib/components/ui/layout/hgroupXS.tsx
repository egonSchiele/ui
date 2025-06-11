import { cn } from "../../../utils.js";
import React from "react";

export type HGroupXSProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupXS({ children, className = "", ...rest }: HGroupXSProps) {
  const sizeClass = "gap-xs";
  return (
    <div
      className={cn(`flex flex-row`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
