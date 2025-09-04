'use client';

import { useEffect, useState } from 'react';

export function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
          (function() {
            function getTheme() {
              try {
                const stored = localStorage.getItem('theme');
                if (stored) return stored;
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              } catch (e) {
                return 'light';
              }
            }
            
            const theme = getTheme();
            document.documentElement.setAttribute('data-theme', theme);
            document.documentElement.className = theme;
          })();
        `,
            }}
        />
    );
}

// Component that handles hydration safely
export function ThemeHydration({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // On the server and before hydration, render without theme-specific styling
    if (!mounted) {
        return (
            <div className="theme-loading">
                {children}
            </div>
        );
    }

    // After hydration, render normally
    return <>{children}</>;
}
