import React from 'react';
import { cn } from './utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none';

    const variants = {
      primary: 'bg-[#FCBACB] text-[#263238] font-semibold hover:bg-[#FC9FB1] focus:ring-[#FCBACB] shadow-sm active:scale-[0.98]',
      secondary: 'bg-transparent border border-[#FCBACB] text-[#D96F88] hover:bg-[#FFF0F3] focus:ring-[#FCBACB] active:scale-[0.98]',
      outline: 'bg-white border border-[#E8E8E8] text-[#263238] hover:bg-neutral-50 hover:border-neutral-300 focus:ring-neutral-200 active:scale-[0.98]',
      ghost: 'bg-transparent text-[#263238] hover:bg-[#FFF0F3] hover:text-[#D96F88] active:scale-[0.98]',
      danger: 'bg-[#D9536F] text-white hover:bg-rose-600 focus:ring-rose-300 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-3 gap-2.5 h-12',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
