import { cn } from "../../../utils.js";
import React from "react";

export type VGroupXLProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupXL({ children, className = "", ...rest }: VGroupXLProps) {
  const sizeClass = "gap-xl";
  return (
    <div
      className={cn(`flex flex-col`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
