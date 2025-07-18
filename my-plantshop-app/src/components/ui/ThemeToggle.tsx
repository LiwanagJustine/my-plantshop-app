'use client';

import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    // Show a placeholder while not mounted to prevent hydration issues
    if (!mounted) {
        return (
            <div className="p-2 w-9 h-9 rounded-lg bg-slate-100 animate-pulse">
                <div className="w-5 h-5"></div>
            </div>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${theme === 'light'
                    ? 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-emerald-900/20'
                }`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                // Moon icon for light mode (click to go dark)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                // Sun icon for dark mode (click to go light)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
}
