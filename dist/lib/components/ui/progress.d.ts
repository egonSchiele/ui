import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
export type ProgressProps = Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "value" | "max" | "children"> & {
    label: string;
    value?: number | null;
    max?: number;
    showValue?: boolean;
};
export declare function Progress({ label, value, max, showValue, className, ...props }: ProgressProps): React.JSX.Element;
