import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
export type SwitchProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    required?: boolean;
    onCheckedChange?(checked: boolean): void;
};
declare function Switch({ className, ...props }: SwitchProps & React.ComponentProps<typeof SwitchPrimitive.Root>): React.JSX.Element;
export { Switch };
