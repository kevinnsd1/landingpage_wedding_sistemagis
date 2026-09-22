import React from 'react';
import { Copy, Check } from 'lucide-react';
import { SectionComponentProps } from '../types';

/**
 * GiftSection — Rekening digital & kado.
 */
export function GiftSection({
  wedding,
  invitationState,
}: Pick<SectionComponentProps, 'wedding' | 'invitationState'>) {
  const gifts = wedding.gifts ?? [];
  const { copiedGiftId, handleCopyAccount } = invitationState;

  if (gifts.length === 0) return null;

  return (
    <section
      className="py-16 px-6 sm:px-12 text-center border-b"
      style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}
    >
      <span className="text-xs font-semibold tracking-[0.25em] uppercase block mb-2" style={{ color: 'var(--theme-text-accent)' }}>
        Tanda Kasih
      </span>
      <h2
        className="text-3xl sm:text-4xl mb-4"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
      >
        Kado &amp; Amplop Digital
      </h2>
      <p className="text-xs max-w-sm mx-auto mb-8 font-light leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
        Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberi tanda kasih,
        dapat melalui rekening berikut:
      </p>

      <div className="space-y-4 max-w-sm mx-auto">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="p-5 rounded-2xl border text-left flex items-center justify-between"
            style={{
              background: 'var(--theme-surface-alt)',
              borderColor: 'var(--theme-border-accent)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <div>
              <span className="text-xs font-semibold block" style={{ color: 'var(--theme-text-accent)' }}>
                {gift.bankName}
              </span>
              <p className="text-base font-mono font-bold tracking-wider my-0.5" style={{ color: 'var(--theme-text)' }}>
                {gift.accountNumber}
              </p>
              <span className="text-[11px]" style={{ color: 'var(--theme-text-muted)' }}>
                a.n. {gift.accountHolder}
              </span>
            </div>
            <button
              onClick={() => handleCopyAccount(gift.id, gift.accountNumber)}
              className="flex items-center gap-1.5 text-xs font-medium py-1.5 px-3 rounded-lg border transition-all hover:opacity-80"
              style={{
                borderColor: copiedGiftId === gift.id ? 'var(--theme-secondary)' : 'var(--theme-border)',
                color: copiedGiftId === gift.id ? 'var(--theme-secondary)' : 'var(--theme-text-muted)',
                background: 'var(--theme-surface)',
              }}
            >
              {copiedGiftId === gift.id ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copiedGiftId === gift.id ? 'Tersalin' : 'Salin'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
