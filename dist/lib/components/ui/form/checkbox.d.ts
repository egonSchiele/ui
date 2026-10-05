import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
export type CheckboxProps = Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "asChild" | "children">;
declare function Checkbox({ className, ...props }: CheckboxProps): React.JSX.Element;
export { Checkbox };
