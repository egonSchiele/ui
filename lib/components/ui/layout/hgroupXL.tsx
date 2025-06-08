import { cn } from "@/utils";
import React from "react";

export type HGroupXLProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupXL(props: HGroupXLProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-xl";
  return (
    <div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
