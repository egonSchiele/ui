import React from "react";
export type VerticalGroupProps = {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
    [key: string]: any;
};
export declare function VerticalGroup(props: VerticalGroupProps): React.JSX.Element;
