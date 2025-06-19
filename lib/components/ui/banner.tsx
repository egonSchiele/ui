import React from "react";
import { cn } from "@/utils";
import { XMarkIcon } from "@heroicons/react/20/solid";

export type BannerStyle = "info" | "error";

export function Banner({
  style,
  children,
  className,
  onDismiss,
}: {
  style?: BannerStyle;
  children?: React.ReactNode | string;
  className?: string;
  onDismiss?: () => void;
}) {
  const textColor =
    style === "error"
      ? "text-destructive-foreground"
      : "text-primary-foreground";
  return (
    <div
      className={cn(
        "flex items-center gap-x-6  px-6 py-2.5 sm:px-3.5 sm:before:flex-1",
        style === "error" && "bg-destructive text-destructive-foreground",
        style === "info" && "bg-primary text-primary-foreground",
        className
      )}
    >
      <p className={cn("text-sm/6 ", textColor)}>{children}</p>
      {onDismiss && (
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:-outline-offset-4"
            onClick={onDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon
              aria-hidden="true"
              className={cn("size-5 ", textColor)}
            />
          </button>
        </div>
      )}
    </div>
  );
}
