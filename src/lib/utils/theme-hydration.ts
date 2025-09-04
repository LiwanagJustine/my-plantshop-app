/**
 * Hydration-Safe Theme System
 * 
 * This module provides utilities for theme management that avoid hydration mismatches
 * by ensuring consistent behavior between server and client rendering.
 */

export type Theme = 'light' | 'dark';

/**
 * Gets the initial theme without causing hydration issues
 * This should only be called on the client side
 */
export function getInitialTheme(): Theme {
    // Only run on client side
    if (typeof window === 'undefined') {
        return 'light'; // Default for SSR
    }

    try {
        // Check localStorage first
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
        }

        // Fall back to system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    } catch (error) {
        console.warn('Error reading theme preference:', error);
        return 'light';
    }
}

/**
 * Applies theme to the document element
 */
export function applyTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;

    try {
        document.documentElement.className = theme;
        document.documentElement.setAttribute('data-theme', theme);
    } catch (error) {
        console.warn('Error applying theme:', error);
    }
}

/**
 * Saves theme preference to localStorage
 */
export function saveTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem('theme', theme);
    } catch (error) {
        console.warn('Error saving theme preference:', error);
    }
}

/**
 * Theme initialization script for blocking theme flash
 * This runs before React hydration to set the theme immediately
 */
export const themeInitScript = `
(function() {
  function setTheme() {
    try {
      var theme = localStorage.getItem('theme');
      if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.className = theme;
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      document.documentElement.className = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
  
  setTheme();
})();
`;
