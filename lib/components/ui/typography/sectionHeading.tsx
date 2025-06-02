import React from "react";
import { cn } from "@/utils";
export function SectionHeading({
  text,
  description,
  className,
  actions,
}: {
  text: string;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-primary-foreground">
          {text}
        </h3>
        {description && (
          <p className="mt-2 max-w-4xl text-sm text-gray-500">{description}</p>
        )}
      </div>

      <div className="mt-3 flex sm:mt-0 sm:ml-4">{actions}</div>
    </div>
  );
}
