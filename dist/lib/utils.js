import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
const customTwMerge = extendTailwindMerge({
    // @ts-ignore
    theme: {
        spacing: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
});
export function cn(...inputs) {
    return customTwMerge(clsx(inputs));
}
