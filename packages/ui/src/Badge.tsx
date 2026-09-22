import React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'primary', size = 'sm', children, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-[#FFF0F3] text-[#D96F88] border border-[#FCBACB]/50',
    success: 'bg-[#EBF7E5] text-[#3D6420] border border-[#B9DCA9]',
    warning: 'bg-[#FFF9E6] text-[#8C6B00] border border-[#FFEAAB]',
    error: 'bg-[#FBE1E7] text-[#B83D58] border border-[#FC9FB1]/50',
    neutral: 'bg-neutral-100 text-neutral-600 border border-neutral-200',
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
