import React from 'react';
import logoHorizontalPink from '@/assets/logo/Logo kisah magis with icon horizontal pink.svg';
import logoHorizontalWhite from '@/assets/logo/Logo kisah magis with icon horizontal white.svg';
import logoVerticalPink from '@/assets/logo/Logo kisah magis icon vertical divide pink.svg';
import iconStrawberry from '@/assets/logo/Icon strawberry.svg';
import iconStrawberryTile from '@/assets/logo/Icon strawberry with pink logo.svg';

export interface BrandLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon' | 'icon-tile';
  theme?: 'pink' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  imgClassName?: string;
  subtitle?: string;
  alt?: string;
}

export function BrandLogo({
  variant = 'horizontal',
  theme = 'pink',
  size = 'md',
  className = '',
  imgClassName = '',
  subtitle,
  alt = 'KisahMagis — Sistemagis Wedding Platform',
}: BrandLogoProps) {
  let src = logoHorizontalPink;

  if (variant === 'vertical') {
    src = logoVerticalPink;
  } else if (variant === 'icon') {
    src = iconStrawberry;
  } else if (variant === 'icon-tile') {
    src = iconStrawberryTile;
  } else if (variant === 'horizontal') {
    src = theme === 'white' ? logoHorizontalWhite : logoHorizontalPink;
  }

  const sizeClass = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-12' : 'h-9';

  if (subtitle) {
    return (
      <div className={`flex flex-col items-start ${className}`}>
        <img
          src={src}
          alt={alt}
          className={`${sizeClass} w-auto object-contain ${imgClassName}`}
        />
        <span className="text-[11px] text-slate-500 font-medium tracking-normal mt-1 pl-0.5">
          {subtitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} w-auto object-contain ${className}`}
    />
  );
}
