import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : generatedId)

    const inputElement = (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground [&_svg]:size-4">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          data-slot="input"
          aria-invalid={!!error}
          className={cn(
            "h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#FC9FB1] focus-visible:ring-3 focus-visible:ring-[#FCBACB]/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center text-muted-foreground [&_svg]:size-4">
            {rightIcon}
          </div>
        )}
      </div>
    )

    if (label || error || helperText) {
      return (
        <div className="w-full space-y-1.5">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
            >
              {label}
            </label>
          )}
          {inputElement}
          {error ? (
            <p className="text-xs font-medium text-destructive flex items-center gap-1">{error}</p>
          ) : helperText ? (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          ) : null}
        </div>
      )
    }

    return inputElement
  }
)

Input.displayName = "Input"

export { Input }
