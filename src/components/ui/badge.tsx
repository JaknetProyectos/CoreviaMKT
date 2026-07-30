import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.13em] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#56c5a8]/20 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#102e28] text-[#d8ff65] shadow-[0_8px_20px_-12px_rgba(16,46,40,0.75)] hover:-translate-y-0.5 hover:bg-[#168267]",

        secondary:
          "border-[#168267]/10 bg-[#e5f4ee] text-[#168267] hover:border-[#168267]/20 hover:bg-[#d8eee6]",

        destructive:
          "border-transparent bg-[#c54f3d] text-white shadow-[0_8px_20px_-12px_rgba(197,79,61,0.75)] hover:-translate-y-0.5 hover:bg-[#a83f31]",

        outline:
          "border-[#102e28]/15 bg-transparent text-[#102e28]/65 hover:border-[#168267]/35 hover:bg-[#e5f4ee] hover:text-[#168267]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };