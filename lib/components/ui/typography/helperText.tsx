import React from "react";
import { cn } from "@/utils";

export type HelperTextProps = React.ComponentProps<"p">;

export function HelperText({
  className,
  ...props
}: HelperTextProps): React.JSX.Element {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}
