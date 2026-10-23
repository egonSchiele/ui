import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
export type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
    viewportRef?: React.Ref<HTMLDivElement>;
    viewportProps?: Omit<React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>, "children" | "ref">;
    orientation?: "vertical" | "horizontal" | "both";
};
export declare function ScrollArea({ children, className, viewportRef, viewportProps, orientation, ...props }: ScrollAreaProps): React.JSX.Element;
export declare function ScrollBar({ className, orientation, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>): React.JSX.Element;
