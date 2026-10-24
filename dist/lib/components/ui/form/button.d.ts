import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "sm" | "lg" | "default" | "icon" | "icon-sm" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    pending?: boolean;
    pendingLabel?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};
type ButtonAsButtonProps = ButtonBaseProps & Omit<React.ComponentProps<"button">, "asChild" | "onClick"> & {
    href?: never;
};
type ButtonAsLinkProps = ButtonBaseProps & Omit<React.ComponentProps<"a">, "asChild" | "onClick"> & {
    href: string;
};
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
declare function Button({ className, variant, size, asChild, pending, pendingLabel, children, ...props }: ButtonProps): React.JSX.Element;
export { Button, buttonVariants };
