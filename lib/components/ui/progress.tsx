import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/utils";

export type ProgressProps = Omit<
  React.ComponentProps<typeof ProgressPrimitive.Root>,
  "value" | "max" | "children"
> & {
  label: string;
  value?: number | null;
  max?: number;
  showValue?: boolean;
  indicatorClassName?: string;
  containerClassName?: string;
};

export function Progress({
  label,
  value,
  max = 100,
  showValue = false,
  className,
  indicatorClassName,
  containerClassName,
  ...props
}: ProgressProps): React.JSX.Element {
  const maximum: number = Number.isFinite(max) && max > 0 ? max : 100;
  const current: number | null =
    typeof value === "number" && Number.isFinite(value)
      ? Math.min(maximum, Math.max(0, value))
      : null;
  const percentage: number | null =
    current === null ? null : (current / maximum) * 100;
  return (
    <div
      className={cn("w-full", containerClassName)}
      data-slot="progress-container"
    >
      <ProgressPrimitive.Root
        {...props}
        data-slot="progress"
        aria-label={label}
        value={current}
        max={maximum}
        className={cn(
          "bg-secondary relative h-2 w-full overflow-hidden rounded-full",
          className,
        )}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "bg-primary h-full transition-[width] motion-reduce:transition-none",
            current === null &&
              "w-1/3 animate-pulse motion-reduce:animate-none",
            indicatorClassName,
          )}
          style={percentage === null ? undefined : { width: `${percentage}%` }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <span
          className="text-muted-foreground mt-1 block text-right text-xs"
          aria-hidden="true"
        >
          {percentage === null ? "In progress" : `${Math.round(percentage)}%`}
        </span>
      )}
    </div>
  );
}
