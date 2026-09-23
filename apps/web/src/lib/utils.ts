import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const formatCurrency = formatRupiah;

export function formatDateIndo(dateStr?: string | null): string {
  if (!dateStr || dateStr.trim() === '' || dateStr === 'Akan Datang') {
    return 'Belum ditentukan';
  }
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr || 'Belum ditentukan';
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateStr || 'Belum ditentukan';
  }
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function calculateTimeLeft(targetDate?: string | null): TimeLeft {
  if (!targetDate || targetDate.trim() === '') {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
  }
  const target = new Date(targetDate);
  if (isNaN(target.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
  }
  const difference = +target - +new Date();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isPast: false,
  };
}

export function generateWhatsAppInvitation(
  groomBride: string,
  guestName: string,
  invitationUrl: string
): string {
  const message = `Kepada Yth.
*${guestName}*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami:

*${groomBride}*

Untuk informasi lengkap mengenai detail acara, lokasi, dan konfirmasi kehadiran (RSVP), silakan kunjungi tautan undangan digital berikut:

${invitationUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir.

Terima kasih.
Salam hangat,
*${groomBride}*`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}
