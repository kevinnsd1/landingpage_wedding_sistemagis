import { useMemo } from 'react';
import { Invitation, SectionConfig, GalleryImage } from '@/types/invitation';

/**
 * useThemeConfig — Parse dan validasi invitation config dengan defensive defaults.
 * Menghilangkan kebutuhan `|| {} as any` di setiap komponen tema.
 */
export function useThemeConfig(invitation: Invitation) {
  const config = useMemo(() => {
    return invitation?.config ?? ({
      themeId: 'serenity',
      themeVersion: '1.0.0',
      colors: { primary: '#FCBACB', secondary: '#FC9FB1', background: '#FCFCFC', accent: '#FFEAAB' },
      fonts: { heading: 'Quintessential', body: 'Inter' },
      sections: [],
      music: { enabled: false, title: '', artist: '', url: '' },
      gallery: { layout: 'grid', images: [] },
    } as NonNullable<Invitation['config']>);
  }, [invitation]);

  const activeSections = useMemo((): SectionConfig[] => {
    return (config.sections ?? [])
      .filter(s => s.enabled)
      .sort((a, b) => a.order - b.order);
  }, [config.sections]);

  const hasSection = (type: SectionConfig['type']): boolean =>
    activeSections.some(s => s.type === type);

  const galleryImages: GalleryImage[] = config.gallery?.images ?? [];
  const musicConfig = config.music ?? { enabled: false, title: '', artist: '', url: '' };
  const quoteConfig = config.quote ?? null;

  return {
    config,
    activeSections,
    hasSection,
    galleryImages,
    musicConfig,
    quoteConfig,
  };
}
