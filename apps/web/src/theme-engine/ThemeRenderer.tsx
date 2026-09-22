import React, { Component, ErrorInfo, ReactNode, Suspense } from 'react';
import { ThemeProps, ThemeDefinition, ThemeTokens } from './types';
import { getTheme } from './registry';

// ---------------------------------------------------------------------------
// Error Boundary
// ---------------------------------------------------------------------------

interface ErrorBoundaryProps {
  fallbackTheme: React.ComponentType<ThemeProps>;
  themeProps: ThemeProps;
  children: ReactNode;
}

interface ErrorBoundaryState { hasError: boolean; }

class ThemeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ThemeRenderer] Tema gagal dimuat:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallbackTheme;
      return (
        <div>
          <div className="bg-amber-50 text-amber-800 text-xs px-4 py-2.5 text-center border-b border-amber-200">
            ⚠️ Terjadi kendala saat memuat tema. Menampilkan tema standar Serenity.
          </div>
          <FallbackComponent {...this.props.themeProps} />
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// Token Builder
// ---------------------------------------------------------------------------

/**
 * buildThemeStyle — Membangun CSS custom properties dari:
 * 1. defaultTokens tema
 * 2. Warna & font dari invitation config (user-configured)
 * 3. customTokens dari invitation config (full user override)
 */
function buildThemeStyle(
  themeDef: ThemeDefinition,
  invitationConfig: ThemeProps['invitation']['config'],
): React.CSSProperties {
  const cfg = invitationConfig ?? ({} as NonNullable<typeof invitationConfig>);
  const colors = (cfg.colors ?? themeDef.defaultColors) as unknown as Record<string, string | undefined>;
  const fonts = cfg.fonts ?? themeDef.defaultFonts;

  // Base defaults dari tema
  const base: Partial<ThemeTokens> = {
    // Spread semua default tokens dari tema (paling rendah prioritasnya)
    ...themeDef.defaultTokens,
    
    // Override dengan warna yang dipilih user (prioritas tinggi)
    '--theme-primary': colors.primary || (themeDef.defaultColors as any).primary,
    '--theme-primary-hover': colors.secondary || themeDef.defaultTokens['--theme-primary-hover'] || colors.primary,
    '--theme-secondary': colors.secondary || (themeDef.defaultColors as any).secondary,
    '--theme-accent': colors.accent ?? (themeDef.defaultColors as any).accent ?? colors.secondary,
    '--theme-bg': colors.background || (themeDef.defaultColors as any).background,
    
    '--theme-surface': (colors.surface || themeDef.defaultTokens['--theme-surface']) ?? '#FFFFFF',
    '--theme-surface-alt': colors.surface 
      ? colors.surface 
      : (themeDef.defaultTokens['--theme-surface-alt'] ?? colors.background ?? '#F9FAFB'),
    '--theme-text': (colors.text || themeDef.defaultTokens['--theme-text']) ?? '#1F2937',
    '--theme-text-muted': (colors.textMuted || themeDef.defaultTokens['--theme-text-muted']) ?? '#6B7280',
    '--theme-text-accent': colors.accent || colors.secondary || colors.primary || themeDef.defaultTokens['--theme-text-accent'],
    '--theme-border': (colors.border || themeDef.defaultTokens['--theme-border']) ?? '#E5E7EB',
    '--theme-border-accent': colors.primary || colors.border || themeDef.defaultTokens['--theme-border-accent'],
    
    '--font-heading': `'${fonts.heading}', serif`,
    '--font-body': `'${fonts.body}', sans-serif`,
  };

  // User custom token overrides — full flexibility
  const customTokens = (cfg as any).customTokens ?? {};

  return { ...base, ...customTokens } as React.CSSProperties;
}

// ---------------------------------------------------------------------------
// ThemeRenderer
// ---------------------------------------------------------------------------

export interface ThemeRendererProps extends ThemeProps {
  themeId?: string;
  themeVersion?: string;
}

export function ThemeRenderer(props: ThemeRendererProps) {
  const { invitation } = props;
  const cfg = invitation?.config;
  const activeThemeId = props.themeId ?? cfg?.themeId ?? 'serenity';
  const activeThemeVersion = props.themeVersion ?? cfg?.themeVersion;

  const themeDef = getTheme(activeThemeId, activeThemeVersion);
  const defaultThemeDef = getTheme('serenity');
  const ThemeComponent = themeDef.component;

  const themeStyle = buildThemeStyle(themeDef, cfg);

  // Defensive safe wedding
  const defaultEvent = { title: '', date: '', time: '', venue: '', address: '' };
  const safeWedding = {
    ...props.wedding,
    akadEvent: props.wedding?.akadEvent ?? defaultEvent,
    receptionEvent: props.wedding?.receptionEvent ?? defaultEvent,
    stories: props.wedding?.stories ?? [],
    gifts: props.wedding?.gifts ?? [],
    groomName: props.wedding?.groomName ?? '',
    brideName: props.wedding?.brideName ?? '',
  };

  const safeProps: ThemeProps = {
    ...props,
    wedding: safeWedding,
    rsvps: props.rsvps ?? [],
    guestbook: props.guestbook ?? [],
  };

  return (
    <div
      className="theme-container min-h-screen w-full relative"
      style={themeStyle}
      data-theme={themeDef.id}
      data-theme-version={themeDef.version}
      data-theme-category={themeDef.category}
    >
      <ThemeErrorBoundary
        fallbackTheme={defaultThemeDef.component}
        themeProps={safeProps}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-slate-800 animate-spin" />
          </div>
        }>
          <ThemeComponent {...safeProps} />
        </Suspense>
      </ThemeErrorBoundary>
    </div>
  );
}
