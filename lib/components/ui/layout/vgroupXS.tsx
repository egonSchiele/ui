import { cn } from "../../../utils.js";
import React from "react";

export type VGroupXSProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupXS({ children, className = "", ...rest }: VGroupXSProps) {
  const sizeClass = "gap-xs";
  return (
    <div
      className={cn(`flex flex-col`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
