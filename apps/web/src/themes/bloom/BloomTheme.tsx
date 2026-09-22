import React from 'react';
import { Mail, Leaf } from 'lucide-react';
import { ThemeProps, useThemeConfig, useInvitationState, useRSVPForm, SectionRenderer } from '@/theme-engine';
import { CountdownTimer } from '@/components/invitation/CountdownTimer';
import { Lightbox } from '@/components/invitation/Lightbox';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { formatDateIndo } from '@/lib/utils';

export function BloomTheme({
  wedding,
  invitation,
  guest,
  rsvps = [],
  guestbook = [],
  onSubmitRSVP,
  onOpenInvitation,
  isPreview = false,
}: ThemeProps) {
  const { config, activeSections, galleryImages, quoteConfig } = useThemeConfig(invitation);
  const invitationState = useInvitationState(onOpenInvitation);
  const rsvpForm = useRSVPForm({
    guest,
    onSubmitRSVP,
    confettiColors: ['#B9DCA9', '#D5E8D4', '#74A12E', '#FDFBF7'],
  });

  const { isOpened, handleOpen, lightboxOpen, activePhotoIdx, openLightbox, closeLightbox } = invitationState;

  const sectionProps = {
    wedding, invitation, guest, rsvps, guestbook,
    config, galleryImages, isPreview, invitationState, rsvpForm,
  };

  return (
    <div className="relative min-h-screen antialiased overflow-x-hidden" style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)', fontFamily: 'var(--font-body)' }}>
      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryImages}
        currentIndex={activePhotoIdx}
        onNavigate={openLightbox}
      />

      {/* ── Bloom Cover Overlay (Botanical) ─────────────────────────────── */}
      {!isOpened && !isPreview && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 text-center animate-in fade-in duration-300" style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
          <div className="pt-8 sm:pt-12">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: 'var(--theme-text-accent)' }}>
              <Leaf className="w-3.5 h-3.5" />
              The Botanical Wedding
            </span>
            <div className="w-8 h-0.5 mx-auto rounded-full" style={{ background: 'var(--theme-primary)' }} />
          </div>

          <div className="max-w-md my-auto py-6 flex flex-col items-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-2 mb-6" style={{ border: '2px solid var(--theme-border-accent)', background: 'var(--theme-surface)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={wedding.coverPhoto || wedding.groomPhoto} alt={wedding.title} className="w-full h-full object-cover" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl mb-2 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}>
              {wedding.groomName.split(' ')[0]} &amp; {wedding.brideName.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm font-light tracking-wide mb-8" style={{ color: 'var(--theme-text-muted)' }}>
              {formatDateIndo(wedding.weddingDate)}
            </p>

            <div className="px-6 py-4 rounded-xl mb-8 max-w-xs w-full" style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-border-accent)' }}>
              <span className="text-[10px] tracking-widest block mb-1" style={{ color: 'var(--theme-text-muted)' }}>
                Kepada Yth. Tamu Undangan:
              </span>
              <p className="text-base font-semibold" style={{ color: 'var(--theme-text-accent)' }}>
                {guest ? guest.name : 'Bapak/Ibu/Saudara/i'}
              </p>
              {guest?.group && (
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)', color: 'var(--theme-text-accent)', border: '1px solid var(--theme-border-accent)' }}>
                  {guest.group}
                </span>
              )}
            </div>

            <button
              onClick={handleOpen}
              className="flex items-center gap-2 text-sm font-semibold px-8 py-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ background: 'var(--theme-primary)', color: 'var(--theme-surface, #ffffff)', border: '1px solid var(--theme-border-accent)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <Mail className="w-4 h-4" />
              Buka Undangan
            </button>
          </div>

          <div className="pb-6 flex items-center gap-1.5" style={{ color: 'var(--theme-text-muted)' }}>
            <Leaf className="w-3 h-3" style={{ color: 'var(--theme-secondary)' }} />
            <span className="text-[11px]">KisahMagis Bloom</span>
          </div>
        </div>
      )}

      {/* ── Main Invitation Body ─────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto min-h-screen" style={{ background: 'var(--theme-surface)', borderLeft: '1px solid var(--theme-border)', borderRight: '1px solid var(--theme-border)', boxShadow: '0 0 40px rgba(0,0,0,0.06)' }}>

        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 text-center border-b" style={{ background: 'linear-gradient(to bottom, var(--theme-surface-alt), var(--theme-surface))', borderColor: 'var(--theme-border)' }}>
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: 'var(--theme-text-accent)' }}>
            <Leaf className="w-3.5 h-3.5" />
            Pernikahan Suci
          </span>
          <h1 className="text-4xl sm:text-6xl mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}>
            {wedding.groomName.split(',')[0]}
            <span className="block text-2xl sm:text-3xl my-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-secondary)' }}>&amp;</span>
            {wedding.brideName.split(',')[0]}
          </h1>
          <p className="text-sm sm:text-base font-light mb-8" style={{ color: 'var(--theme-text-muted)' }}>
            {formatDateIndo(wedding.weddingDate)}
          </p>

          <div className="my-6">
            <CountdownTimer targetDate={wedding.weddingDate} />
          </div>

          {quoteConfig && (
            <div className="mt-8 p-6 rounded-xl max-w-md mx-auto" style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid var(--theme-border-accent)' }}>
              <p className="text-xs italic leading-relaxed font-light" style={{ color: 'var(--theme-text-muted)' }}>{quoteConfig.text}</p>
              {quoteConfig.source && (
                <span className="text-[11px] font-semibold mt-2 block" style={{ color: 'var(--theme-text-accent)' }}>— {quoteConfig.source}</span>
              )}
            </div>
          )}
        </section>

        {/* Dynamic sections */}
        {activeSections.map((section) => (
          <SectionRenderer key={section.type} sectionType={section.type} sectionProps={sectionProps} />
        ))}

        {/* Closing */}
        <section className="py-16 px-6 sm:px-12 text-center flex flex-col items-center gap-2" style={{ background: 'var(--theme-surface-alt)' }}>
          <Leaf className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--theme-secondary)' }} />
          <p className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}>
            {wedding.groomName.split(' ')[0]} &amp; {wedding.brideName.split(' ')[0]}
          </p>
          <BrandLogo variant="horizontal" theme="pink" size="sm" />
        </section>
      </div>
    </div>
  );
}
