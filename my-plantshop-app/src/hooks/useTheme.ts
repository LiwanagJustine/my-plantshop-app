'use client';

import { useEffect, useState } from 'react';
import { type Theme } from '../lib/utils/theme';
import { getInitialTheme, applyTheme, saveTheme } from '../lib/utils/theme-hydration';

/**
 * Custom hook for theme management with hydration safety
 * Provides theme state and toggle functionality with persistence
 */
export function useThemeState() {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set mounted first to prevent hydration issues
        setMounted(true);

        // Get the actual theme that was set by the init script
        const currentTheme = getInitialTheme();
        setTheme(currentTheme);
    }, []);

    const toggleTheme = () => {
        if (!mounted) return; // Prevent actions before mounting

        const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
        saveTheme(newTheme);
    };

    const setThemeValue = (newTheme: Theme) => {
        if (!mounted) return; // Prevent actions before mounting

        setTheme(newTheme);
        applyTheme(newTheme);
        saveTheme(newTheme);
    };

    return {
        theme,
        toggleTheme,
        setTheme: setThemeValue,
        mounted,
    };
}
