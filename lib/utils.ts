import { clsx, type ClassValue } from "clsx";
import { twMerge, extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  // @ts-ignore
  theme: {
    spacing: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

const gapFromSize = {
  xs: "gap-xs",
  sm: "gap-sm",
  md: "gap-md",
  lg: "gap-lg",
  xl: "gap-xl",
  "2xl": "gap-2xl",
  "3xl": "gap-3xl",
  "4xl": "gap-4xl",
} as const;
export type Size = keyof typeof gapFromSize;

export function gapClassFromSize(size: Size): string {
  return gapFromSize[size] || "gap-xs";
}
