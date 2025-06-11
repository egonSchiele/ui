import { cn } from "../../../utils.js";
import React from "react";

export type VGroupLGProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupLG({ children, className = "", ...rest }: VGroupLGProps) {
  const sizeClass = "gap-lg";
  return (
    <div
      className={cn(`flex flex-col`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
