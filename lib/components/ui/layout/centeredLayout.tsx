import { cn } from "@/utils";
import React from "react";
export function CenteredLayout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="bg-background px-6 py-32 lg:px-8">
      <div
        className={cn(
          "mx-auto max-w-3xl text-base/7 text-primary/90",
          className || ""
        )}
      >
        {children}
      </div>
    </div>
  );
}
