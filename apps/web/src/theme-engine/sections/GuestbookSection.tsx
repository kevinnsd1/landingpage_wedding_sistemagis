import React from 'react';
import { SectionComponentProps } from '../types';

/**
 * GuestbookSection — Daftar ucapan & doa tamu.
 */
export function GuestbookSection({
  guestbook,
}: Pick<SectionComponentProps, 'guestbook'>) {
  return (
    <section
      className="py-16 px-6 sm:px-12"
      style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}
    >
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase block mb-2" style={{ color: 'var(--theme-text-accent)' }}>
          Buku Tamu
        </span>
        <h2
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
        >
          Doa &amp; Ucapan Hangat
        </h2>
      </div>

      <div className="max-w-md mx-auto space-y-3 max-h-96 overflow-y-auto pr-1">
        {(guestbook ?? []).length === 0 ? (
          <div className="text-center py-8 text-xs font-light" style={{ color: 'var(--theme-text-muted)' }}>
            Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
          </div>
        ) : (
          guestbook.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl border text-left"
              style={{
                background: 'var(--theme-surface-alt)',
                borderColor: 'var(--theme-border-accent)',
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold" style={{ color: 'var(--theme-text)' }}>
                  {entry.guestName}
                </span>
                <span className="text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>
                  {new Date(entry.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
              <p className="text-xs leading-relaxed font-light" style={{ color: 'var(--theme-text-muted)' }}>
                {entry.message}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
