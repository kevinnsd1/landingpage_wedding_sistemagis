// ============================================================================
// Themes — Registration & Exports
//
// File ini adalah entry point untuk semua tema.
// Tema baru cukup didaftarkan di sini tanpa mengubah engine.
//
// Cara menambah tema baru:
//   1. Buat folder themes/nama-tema/
//   2. Buat theme.ts (metadata + defaultTokens)
//   3. Buat NamaTheme.tsx (komponen)
//   4. Buat index.ts
//   5. Import & daftarkan di bawah ini
// ============================================================================

import { registerLazyTheme } from '@/theme-engine';
import { serenityThemeMeta } from './serenity/theme';
import { bloomThemeMeta } from './bloom/theme';
import { auroraThemeMeta } from './aurora/theme';

// Daftarkan semua tema ke registry engine secara lazy-loaded.
// Ini memastikan komponen React tema hanya dimuat saat diakses (code-splitting),
// sehingga ukuran bundle utama aplikasi tetap kecil walau ada 100+ tema.
registerLazyTheme(serenityThemeMeta, () => 
  import('./serenity/SerenityTheme').then(m => ({ default: m.SerenityTheme }))
);
registerLazyTheme(bloomThemeMeta, () => 
  import('./bloom/BloomTheme').then(m => ({ default: m.BloomTheme }))
);
registerLazyTheme(auroraThemeMeta, () => 
  import('./aurora/AuroraTheme').then(m => ({ default: m.AuroraTheme }))
);

// Re-export semua API engine dari satu titik (backwards compatibility)
export {
  ThemeRenderer,
  getAllThemes,
  getTheme,
  themeRegistry,
} from '@/theme-engine';

export type {
  ThemeProps,
  ThemeDefinition,
  ThemeMetadata,
  ThemeTokens,
  ThemeColors,
  ThemeFonts,
  ThemeCategory,
  SectionComponentProps,
} from '@/theme-engine';
