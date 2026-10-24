import React from "react";
import { cn } from "@/utils";

export type SectionHeadingProps = {
  children: React.ReactNode;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
  variant?: "default" | "compact";
  level?: "h2" | "h3";
  headingId?: string;
  headingRef?: React.Ref<HTMLHeadingElement>;
  tabIndex?: number;
};

export function SectionHeading({
  children,
  description,
  className,
  actions,
  variant = "default",
  level: Heading = "h3",
  headingId,
  headingRef,
  tabIndex,
}: SectionHeadingProps): React.JSX.Element {
  const compact: boolean = variant === "compact";
  return (
    <div
      className={cn(
        compact
          ? "flex flex-wrap items-center justify-between gap-2 text-foreground"
          : "border-b border-border pb-5 sm:flex sm:items-center sm:justify-between text-primary",
        className,
      )}
    >
      <div className={cn(compact && "min-w-0")}>
        <Heading
          id={headingId}
          ref={headingRef}
          tabIndex={tabIndex}
          className={
            compact ? "text-sm font-medium" : "text-base font-semibold"
          }
        >
          {children}
        </Heading>
        {description && (
          <p
            className={
              compact
                ? "mt-1 text-xs text-muted-foreground"
                : "mt-2 max-w-4xl text-sm"
            }
          >
            {description}
          </p>
        )}
      </div>

      {(!compact || actions) && (
        <div
          className={
            compact
              ? "flex flex-wrap items-center gap-2"
              : "mt-3 flex sm:mt-0 sm:ml-4"
          }
        >
          {actions}
        </div>
      )}
    </div>
  );
}
