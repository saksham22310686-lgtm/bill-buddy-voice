import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const glassCardVariants = cva(
  "glass rounded-2xl transition-smooth",
  {
    variants: {
      variant: {
        default: "p-6",
        compact: "p-4",
        floating: "p-6 hover:scale-105 cursor-pointer",
        glow: "p-6 glow-primary",
      },
      size: {
        default: "",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        full: "w-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(glassCardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard, glassCardVariants };