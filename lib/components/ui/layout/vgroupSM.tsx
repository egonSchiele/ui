import { cn } from "@/utils";
import React from "react";

export type VGroupSMProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupSM(props: VGroupSMProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-sm";
  return (
    <div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
