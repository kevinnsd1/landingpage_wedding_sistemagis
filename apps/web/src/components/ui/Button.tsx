import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg select-none outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98] [&_svg]:shrink-0 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[#263238] text-white hover:bg-[#37474F] focus:ring-[#263238]/30",
        primary: "bg-[#FCBACB] text-[#263238] font-semibold hover:bg-[#FC9FB1] focus:ring-[#FCBACB] shadow-xs",
        secondary: "bg-transparent border border-[#FCBACB] text-[#D96F88] hover:bg-[#FFF0F3] focus:ring-[#FCBACB]",
        outline: "bg-white border border-[#E8E8E8] text-[#263238] hover:bg-neutral-50 hover:border-neutral-300 focus:ring-neutral-200",
        ghost: "bg-transparent text-[#263238] hover:bg-[#FFF0F3] hover:text-[#D96F88]",
        danger: "bg-[#D9536F] text-white hover:bg-rose-600 focus:ring-rose-300 shadow-xs",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-sm px-4 py-2 gap-2 h-10",
        xs: "text-xs px-2.5 py-1 gap-1 h-7",
        sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
        md: "text-sm px-4 py-2 gap-2 h-10",
        lg: "text-base px-6 py-2.5 gap-2.5 h-11",
        icon: "size-10 p-0",
        "icon-xs": "size-7 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      isLoading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot.Root
          ref={ref}
          data-slot="button"
          data-variant={variant}
          data-size={size}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </Slot.Root>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block size-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : icon ? (
          <span className="inline-flex shrink-0 items-center justify-center [&>svg]:size-4">{icon}</span>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
