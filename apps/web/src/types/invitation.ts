// ============================================================================
// Invitation Types
// ============================================================================

export type ThemeId = 'serenity' | 'bloom' | 'aurora' | (string & {});

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  accent?: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

/**
 * SectionType — Semua tipe section yang didukung engine.
 * Dapat diperluas tanpa breaking change.
 */
export type SectionType =
  // Core sections
  | 'cover'
  | 'couple'
  | 'story'
  | 'event'
  | 'countdown'
  | 'gallery'
  | 'gift'
  | 'rsvp'
  | 'guestbook'
  | 'closing'
  // Extended sections (future use)
  | 'music'
  | 'quote'
  | 'livestream'
  | 'prayer'
  | 'dress_code'
  | 'schedule';

export interface SectionConfig {
  type: SectionType;
  enabled: boolean;
  order: number;
  /** Data kustom per-section, contoh: label override, warna khusus */
  data?: Record<string, unknown>;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  category?: string;
  width?: number;
  height?: number;
}

export interface InvitationConfig {
  themeId: ThemeId;
  themeVersion: string;
  colors: ThemeColors;
  fonts: ThemeFonts;

  /**
   * customTokens — Override CSS custom property apapun secara bebas.
   * Contoh: { '--theme-primary': '#FF6B6B', '--font-heading': 'Playfair Display' }
   * Ini memungkinkan user mengkustomisasi warna/font di luar palette dasar.
   */
  customTokens?: Record<string, string>;

  sections: SectionConfig[];
  music: {
    enabled: boolean;
    title: string;
    artist: string;
    url: string;
  };
  gallery: {
    layout: 'grid' | 'masonry';
    images: GalleryImage[];
  };
  quote?: {
    text: string;
    source?: string;
  };
}

export interface Invitation {
  id: string;
  weddingId: string;
  config: InvitationConfig;
  status: 'draft' | 'published';
  publishedAt?: string;
  updatedAt: string;
}
