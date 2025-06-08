import { cn } from "@/utils";
import React from "react";

export type VGroupXLProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupXL(props: VGroupXLProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-xl";
  return (
    <div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
