import React from "react";
export type ParagraphProps = {
    children: string | React.ReactNode;
    className?: string;
} & Record<string, any>;
export declare function Paragraph(props: ParagraphProps): React.JSX.Element;
