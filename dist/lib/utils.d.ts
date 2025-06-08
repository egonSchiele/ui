import { type ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
declare const gapFromSize: {
    readonly xs: "gap-xs";
    readonly sm: "gap-sm";
    readonly md: "gap-md";
    readonly lg: "gap-lg";
    readonly xl: "gap-xl";
    readonly "2xl": "gap-2xl";
    readonly "3xl": "gap-3xl";
    readonly "4xl": "gap-4xl";
};
export type Size = keyof typeof gapFromSize;
export declare function gapClassFromSize(size: Size): string;
export {};
