import React from 'react';
import { Sparkles } from 'lucide-react';
import { SectionComponentProps } from '../types';
import { GalleryImage } from '@/types/invitation';

interface GallerySectionProps {
  images: GalleryImage[];
  onOpenLightbox: (idx: number) => void;
}

/**
 * GallerySection — Galeri foto dengan grid layout + lightbox trigger.
 */
export function GallerySection({ images, onOpenLightbox }: GallerySectionProps) {
  if (images.length === 0) return null;

  return (
    <section
      className="py-16 px-6 sm:px-12 border-b"
      style={{ background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)' }}
    >
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase block mb-2" style={{ color: 'var(--theme-text-accent)' }}>
          Momen Bahagia
        </span>
        <h2
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
        >
          Galeri Foto
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
        {images.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => onOpenLightbox(idx)}
            className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative border hover:scale-[1.02] transition-transform duration-200"
            style={{
              borderColor: 'var(--theme-border-accent)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            }}
          >
            <img
              src={img.url}
              alt={img.caption ?? 'Foto Galeri'}
              className="w-full h-full object-cover group-hover:brightness-95 transition-all"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white drop-shadow" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
