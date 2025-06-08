import { cn } from "@/utils";
import React from "react";

export type HGroupSMProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupSM(props: HGroupSMProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-sm";
  return (
    <div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
