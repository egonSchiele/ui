import { cn } from "../../../utils.js";
import React from "react";

export type VGroupMDProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupMD({ children, className = "", ...rest }: VGroupMDProps) {
  const sizeClass = "gap-md";
  return (
    <div
      className={cn(`flex flex-col`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
