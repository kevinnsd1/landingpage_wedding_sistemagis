import { ThemeDefinition } from '@/theme-engine/types';
import { serenityThemeMeta } from './theme';
import { SerenityTheme } from './SerenityTheme';

export const serenityTheme: ThemeDefinition = {
  ...serenityThemeMeta,
  component: SerenityTheme,
};

export { SerenityTheme };
export * from './theme';
