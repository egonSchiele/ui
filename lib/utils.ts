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
