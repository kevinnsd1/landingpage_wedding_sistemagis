import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/types/invitation';

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function Lightbox({ isOpen, onClose, images, currentIndex, onNavigate }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 z-50 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-4 z-50 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image Display */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
        <img
          src={current.url}
          alt={current.caption || 'Foto Pernikahan'}
          className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-all"
        />
        {current.caption && (
          <p className="mt-3 text-white/90 text-sm font-light text-center">
            {current.caption}
          </p>
        )}
        <span className="text-xs text-white/50 mt-1">
          {currentIndex + 1} dari {images.length}
        </span>
      </div>
    </div>
  );
}
