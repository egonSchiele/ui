import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
export type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;
export type RadioGroupItemProps = Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, "asChild" | "children">;
declare function RadioGroup({ className, ...props }: RadioGroupProps): React.JSX.Element;
declare function RadioGroupItem({ className, ...props }: RadioGroupItemProps): React.JSX.Element;
export { RadioGroup, RadioGroupItem };
