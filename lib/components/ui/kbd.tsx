import * as React from "react";
import { cn } from "@/utils";

export function Kbd({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.JSX.Element {
  return (
    <kbd
      {...props}
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground inline-flex min-h-5 min-w-5 items-center justify-center rounded border px-1.5 font-mono text-xs shadow-xs",
        className,
      )}
    />
  );
}
