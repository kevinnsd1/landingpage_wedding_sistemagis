import { ThemeDefinition } from '@/theme-engine/types';
import { auroraThemeMeta } from './theme';
import { AuroraTheme } from './AuroraTheme';

export const auroraTheme: ThemeDefinition = {
  ...auroraThemeMeta,
  component: AuroraTheme,
};

export { AuroraTheme };
export * from './theme';
