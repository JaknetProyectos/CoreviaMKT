import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono text-[0.76rem] font-bold uppercase tracking-[0.1em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#56c5a8]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 active:translate-y-[1px] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-[#d8ff65] text-[#102e28] shadow-[0_12px_28px_-16px_rgba(16,46,40,0.65)] hover:-translate-y-0.5 hover:bg-[#102e28] hover:text-white hover:shadow-[0_18px_38px_-18px_rgba(16,46,40,0.75)]",

        secondary:
          "border border-transparent bg-[#102e28] text-white shadow-[0_12px_28px_-16px_rgba(16,46,40,0.75)] hover:-translate-y-0.5 hover:bg-[#168267] hover:shadow-[0_18px_38px_-18px_rgba(22,130,103,0.65)]",

        cream:
          "border border-[#102e28]/10 bg-white text-[#102e28] shadow-[0_12px_28px_-18px_rgba(16,46,40,0.35)] hover:-translate-y-0.5 hover:border-[#56c5a8]/40 hover:bg-[#f3f6f2]",

        outline:
          "border-[1.5px] border-[#102e28]/20 bg-transparent text-[#102e28] hover:-translate-y-0.5 hover:border-[#102e28] hover:bg-[#102e28] hover:text-white",

        "outline-cream":
          "border-[1.5px] border-white/35 bg-transparent text-white hover:-translate-y-0.5 hover:border-[#d8ff65] hover:bg-[#d8ff65] hover:text-[#102e28]",

        ghost:
          "border border-transparent bg-transparent text-[#102e28] shadow-none hover:bg-[#e5f4ee] hover:text-[#168267]",

        destructive:
          "border border-transparent bg-[#c54f3d] text-white shadow-[0_12px_28px_-16px_rgba(197,79,61,0.65)] hover:-translate-y-0.5 hover:bg-[#a83f31]",

        link:
          "h-auto rounded-none border-0 bg-transparent p-0 normal-case tracking-normal text-[#168267] shadow-none underline-offset-4 hover:text-[#102e28] hover:underline",
      },

      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-[0.7rem]",
        lg: "h-14 px-8 text-[0.8rem]",
        xl: "h-16 px-10 text-[0.84rem]",
        icon: "h-10 w-10 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };