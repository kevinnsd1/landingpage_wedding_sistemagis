import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1F1C18] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#1F1C18] text-[#FBF9F5] hover:bg-[#38332C] shadow-sm",
        destructive:
          "bg-[#A83836] text-[#FBF9F5] hover:bg-[#8B2E2D] shadow-sm",
        outline:
          "border border-[#E5DFC0] bg-[#FDFCF9] text-[#1F1C18] shadow-xs hover:bg-[#F3EFE7] hover:border-[#D6CFBF]",
        secondary:
          "bg-[#F1ECE3] text-[#1F1C18] hover:bg-[#E7E0D3]",
        ghost: "text-[#5C564E] hover:bg-[#F3EFE7] hover:text-[#1F1C18]",
        link: "text-[#1F1C18] underline-offset-4 hover:underline",
        editorial: "bg-[#F5F1E8] text-[#1F1C18] border border-[#E5DFC0] hover:bg-[#EBE3D3] font-serif text-base tracking-wide",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
