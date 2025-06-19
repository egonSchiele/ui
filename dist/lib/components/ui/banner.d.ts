import React from "react";
export type BannerStyle = "info" | "error";
export declare function Banner({ style, children, className, onDismiss, }: {
    style?: BannerStyle;
    children?: React.ReactNode | string;
    className?: string;
    onDismiss?: () => void;
}): React.JSX.Element;
