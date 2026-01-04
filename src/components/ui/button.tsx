import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

// Assuming a utility function 'cn' (combining clsx and twMerge) exists in 'lib/utils'
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-facebook-blue text-white shadow hover:bg-facebook-blue/90 focus-visible:ring-facebook-blue",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-600",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-gray-300",
        secondary:
          "bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:ring-gray-300",
        ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-200",
        link: "text-facebook-blue underline-offset-4 hover:underline focus-visible:ring-transparent",
        dark: "bg-gray-800 text-white hover:bg-gray-700 shadow focus-visible:ring-gray-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
      loading: {
        true: "cursor-not-allowed pointer-events-none opacity-80",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, loading: isLoading, className })
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };