'use client';

import React, { createContext, useContext } from 'react';
import { useThemeState } from '../hooks/useTheme';
import { type Theme } from '../lib/utils/theme';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const themeState = useThemeState();

    // Return children immediately to avoid hydration mismatches
    // The theme will be applied via the init script before React hydrates
    return (
        <ThemeContext.Provider value={themeState}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
