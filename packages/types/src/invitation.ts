export type ThemeId = 'serenity' | 'bloom' | 'aurora';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  accent?: string;
  surface?: string;
  text?: string;
  textMuted?: string;
  border?: string;
  [key: string]: string | undefined;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

export type SectionType = 
  | 'cover'
  | 'couple'
  | 'story'
  | 'event'
  | 'countdown'
  | 'gallery'
  | 'gift'
  | 'rsvp'
  | 'guestbook'
  | 'closing';

export interface SectionConfig {
  type: SectionType;
  enabled: boolean;
  order: number;
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
