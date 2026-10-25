import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Render as an anchor tag if an href is provided and as a button otherwise.
type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  pending?: boolean;
  pendingLabel?: React.ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
};

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<React.ComponentProps<"button">, "asChild" | "onClick"> & {
    href?: never;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<React.ComponentProps<"a">, "asChild" | "onClick"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function preventPendingActivation(event: React.MouseEvent<HTMLElement>): void {
  event.preventDefault();
  event.stopPropagation();
}

function getPendingChild({
  children,
  pendingLabel,
}: {
  children: React.ReactNode;
  pendingLabel: React.ReactNode;
}): React.ReactNode {
  if (
    !React.isValidElement<
      React.HTMLAttributes<HTMLElement> & { disabled?: boolean }
    >(children)
  ) {
    return children;
  }
  return React.cloneElement(children, {
    "aria-busy": true,
    "aria-disabled": true,
    tabIndex: -1,
    onClickCapture: preventPendingActivation,
    ...(pendingLabel != null ? { children: pendingLabel } : {}),
    ...(children.type === "button" ? { disabled: true } : {}),
  });
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  pending = false,
  pendingLabel,
  children,
  ...props
}: ButtonProps): React.JSX.Element {
  const sharedProps: {
    "data-slot": string;
    "aria-busy": React.AriaAttributes["aria-busy"];
    className: string;
  } = {
    "data-slot": "button",
    "aria-busy": pending || props["aria-busy"],
    className: cn(
      buttonVariants({ variant, size, className }),
      pending && "pointer-events-none opacity-50",
    ),
  };
  const content: React.ReactNode = pending
    ? (pendingLabel ?? children)
    : children;

  if (asChild) {
    const child: React.ReactNode = pending
      ? getPendingChild({ children, pendingLabel })
      : children;
    return (
      <Slot
        {...props}
        {...sharedProps}
        aria-disabled={pending || props["aria-disabled"]}
        tabIndex={pending ? -1 : props.tabIndex}
        onClickCapture={
          pending ? preventPendingActivation : props.onClickCapture
        }
      >
        {child}
      </Slot>
    );
  }

  if (typeof props.href === "string") {
    return (
      <a
        {...props}
        {...sharedProps}
        aria-disabled={pending || props["aria-disabled"]}
        tabIndex={pending ? -1 : props.tabIndex}
        onClickCapture={
          pending ? preventPendingActivation : props.onClickCapture
        }
      >
        {content}
      </a>
    );
  }

  // A pending button stays enabled so it keeps keyboard focus. Disabling a
  // focused button moves focus to the page body.
  return (
    <button
      {...props}
      {...sharedProps}
      aria-disabled={pending || props["aria-disabled"]}
      onClickCapture={pending ? preventPendingActivation : props.onClickCapture}
    >
      {content}
    </button>
  );
}

export { Button, buttonVariants };
