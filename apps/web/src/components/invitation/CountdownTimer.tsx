import React, { useState, useEffect } from 'react';
import { calculateTimeLeft, TimeLeft } from '@/lib/utils';

/**
 * CountdownTimer — Adaptif ke semua tema via CSS custom properties.
 * Tidak lagi hardcoded warna Serenity.
 */
export function CountdownTimer({ targetDate }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    if (!targetDate) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate) {
    return (
      <div
        className="text-center p-6 rounded-xl inline-block"
        style={{
          background: 'color-mix(in srgb, var(--theme-surface) 90%, transparent)',
          border: '1px solid var(--theme-border-accent)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}>
          Tanggal Segera Diumumkan
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
          Nantikan momen bahagia kami
        </p>
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div
        className="text-center p-6 rounded-xl inline-block"
        style={{
          background: 'color-mix(in srgb, var(--theme-surface) 90%, transparent)',
          border: '1px solid var(--theme-border-accent)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text-accent)' }}>
          Hari Bahagia Telah Tiba
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
          Terima kasih atas doa restu Anda semua
        </p>
      </div>
    );
  }

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl transition-transform hover:-translate-y-0.5"
          style={{
            background: 'color-mix(in srgb, var(--theme-surface) 85%, transparent)',
            border: '1px solid var(--theme-border-accent)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <span
            className="text-2xl sm:text-4xl font-semibold leading-none"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
          >
            {String(unit.value).padStart(2, '0')}
          </span>
          <span
            className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold mt-1"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
