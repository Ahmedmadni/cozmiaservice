import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  /*
   * إحساس الزر: يرتفع عند التحويم وينضغط عند اللمس. الضغط أسرع بكثير
   * من الارتفاع (90ms مقابل 250ms) — الاستجابة الفورية هي ما يجعل
   * الزر يبدو ماديًا، بينما العودة البطيئة تجعله يبدو ثقيلًا لا هشًّا.
   */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer select-none transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.965] active:duration-[90ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-all [&_svg]:duration-[450ms] [&_svg]:ease-[cubic-bezier(0.22,1,0.36,1)]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [box-shadow:var(--shadow-md)] hover:[box-shadow:var(--shadow-lg)] hover:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground [box-shadow:var(--shadow-sm)] hover:bg-destructive/90",
        outline:
          "border border-border/70 bg-card text-foreground [box-shadow:var(--shadow-sm)] hover:border-accent/50 hover:text-accent hover:bg-accent-soft/40",
        secondary:
          "bg-secondary text-secondary-foreground [box-shadow:var(--shadow-sm)] hover:bg-secondary/70",
        ghost: "text-foreground/80 hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
