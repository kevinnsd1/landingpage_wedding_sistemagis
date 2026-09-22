import React from 'react';
import { AtSign } from 'lucide-react';
import { SectionComponentProps } from '../types';

/**
 * CoupleSection — Profil kedua mempelai.
 * Seluruh warna menggunakan CSS variables sehingga otomatis mengikuti tema & kustomisasi user.
 */
export function CoupleSection({ wedding }: Pick<SectionComponentProps, 'wedding'>) {
  const { groomName, groomParents, groomPhoto, groomInstagram, brideName, brideParents, bridePhoto, brideInstagram } = wedding;

  const PersonCard = ({
    name,
    parents,
    photo,
    instagram,
  }: {
    name: string;
    parents: string;
    photo?: string;
    instagram?: string;
  }) => (
    <div className="flex flex-col items-center">
      {photo && (
        <div
          className="w-36 h-48 rounded-2xl overflow-hidden p-1.5 mb-4"
          style={{
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'var(--theme-border-accent)',
            background: 'var(--theme-surface)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <img src={photo} alt={name} className="w-full h-full object-cover rounded-xl" />
        </div>
      )}
      <h3
        className="text-2xl mb-1 text-center"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
      >
        {name}
      </h3>
      <p className="text-xs text-center leading-relaxed px-2" style={{ color: 'var(--theme-text-muted)' }}>
        {parents}
      </p>
      {instagram && (
        <a
          href={`https://instagram.com/${instagram.replace('@', '')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs mt-2 hover:underline"
          style={{ color: 'var(--theme-text-accent)' }}
        >
          <AtSign className="w-3.5 h-3.5" />
          <span>{instagram}</span>
        </a>
      )}
    </div>
  );

  return (
    <section
      className="py-16 px-6 sm:px-12 text-center border-b"
      style={{
        background: 'var(--theme-surface)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <span className="text-xs font-semibold tracking-[0.25em] uppercase block mb-2" style={{ color: 'var(--theme-text-accent)' }}>
        Pasangan Mempelai
      </span>
      <h2
        className="text-3xl sm:text-4xl mb-12"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
      >
        Maha Suci Allah yang Menyatukan Kami
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-xl mx-auto">
        <PersonCard name={groomName} parents={groomParents} photo={groomPhoto} instagram={groomInstagram} />
        <PersonCard name={brideName} parents={brideParents} photo={bridePhoto} instagram={brideInstagram} />
      </div>
    </section>
  );
}
