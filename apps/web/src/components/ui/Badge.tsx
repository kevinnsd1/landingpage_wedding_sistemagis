import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'primary', size = 'sm', children, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-[#FCBACB]/30 text-[#7D4050] border border-[#FCBACB]',
    success: 'bg-[#B9DCA9]/30 text-[#3D6420] border border-[#B9DCA9]',
    warning: 'bg-[#FFEAAB]/40 text-[#7A5D00] border border-[#FFEAAB]',
    error: 'bg-[#FBE1E7] text-[#B83D58] border border-[#F7C6D2]',
    neutral: 'bg-neutral-100 text-[#263238] border border-neutral-200',
  };

  const sizes = {
    sm: 'text-[11px] font-medium px-2.5 py-0.5 rounded-full',
    md: 'text-xs font-semibold px-3 py-1 rounded-full',
  };

  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap', variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
