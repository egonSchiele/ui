import { cn } from "@/utils";
import React from "react";

export type HGroupMDProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupMD(props: HGroupMDProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-md";
  return (
    <div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
