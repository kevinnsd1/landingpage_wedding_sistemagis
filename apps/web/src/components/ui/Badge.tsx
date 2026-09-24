import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        primary: "bg-[#FFF0F3] text-[#D96F88] border-[#FCBACB]/60",
        success: "bg-[#EBF7E5] text-[#3D6420] border-[#B9DCA9]",
        warning: "bg-[#FFF9E6] text-[#8C6B00] border-[#FFEAAB]",
        error: "bg-[#FBE1E7] text-[#B83D58] border-[#FC9FB1]/60",
        neutral: "bg-neutral-100 text-neutral-600 border-neutral-200",
        default: "bg-primary text-primary-foreground border-transparent",
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        destructive: "bg-destructive/10 text-destructive border-transparent",
        outline: "border-border text-foreground",
        ghost: "hover:bg-muted text-muted-foreground border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
      },
      size: {
        sm: "text-[11px] font-medium px-2.5 py-0.5",
        md: "text-xs font-semibold px-3 py-1",
        default: "text-xs font-medium px-2.5 py-0.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

function Badge({
  className,
  variant = "primary",
  size = "sm",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
