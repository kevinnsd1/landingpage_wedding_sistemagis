import { ThemeMetadata } from '@/theme-engine/types';

export const theme1ThemeMeta: ThemeMetadata = {
  id: 'theme1',
  name: 'Tradisional Elegan',
  version: '1.0.0',
  tagline: 'Elegan dan Bernuansa Budaya',
  description: 'Desain tradisional elegan dengan motif batik dan warna hangat khas nusantara.',
  category: 'Traditional',
  previewColor: '#401017',
  defaultColors: {
    primary: '#401017',
    secondary: '#4A151B',
    background: '#380E14',
    accent: '#EAD4BE',
    text: '#FFF8F3',
    textMuted: '#EAD4BE',
  },
  customizableColors: [
    { key: 'primary', label: 'Warna Utama', type: 'color' },
    { key: 'secondary', label: 'Warna Sekunder', type: 'color' },
    { key: 'accent', label: 'Warna Aksen', type: 'color' },
    { key: 'background', label: 'Warna Latar Belakang', type: 'color' },
    { key: 'text', label: 'Warna Teks Utama', type: 'color' },
  ],
  defaultFonts: {
    heading: 'Playfair Display',
    couple: 'Great Vibes',
    body: 'Inter',
  },
  defaultTokens: {
    '--theme-primary': '#401017',
    '--theme-secondary': '#4A151B',
    '--theme-bg': '#380E14',
    '--theme-accent': '#EAD4BE',
    '--theme-text': '#FFF8F3',
  },
  supportedSections: [
    'cover', 'couple', 'story', 'event', 'countdown',
    'gallery', 'gift', 'rsvp', 'guestbook', 'closing',
  ],
  capabilities: {
    supportsGallery: true,
    supportsMusicPlayer: true,
    supportsCountdown: true,
    supportsGuestbook: true,
    supportsGift: true,
    supportsLoveStory: true,
  },
  tags: ['traditional', 'batik', 'elegant'],
};
