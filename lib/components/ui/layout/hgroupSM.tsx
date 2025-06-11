import { cn } from "../../../utils.js";
import React from "react";

export type HGroupSMProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupSM({ children, className = "", ...rest }: HGroupSMProps) {
  const sizeClass = "gap-sm";
  return (
    <div
      className={cn(`flex flex-row`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
