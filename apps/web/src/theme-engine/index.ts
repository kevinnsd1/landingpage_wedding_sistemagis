// ============================================================================
// Theme Engine — Public API
// Import dari sini untuk menggunakan engine template undangan.
// ============================================================================

// Core types
export type {
  ThemeProps,
  ThemeDefinition,
  ThemeMetadata,
  ThemeTokens,
  ThemeColors,
  ThemeFonts,
  ThemeCategory,
  ThemeCapabilities,
  ThemeSectionOverrides,
  SectionComponentProps,
  InvitationState,
  RSVPFormState,
} from './types';

// Hooks
export { useThemeConfig } from './hooks/useThemeConfig';
export { useInvitationState } from './hooks/useInvitationState';
export { useRSVPForm } from './hooks/useRSVPForm';

// Shared sections
export {
  CoupleSection,
  StorySection,
  EventSection,
  GallerySection,
  GiftSection,
  RSVPSection,
  GuestbookSection,
  ClosingSection,
} from './sections';

// Section renderer
export { SectionRenderer } from './SectionRenderer';

// Renderer & Registry
export { ThemeRenderer } from './ThemeRenderer';
export type { ThemeRendererProps } from './ThemeRenderer';
export { themeRegistry, registerTheme, registerLazyTheme, getTheme, getAllThemes } from './registry';
