import { cn } from "../../../utils.js";
import React from "react";

export type HGroupXLProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupXL({ children, className = "", ...rest }: HGroupXLProps) {
  const sizeClass = "gap-xl";
  return (
    <div
      className={cn(`flex flex-row`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
