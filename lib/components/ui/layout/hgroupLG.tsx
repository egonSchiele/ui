import { cn } from "../../../utils.js";
import React from "react";

export type HGroupLGProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupLG({ children, className = "", ...rest }: HGroupLGProps) {
  const sizeClass = "gap-lg";
  return (
    <div
      className={cn(`flex flex-row`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
