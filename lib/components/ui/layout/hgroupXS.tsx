import { cn } from "@/utils";
import React from "react";

export type HGroupXSProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupXS(props: HGroupXSProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-xs";
  return (
    <div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
