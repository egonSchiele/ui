import React from "react";
export type SectionHeadingProps = {
    children: React.ReactNode;
    description?: string;
    className?: string;
    actions?: React.ReactNode;
    variant?: "default" | "compact";
    level?: "h2" | "h3";
    headingId?: string;
    headingRef?: React.Ref<HTMLHeadingElement>;
    tabIndex?: number;
};
export declare function SectionHeading({ children, description, className, actions, variant, level: Heading, headingId, headingRef, tabIndex, }: SectionHeadingProps): React.JSX.Element;
