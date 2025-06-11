import { cn } from "../../../utils.js";
import React from "react";

export type VGroupSMProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupSM({ children, className = "", ...rest }: VGroupSMProps) {
  const sizeClass = "gap-sm";
  return (
    <div
      className={cn(`flex flex-col`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
