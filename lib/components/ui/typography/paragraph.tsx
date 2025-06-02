import { cn } from "@/utils";
import React from "react";
export type ParagraphProps = {
  text: string;
  className?: string;
} & Record<string, any>;

export function Paragraph(props: ParagraphProps) {
  const { text, className } = props;
  return (
    <p
      className={cn(
        "mx-auto max-w-3xl text-base/7 text-primary/90",
        className || ""
      )}
      {...props}
    >
      {text}
    </p>
  );
}
