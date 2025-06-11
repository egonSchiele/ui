import { cn } from "../../../utils.js";
import React from "react";

export type HGroupMDProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupMD({ children, className = "", ...rest }: HGroupMDProps) {
  const sizeClass = "gap-md";
  return (
    <div
      className={cn(`flex flex-row`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
