import { cn } from "@/utils";
import React from "react";

export type VGroupXSProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupXS(props: VGroupXSProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-xs";
  return (
    <div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
