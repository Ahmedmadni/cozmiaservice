import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground transition-[border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] resize-y hover:border-accent/40 focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/15 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
