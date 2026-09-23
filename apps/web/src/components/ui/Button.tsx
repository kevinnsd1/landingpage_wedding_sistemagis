import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'pink' | 'green' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none cursor-pointer';

    const variants = {
      primary: 'bg-[#263238] text-white font-medium hover:bg-[#1E293B] focus:ring-slate-400 shadow-xs active:scale-[0.98]',
      secondary: 'bg-white border border-[#E8E8E8] text-[#263238] hover:bg-neutral-50 hover:border-neutral-300 focus:ring-neutral-300 shadow-2xs active:scale-[0.98]',
      outline: 'bg-transparent border border-[#E8E8E8] text-[#263238] hover:bg-neutral-50 hover:border-neutral-300 focus:ring-neutral-200 active:scale-[0.98]',
      ghost: 'bg-transparent text-[#667085] hover:bg-neutral-100 hover:text-[#263238] active:scale-[0.98]',
      pink: 'bg-[#FCBACB]/30 hover:bg-[#FCBACB]/50 text-[#7D4050] border border-[#FCBACB] shadow-2xs active:scale-[0.98]',
      green: 'bg-[#B9DCA9]/30 hover:bg-[#B9DCA9]/50 text-[#3D6420] border border-[#B9DCA9] shadow-2xs active:scale-[0.98]',
      cream: 'bg-[#FFEAAB]/40 hover:bg-[#FFEAAB]/60 text-[#7A5D00] border border-[#FFEAAB] shadow-2xs active:scale-[0.98]',
      danger: 'bg-[#FBE1E7] border border-[#FCBACB] text-[#B83D58] hover:bg-[#F9D0DC] focus:ring-rose-300 shadow-2xs active:scale-[0.98]',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8',
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
          <span className="flex-shrink-0 inline-flex items-center justify-center text-current [&>svg]:stroke-current [&>svg]:text-current">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
