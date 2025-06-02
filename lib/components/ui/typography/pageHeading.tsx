import { cn } from "@/utils";
import React from "react";
export function PageHeading({
  text,
  accentText,
  className,
}: {
  text: string;
  accentText?: string;
  className?: string;
}) {
  return (
    <div className="min-w-0 flex flex-col gap-2">
      {accentText && (
        <p className="text-base/7 font-semibold text-chart-1">{accentText}</p>
      )}
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">
        {text}
      </h1>
    </div>
  );
}
