import React from 'react';
import { Heart } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { SectionComponentProps } from '../types';

/**
 * ClosingSection — Penutup undangan dengan nama mempelai & brand.
 */
export function ClosingSection({
  wedding,
}: Pick<SectionComponentProps, 'wedding'>) {
  const groomFirstName = wedding.groomName?.split(' ')[0] ?? '';
  const brideFirstName = wedding.brideName?.split(' ')[0] ?? '';

  return (
    <section
      className="py-16 px-6 sm:px-12 text-center border-t"
      style={{
        background: 'var(--theme-surface-alt)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <Heart
        className="w-6 h-6 mx-auto mb-4"
        style={{ color: 'var(--theme-primary)', fill: 'var(--theme-primary)' }}
      />
      <h3
        className="text-2xl sm:text-3xl mb-2"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
      >
        Sampai Jumpa di Hari Bahagia Kami
      </h3>
      <p className="text-xs font-light max-w-sm mx-auto mb-6" style={{ color: 'var(--theme-text-muted)' }}>
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
        hadir dan memberikan doa restu.
      </p>

      <p
        className="text-3xl"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text-accent)' }}
      >
        {groomFirstName} &amp; {brideFirstName}
      </p>

      <div
        className="mt-12 pt-6 border-t flex flex-col items-center gap-1.5"
        style={{ borderColor: 'var(--theme-border)' }}
      >
        <span className="text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>Dibuat dengan</span>
        <BrandLogo variant="horizontal" theme="pink" size="sm" />
        <span className="text-[9px] tracking-widest" style={{ color: 'var(--theme-text-muted)' }}>
          Sistemagis Digital Wedding Platform
        </span>
      </div>
    </section>
  );
}
