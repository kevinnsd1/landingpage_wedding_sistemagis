import React from 'react';
import { ThemeDefinition, ThemeMetadata } from './types';

// ---------------------------------------------------------------------------
// Theme Registry
// ---------------------------------------------------------------------------

class ThemeRegistry {
  private themes: Map<string, ThemeDefinition> = new Map();

  /**
   * Daftarkan tema baru ke registry.
   * Tema disimpan dengan key `id` (latest) dan `id:version` (versioned).
   */
  register(theme: ThemeDefinition): void {
    this.themes.set(theme.id, theme);
    this.themes.set(`${theme.id}:${theme.version}`, theme);
  }

  /**
   * Daftarkan tema baru ke registry secara lazy-loaded.
   * Sangat berguna untuk menghemat bundle size, komponen baru dimuat saat tema dipakai.
   */
  registerLazy(
    meta: ThemeMetadata,
    loader: () => Promise<{ default: React.ComponentType<import('./types').ThemeProps> }>
  ): void {
    const lazyComponent = React.lazy(loader);
    const themeDef: ThemeDefinition = {
      ...meta,
      component: lazyComponent,
    };
    this.themes.set(themeDef.id, themeDef);
    this.themes.set(`${themeDef.id}:${themeDef.version}`, themeDef);
  }

  /**
   * Ambil tema berdasarkan id dan versi opsional.
   * Fallback ke 'serenity' jika tidak ditemukan.
   */
  get(id: string, version?: string): ThemeDefinition {
    if (version) {
      const versioned = this.themes.get(`${id}:${version}`);
      if (versioned) return versioned;
    }
    const base = this.themes.get(id);
    if (base) return base;

    console.warn(`[ThemeRegistry] Tema "${id}" tidak ditemukan. Menggunakan "serenity".`);
    return this.themes.get('serenity')!;
  }

  /** Daftar semua metadata tema (tanpa component) — untuk UI pemilih tema */
  getAll(): ThemeMetadata[] {
    const seen = new Set<string>();
    const result: ThemeMetadata[] = [];

    for (const [key, theme] of this.themes.entries()) {
      // Hanya ambil entry tanpa versi (latest per id)
      if (!key.includes(':') && !seen.has(theme.id)) {
        seen.add(theme.id);
        const { component: _c, ...meta } = theme;
        result.push(meta);
      }
    }
    return result;
  }

  has(id: string): boolean {
    return this.themes.has(id);
  }

  getDefault(): ThemeDefinition {
    return this.themes.get('serenity')!;
  }
}

// ---------------------------------------------------------------------------
// Singleton Instance
// ---------------------------------------------------------------------------

export const themeRegistry = new ThemeRegistry();

// Lazy-register saat themes/ folder diinisialisasi
// Import dilakukan di themes/index.ts agar engine tidak coupling ke themes/
export function registerTheme(theme: ThemeDefinition): void {
  themeRegistry.register(theme);
}

export function registerLazyTheme(
  meta: ThemeMetadata,
  loader: () => Promise<{ default: React.ComponentType<import('./types').ThemeProps> }>
): void {
  themeRegistry.registerLazy(meta, loader);
}

export function getTheme(id: string, version?: string): ThemeDefinition {
  return themeRegistry.get(id, version);
}

export function getAllThemes(): ThemeMetadata[] {
  return themeRegistry.getAll();
}
