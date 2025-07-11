/**
 * Theme-related constants
 */

export const THEME_STORAGE_KEY = 'theme';

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
} as const;

export const THEME_CONFIG = {
    // CSS classes for theme transitions
    transitionClasses: 'transition-colors duration-300',

    // Storage configuration
    storage: {
        key: THEME_STORAGE_KEY,
    },

    // Media query for system preference
    mediaQuery: '(prefers-color-scheme: dark)',
} as const;

export type ThemeValue = typeof THEMES[keyof typeof THEMES];
