import { cn, gapClassFromSize } from "@/utils";
import React from "react";

export type VerticalGroupProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  [key: string]: any;
};

export function VerticalGroup(props: VerticalGroupProps) {
  const { children, className = "", size = "xs" } = props;
  const sizeClass = gapClassFromSize(size);
  return (
    <div
      className={cn(`flex flex-col items-start`, sizeClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}
