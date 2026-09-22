import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'primary', size = 'sm', children, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-slate-100 text-slate-800 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
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
