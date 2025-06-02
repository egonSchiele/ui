import { cn } from "@/utils";
import React from "react";
export type CalloutProps = {
  text: string;
  className?: string;
} & Record<string, any>;

export function Callout(props: CalloutProps) {
  const { text, className } = props;
  return (
    <p className={cn("text-xl/8 text-primary/90", className || "")} {...props}>
      {text}
    </p>
  );
}
