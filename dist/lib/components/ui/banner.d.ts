import React from "react";
export type BannerStyle = "info" | "error";
export type BannerProps = Omit<React.ComponentProps<"div">, "style"> & {
    style?: BannerStyle;
    onDismiss?: () => void;
};
export declare function Banner({ style, children, className, onDismiss, ...props }: BannerProps): React.JSX.Element;
