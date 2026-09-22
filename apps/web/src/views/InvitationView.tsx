import React, { useState, useEffect } from 'react';
import { Wedding } from '@/types/wedding';
import { Invitation } from '@/types/invitation';
import { Guest, RSVP, GuestbookEntry } from '@/types/guest';
import { api } from '@/lib/api';
import { ThemeRenderer } from '@/theme-engine';
import { MusicPlayer } from '@/components/invitation/MusicPlayer';
import { ArrowLeft } from 'lucide-react';

export interface InvitationViewProps {
  wedding: Wedding;
  invitation: Invitation;
  guestToken?: string;
  onBackToDashboard?: () => void;
  isPreview?: boolean;
}

export function InvitationView({
  wedding: initialWedding,
  invitation: initialInvitation,
  guestToken,
  onBackToDashboard,
  isPreview = false,
}: InvitationViewProps) {
  const [wedding, setWedding] = useState<Wedding>(initialWedding);
  const [invitation, setInvitation] = useState<Invitation>(initialInvitation);
  const [guest, setGuest] = useState<Guest | undefined>(undefined);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [musicTrigger, setMusicTrigger] = useState(false);

  useEffect(() => {
    setWedding(initialWedding);
  }, [initialWedding]);

  useEffect(() => {
    setInvitation(initialInvitation);
  }, [initialInvitation]);

  // Fetch invitation data from API only in live public view
  useEffect(() => {
    if (isPreview) return;
    let isMounted = true;
    if (wedding.slug) {
      api.getPublicInvitation(wedding.slug, guestToken)
        .then((res) => {
          if (!isMounted) return;
          if (res.wedding) setWedding(res.wedding);
          if (res.invitation) setInvitation(res.invitation);
          if (res.guest) setGuest(res.guest);
          if (res.rsvps) setRsvps(res.rsvps);
          if (res.guestbook) setGuestbook(res.guestbook);
        })
        .catch((err) => {
          console.warn('Could not load online invitation data:', err);
        });
    }
    return () => { isMounted = false; };
  }, [wedding.slug, guestToken, isPreview]);

  const handleRSVPSubmit = async (data: {
    name: string;
    attendance: 'attending' | 'declined';
    guestCount: number;
    message?: string;
  }) => {
    try {
      const res = await api.submitRSVP({
        weddingId: wedding.id,
        guestToken,
        ...data,
      });
      if (res.rsvp) {
        setRsvps((prev) => [res.rsvp, ...prev]);
        if (data.message && data.message.trim()) {
          setGuestbook((prev) => [
            {
              id: `gb-${Date.now()}`,
              weddingId: String(wedding.id),
              guestName: data.name,
              message: data.message!.trim(),
              isApproved: true,
              createdAt: new Date().toISOString(),
            },
            ...prev,
          ]);
        }
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
    }
  };

  const handleOpenInvitation = () => {
    setMusicTrigger(true);
  };

  const themeProps = {
    wedding,
    invitation,
    guest,
    rsvps,
    guestbook,
    onSubmitRSVP: handleRSVPSubmit,
    onOpenInvitation: handleOpenInvitation,
    isPreview,
  };

  return (
    <div className="relative">
      {/* Floating Back to Dashboard Button when previewing from dashboard */}
      {onBackToDashboard && (
        <button
          onClick={onBackToDashboard}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-md text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Dashboard</span>
        </button>
      )}

      {/* Floating Background Music Player */}
      {invitation?.config?.music?.enabled && (
        <MusicPlayer
          url={invitation.config.music.url}
          title={invitation.config.music.title}
          artist={invitation.config.music.artist}
          autoPlayTrigger={musicTrigger}
        />
      )}

      {/* Template Engine Dynamic Theme Renderer */}
      <ThemeRenderer {...themeProps} />
    </div>
  );
}
