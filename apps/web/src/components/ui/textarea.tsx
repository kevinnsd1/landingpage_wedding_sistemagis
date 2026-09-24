import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : generatedId)

    const textareaElement = (
      <textarea
        id={textareaId}
        ref={ref}
        data-slot="textarea"
        aria-invalid={!!error}
        className={cn(
          "flex min-h-20 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#FC9FB1] focus-visible:ring-3 focus-visible:ring-[#FCBACB]/30 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          className
        )}
        {...props}
      />
    )

    if (label || error || helperText) {
      return (
        <div className="w-full space-y-1.5">
          {label && (
            <label
              htmlFor={textareaId}
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
            >
              {label}
            </label>
          )}
          {textareaElement}
          {error ? (
            <p className="text-xs font-medium text-destructive flex items-center gap-1">{error}</p>
          ) : helperText ? (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          ) : null}
        </div>
      )
    }

    return textareaElement
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
