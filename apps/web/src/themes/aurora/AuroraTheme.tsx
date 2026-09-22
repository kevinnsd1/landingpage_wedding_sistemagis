import React from 'react';
import { Mail, Check } from 'lucide-react';
import { ThemeProps, useThemeConfig, useInvitationState, useRSVPForm, SectionRenderer } from '@/theme-engine';
import { CountdownTimer } from '@/components/invitation/CountdownTimer';
import { Lightbox } from '@/components/invitation/Lightbox';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { formatDateIndo } from '@/lib/utils';

export function AuroraTheme({
  wedding,
  invitation,
  guest,
  rsvps = [],
  guestbook = [],
  onSubmitRSVP,
  onOpenInvitation,
  isPreview = false,
}: ThemeProps) {
  const { config, activeSections, galleryImages } = useThemeConfig(invitation);
  const invitationState = useInvitationState(onOpenInvitation);
  const rsvpForm = useRSVPForm({
    guest,
    onSubmitRSVP,
    confettiColors: ['#263238', '#607D8B', '#B0BEC5', '#ECEFF1'],
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

      {/* ── Aurora Cover Overlay (Cinematic Dark) ───────────────────────── */}
      {!isOpened && !isPreview && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 text-center animate-in fade-in duration-300" style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
          <div className="pt-12">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: 'var(--theme-text-muted)' }}>
              A Special Celebration
            </span>
          </div>

          <div className="max-w-md my-auto flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-500" style={{ border: '1px solid var(--theme-border)' }}>
              <img src={wedding.coverPhoto || wedding.groomPhoto} alt={wedding.title} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-4xl sm:text-5xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}>
              {wedding.groomName.split(' ')[0]} &amp; {wedding.brideName.split(' ')[0]}
            </h1>
            <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--theme-text-muted)' }}>
              {formatDateIndo(wedding.weddingDate)}
            </p>

            <div className="px-6 py-4 rounded-lg mb-8 max-w-xs w-full" style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-border)' }}>
              <span className="text-[9px] uppercase tracking-widest block mb-1" style={{ color: 'var(--theme-text-muted)' }}>
                Undangan Resmi Untuk:
              </span>
              <p className="text-sm font-semibold" style={{ color: 'var(--theme-text)' }}>
                {guest ? guest.name : 'Tamu Terhormat'}
              </p>
            </div>

            <button
              onClick={handleOpen}
              className="flex items-center gap-2 text-xs font-semibold px-8 py-3 rounded border transition-all hover:opacity-90 uppercase tracking-widest"
              style={{ border: '1px solid var(--theme-primary)', color: 'var(--theme-surface, #ffffff)', background: 'var(--theme-primary)' }}
            >
              <Mail className="w-4 h-4" />
              Buka Undangan
            </button>
          </div>

          <div className="pb-6 text-xs uppercase tracking-widest" style={{ color: 'var(--theme-text-muted)' }}>
            KisahMagis Aurora
          </div>
        </div>
      )}

      {/* ── Main Invitation Body ─────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto min-h-screen" style={{ background: 'var(--theme-surface)', borderLeft: '1px solid var(--theme-border)', borderRight: '1px solid var(--theme-border)' }}>

        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center border-b" style={{ borderColor: 'var(--theme-border)' }}>
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block" style={{ color: 'var(--theme-text-muted)' }}>
            The Wedding of
          </span>
          <h1 className="text-4xl sm:text-6xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}>
            {wedding.groomName.split(',')[0]}
            <span className="block font-light text-2xl my-1" style={{ color: 'var(--theme-text-muted)' }}>&amp;</span>
            {wedding.brideName.split(',')[0]}
          </h1>
          <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--theme-text-muted)' }}>
            {formatDateIndo(wedding.weddingDate)}
          </p>

          <div className="my-6">
            <CountdownTimer targetDate={wedding.weddingDate} />
          </div>
        </section>

        {/* Dynamic sections */}
        {activeSections.map((section) => (
          <SectionRenderer key={section.type} sectionType={section.type} sectionProps={sectionProps} />
        ))}

        {/* Closing */}
        <section className="py-16 text-center text-xs flex flex-col items-center gap-2" style={{ color: 'var(--theme-text-muted)' }}>
          <p className="text-2xl mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}>
            {wedding.groomName.split(' ')[0]} &amp; {wedding.brideName.split(' ')[0]}
          </p>
          <BrandLogo variant="horizontal" theme="pink" size="sm" />
        </section>
      </div>
    </div>
  );
}
