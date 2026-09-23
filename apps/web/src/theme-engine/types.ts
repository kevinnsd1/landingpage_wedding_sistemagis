// ============================================================================
// Theme Engine — Core Types
// Semua type definition untuk engine tema undangan digital
// ============================================================================
import React from 'react';
import { Wedding } from '@/types/wedding';
import { Invitation, GalleryImage, SectionType } from '@/types/invitation';
import { Guest, RSVP, GuestbookEntry } from '@/types/guest';

// ---------------------------------------------------------------------------
// Color & Font Contracts
// ---------------------------------------------------------------------------

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

export type ThemeCategory =
  | 'Romantic Classic'
  | 'Modern Minimalist'
  | 'Botanical Nature'
  | 'Luxe Elegant'
  | 'Cultural Traditional'
  | 'Playful Festive';

// ---------------------------------------------------------------------------
// CSS Token System — Full user-customizable CSS variables
// ---------------------------------------------------------------------------

/**
 * ThemeTokens adalah kontrak lengkap semua CSS custom property yang bisa
 * digunakan oleh section components. Setiap tema mendefinisikan defaultnya,
 * dan user bisa override token apapun secara bebas.
 */
export interface ThemeTokens {
  // Accent & brand
  '--theme-primary': string;          // Warna utama (border, highlight)
  '--theme-primary-hover': string;    // Hover state warna utama
  '--theme-secondary': string;        // Warna sekunder
  '--theme-accent': string;           // Warna aksen (gold, dll)

  // Backgrounds
  '--theme-bg': string;               // Latar halaman
  '--theme-surface': string;          // Latar kartu/panel
  '--theme-surface-alt': string;      // Latar section bergantian

  // Text
  '--theme-text': string;             // Teks utama
  '--theme-text-muted': string;       // Teks redup/muted
  '--theme-text-accent': string;      // Teks warna aksen (eyebrow, label)

  // Borders
  '--theme-border': string;           // Border standar
  '--theme-border-accent': string;    // Border berwarna aksen

  // Typography
  '--font-heading': string;           // Font heading (brand/display)
  '--font-body': string;              // Font body

  // Allow fully arbitrary custom tokens from the user
  [key: `--${string}`]: string;
}

// ---------------------------------------------------------------------------
// Section Component Props
// ---------------------------------------------------------------------------

/** State undangan terpusat — disuplai oleh useInvitationState */
export interface InvitationState {
  isOpened: boolean;
  handleOpen: () => void;
  lightboxOpen: boolean;
  activePhotoIdx: number;
  openLightbox: (idx: number) => void;
  closeLightbox: () => void;
  copiedGiftId: string | null;
  handleCopyAccount: (id: string, text: string) => void;
}

/** State form RSVP — disuplai oleh useRSVPForm */
export interface RSVPFormState {
  rsvpName: string;
  setRsvpName: (v: string) => void;
  rsvpAttendance: 'attending' | 'declined';
  setRsvpAttendance: (v: 'attending' | 'declined') => void;
  rsvpGuestCount: number;
  setRsvpGuestCount: (v: number) => void;
  rsvpMessage: string;
  setRsvpMessage: (v: string) => void;
  rsvpSuccess: boolean;
  rsvpError: string;
  handleSubmit: (e: React.FormEvent) => void;
}

/** Props standar yang diterima semua shared section components */
export interface SectionComponentProps {
  wedding: Wedding;
  invitation: Invitation;
  guest?: Guest;
  rsvps: RSVP[];
  guestbook: GuestbookEntry[];
  config: NonNullable<Invitation['config']>;
  galleryImages: GalleryImage[];
  isPreview: boolean;
  invitationState: InvitationState;
  rsvpForm: RSVPFormState;
}

// ---------------------------------------------------------------------------
// Theme Props — Props utama yang diterima komponen tema
// ---------------------------------------------------------------------------

export interface ThemeProps {
  wedding: Wedding;
  invitation: Invitation;
  guest?: Guest;
  rsvps: RSVP[];
  guestbook: GuestbookEntry[];
  onSubmitRSVP: (data: {
    name: string;
    attendance: 'attending' | 'declined';
    guestCount: number;
    message?: string;
  }) => void;
  onOpenInvitation?: () => void;
  isPreview?: boolean;
}

// ---------------------------------------------------------------------------
// Theme Capabilities
// ---------------------------------------------------------------------------

export interface ThemeCapabilities {
  supportsGallery: boolean;
  supportsMusicPlayer: boolean;
  supportsCountdown: boolean;
  supportsGuestbook: boolean;
  supportsGift: boolean;
  supportsLoveStory: boolean;
}

// ---------------------------------------------------------------------------
// Theme Metadata & Definition
// ---------------------------------------------------------------------------

export type FieldType = 'text' | 'textarea' | 'image' | 'video' | 'select' | 'boolean';

export interface CustomFieldDefinition {
  key: string;
  label: string;
  description?: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  defaultValue?: any;
}

export interface CustomizableColor {
  key: string; // e.g. "primary", "text", "surface"
  label: string; // e.g. "Warna Utama"
  type: 'color'; 
}

export interface ThemeMetadata {
  id: string;
  name: string;
  version: string;
  tagline: string;
  description: string;
  category: ThemeCategory;
  previewColor: string;
  thumbnail?: string;
  customizableColors?: CustomizableColor[];
  customFields?: CustomFieldDefinition[];

  /** Warna default tema — basis dari token */
  defaultColors: ThemeColors;
  defaultFonts: ThemeFonts;

  /** Default CSS tokens lengkap yang diinjeksikan ke ThemeRenderer */
  defaultTokens: Partial<ThemeTokens>;

  supportedSections: SectionType[];
  capabilities: Partial<ThemeCapabilities>;
  tags?: string[];
}

export interface ThemeDefinition extends ThemeMetadata {
  component: React.ComponentType<ThemeProps>;
}

// ---------------------------------------------------------------------------
// Section Override System
// ---------------------------------------------------------------------------

/** Mapping section type ke component override per-tema */
export type ThemeSectionOverrides = Partial<Record<SectionType, React.ComponentType<SectionComponentProps>>>;
