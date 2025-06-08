import { cn } from "@/utils";
import React from "react";

export type VGroupLGProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroupLG(props: VGroupLGProps) {
  const { children, className = "" } = props;
  const sizeClass = "gap-lg";
  return (
    <div className={cn(`flex flex-col`, sizeClass, className)} {...props}>
      {children}
    </div>
  );
}
