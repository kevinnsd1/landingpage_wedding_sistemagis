import React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-[#EEEEEE] rounded-lg p-5 shadow-subtle transition-all duration-200',
        hoverable && 'hover:shadow-elevated hover:border-[#FCBACB]/60 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
