'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface AdminLoadingOverlayProps {
    message?: string;
    isVisible?: boolean;
}

export default function AdminLoadingOverlay({
    message = "Verifying access permissions...",
    isVisible = true
}: AdminLoadingOverlayProps) {
    const { theme } = useTheme();

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop with blur */}
            <div className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${theme === 'dark'
                    ? 'bg-gray-900/70'
                    : 'bg-white/70'
                }`} />

            {/* Loading Content */}
            <div className={`relative z-10 px-8 py-6 rounded-2xl shadow-xl border transition-all duration-300 ${theme === 'dark'
                    ? 'bg-gray-800/90 border-gray-700 text-white'
                    : 'bg-white/90 border-gray-200 text-gray-900'
                }`}>
                <div className="text-center">
                    {/* Animated Logo/Icon */}
                    <div className="mb-4 flex justify-center">
                        <div className="relative">
                            {/* Outer Ring */}
                            <div className={`w-16 h-16 rounded-full border-4 border-transparent animate-spin ${theme === 'dark'
                                    ? 'border-t-green-400 border-r-green-400'
                                    : 'border-t-green-500 border-r-green-500'
                                }`}
                                style={{ animationDuration: '1s' }} />

                            {/* Inner Ring */}
                            <div className={`absolute inset-2 w-12 h-12 rounded-full border-4 border-transparent animate-spin ${theme === 'dark'
                                    ? 'border-b-blue-400 border-l-blue-400'
                                    : 'border-b-blue-500 border-l-blue-500'
                                }`}
                                style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />

                            {/* Center Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`text-2xl animate-pulse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                    🔒
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Admin Access
                    </h3>

                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        {message}
                    </p>

                    {/* Animated Dots */}
                    <div className="mt-4 flex justify-center space-x-1">
                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark'
                                        ? 'bg-green-400'
                                        : 'bg-green-500'
                                    }`}
                                style={{
                                    animationDelay: `${index * 0.2}s`,
                                    animationDuration: '0.8s'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
