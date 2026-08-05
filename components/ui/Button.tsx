import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-accent px-6 py-3 text-sm text-text-primary hover:bg-[color-mix(in_srgb,var(--color-accent)_85%,var(--color-dark-bg))]",
        secondary:
          "rounded-full border border-accent-alt/40 bg-transparent px-6 py-3 text-sm text-text-secondary hover:border-accent-alt hover:text-accent-alt",
        ghost:
          "rounded-none bg-transparent px-0 py-2 text-sm text-text-secondary link-sweep",
        onDark:
          "rounded-full bg-accent-on-dark px-6 py-3 text-sm text-dark-bg hover:bg-highlight-on-dark",
        onDarkSecondary:
          "rounded-full border border-on-dark/30 bg-transparent px-6 py-3 text-sm text-on-dark hover:border-accent-on-dark hover:text-accent-on-dark",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-9 px-4 text-xs",
        lg: "min-h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
