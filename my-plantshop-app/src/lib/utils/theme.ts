/**
 * Theme utility functions
 */

export type Theme = 'light' | 'dark';

/**
 * Get the system theme preference
 */
export function getSystemTheme(): Theme {
    if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
}

/**
 * Get the saved theme from localStorage
 */
export function getSavedTheme(): Theme | null {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        return saved === 'light' || saved === 'dark' ? saved : null;
    }
    return null;
}

/**
 * Save theme to localStorage
 */
export function saveTheme(theme: Theme): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
    }
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: Theme): void {
    if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }
}

/**
 * Initialize theme on app load
 */
export function initializeTheme(): Theme {
    const saved = getSavedTheme();
    const theme = saved || getSystemTheme();
    applyTheme(theme);
    return theme;
}
