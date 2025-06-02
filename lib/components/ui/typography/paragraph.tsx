import { cn } from "@/utils";
import React from "react";
export type ParagraphProps = {
  children: string | React.ReactNode;
  className?: string;
} & Record<string, any>;

export function Paragraph(props: ParagraphProps) {
  const { children, className } = props;
  return (
    <p
      className={cn("max-w-3xl text-base/7 text-primary/90", className || "")}
      {...props}
    >
      {children}
    </p>
  );
}
