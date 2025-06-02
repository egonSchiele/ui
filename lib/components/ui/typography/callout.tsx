import { cn } from "@/utils";
import React from "react";

type CalloutProps = {
  children: string | React.ReactNode;
  className?: string;
} & Record<string, any>;

export function Callout(props: CalloutProps) {
  const { children, className } = props;
  return (
    <p className={cn("text-xl/8 text-primary/90", className || "")} {...props}>
      {children}
    </p>
  );
}
