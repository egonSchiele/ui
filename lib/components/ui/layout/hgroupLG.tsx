import { cn } from "@/utils";
import React from "react";

export type HGroupLGProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroupLG(props: HGroupLGProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-lg";
  return (
    <div className={cn(`flex flex-row`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
