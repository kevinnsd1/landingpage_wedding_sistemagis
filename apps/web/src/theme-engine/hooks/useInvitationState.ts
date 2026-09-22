import { useState, useCallback } from 'react';
import { InvitationState } from '../types';

/**
 * useInvitationState — Semua state UI undangan terpusat.
 * Menghilangkan duplikasi 5+ useState di setiap file tema.
 */
export function useInvitationState(onOpenInvitation?: () => void): InvitationState {
  const [isOpened, setIsOpened] = useState(false);
  const [copiedGiftId, setCopiedGiftId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
    onOpenInvitation?.();
  }, [onOpenInvitation]);

  const openLightbox = useCallback((idx: number) => {
    setActivePhotoIdx(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleCopyAccount = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      // Graceful fallback: try execCommand
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    });
    setCopiedGiftId(id);
    setTimeout(() => setCopiedGiftId(null), 2500);
  }, []);

  return {
    isOpened,
    handleOpen,
    lightboxOpen,
    activePhotoIdx,
    openLightbox,
    closeLightbox,
    copiedGiftId,
    handleCopyAccount,
  };
}
