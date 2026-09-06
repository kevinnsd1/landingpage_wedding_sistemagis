import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-[#1F1C18]",
  {
    variants: {
      variant: {
        default:
          "border-[#E5DFC0] bg-[#F1ECE3] text-[#1F1C18]",
        secondary:
          "border-[#EBE5DA] bg-[#F5F1E8] text-[#5C564E]",
        destructive:
          "border-[#F8CECF] bg-[#FDEBEC] text-[#9F2F2D]",
        outline: "text-[#5C564E] border-[#E5DFC0] bg-transparent",
        amber:
          "border-[#F5E5B8] bg-[#FBF3DB] text-[#8C5B00]",
        sage:
          "border-[#D6E5D4] bg-[#EDF3EC] text-[#346538]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
