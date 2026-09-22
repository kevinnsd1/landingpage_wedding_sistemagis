import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { checkRateLimit } from '@/lib/security';
import { Guest } from '@/types/guest';
import { ThemeProps, RSVPFormState } from '../types';

interface UseRSVPFormOptions {
  guest?: Guest;
  onSubmitRSVP: ThemeProps['onSubmitRSVP'];
  /** Warna confetti saat RSVP berhasil — ikuti palet tema */
  confettiColors?: string[];
}

/**
 * useRSVPForm — Semua logika form RSVP terpusat.
 * Menghilangkan duplikasi state & handler di setiap file tema.
 */
export function useRSVPForm({
  guest,
  onSubmitRSVP,
  confettiColors,
}: UseRSVPFormOptions): RSVPFormState {
  const [rsvpName, setRsvpName] = useState(guest?.name ?? '');
  const [rsvpAttendance, setRsvpAttendance] = useState<'attending' | 'declined'>('attending');
  const [rsvpGuestCount, setRsvpGuestCount] = useState(guest?.guestCount ?? 1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpError('');

    if (!rsvpName.trim()) {
      setRsvpError('Mohon isi nama Anda terlebih dahulu.');
      return;
    }

    if (!checkRateLimit(`rsvp-${guest?.id ?? 'anon'}`, 5, 60000)) {
      setRsvpError('Terlalu banyak permintaan. Silakan coba lagi sebentar.');
      return;
    }

    onSubmitRSVP({
      name: rsvpName.trim(),
      attendance: rsvpAttendance,
      guestCount: Number(rsvpGuestCount),
      message: rsvpMessage.trim() || undefined,
    });

    setRsvpSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: confettiColors ?? ['#FCBACB', '#FC9FB1', '#FFEAAB', '#B9DCA9'],
    });
  };

  return {
    rsvpName,
    setRsvpName,
    rsvpAttendance,
    setRsvpAttendance,
    rsvpGuestCount,
    setRsvpGuestCount,
    rsvpMessage,
    setRsvpMessage,
    rsvpSuccess,
    rsvpError,
    handleSubmit,
  };
}
