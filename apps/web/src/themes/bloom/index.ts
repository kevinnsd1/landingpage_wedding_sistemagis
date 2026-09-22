import { ThemeDefinition } from '@/theme-engine/types';
import { bloomThemeMeta } from './theme';
import { BloomTheme } from './BloomTheme';

export const bloomTheme: ThemeDefinition = {
  ...bloomThemeMeta,
  component: BloomTheme,
};

export { BloomTheme };
export * from './theme';
