import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B10] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#00A3FF] text-[#080B10] font-bold hover:bg-[#00D2FF] shadow-[0_0_20px_rgba(0,163,255,0.35)] hover:shadow-[0_0_28px_rgba(0,163,255,0.55)]",
        cyber:
          "bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold hover:brightness-110 shadow-[0_0_24px_rgba(0,163,255,0.4)] hover:shadow-[0_0_32px_rgba(0,163,255,0.65)]",
        studio:
          "bg-gradient-to-r from-[#0066FF] via-[#00A3FF] to-[#00D2FF] text-white font-bold border border-white/20 shadow-[0_0_25px_rgba(0,163,255,0.35)] hover:shadow-[0_0_35px_rgba(0,163,255,0.6)] hover:brightness-110 active:scale-[0.98]",
        pill:
          "rounded-full bg-[#182030]/90 border border-white/10 text-slate-200 hover:border-[#00A3FF]/40 hover:text-white hover:bg-[#1E293B] shadow-sm",
        destructive:
          "bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 hover:border-red-500/50",
        outline:
          "border border-white/10 bg-[#0F141C]/80 backdrop-blur-md text-white hover:bg-white/5 hover:border-[#00A3FF]/40 hover:text-[#00A3FF]",
        secondary:
          "bg-[#182030] text-white hover:bg-[#1E293B] border border-white/5 hover:border-white/10",
        ghost:
          "text-slate-300 hover:bg-white/5 hover:text-white",
        link:
          "text-[#00A3FF] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-5 py-2.5 min-h-[44px]",
        sm: "h-9 rounded-lg px-3 text-xs min-h-[36px]",
        lg: "h-13 rounded-2xl px-8 text-base min-h-[48px]",
        icon: "size-11 min-h-[44px] min-w-[44px] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
