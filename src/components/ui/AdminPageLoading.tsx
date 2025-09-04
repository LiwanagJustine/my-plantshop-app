'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface AdminPageLoadingProps {
    message?: string;
    showOverlay?: boolean;
}

export default function AdminPageLoading({
    message = "Loading...",
    showOverlay = false
}: AdminPageLoadingProps) {
    const { theme } = useTheme();

    const loadingContent = (
        <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
                {/* Animated Plant Icon */}
                <div className="mb-4 flex justify-center">
                    <div className="relative">
                        <div className={`w-12 h-12 rounded-full border-4 border-transparent animate-spin ${theme === 'dark'
                                ? 'border-t-green-400 border-r-green-400'
                                : 'border-t-green-500 border-r-green-500'
                            }`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`text-xl animate-pulse ${theme === 'dark' ? 'text-green-400' : 'text-green-500'
                                }`}>
                                🌱
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {message}
                </p>

                {/* Animated Dots */}
                <div className="mt-2 flex justify-center space-x-1">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === 'dark'
                                    ? 'bg-green-400'
                                    : 'bg-green-500'
                                }`}
                            style={{
                                animationDelay: `${index * 0.15}s`,
                                animationDuration: '0.6s'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    if (showOverlay) {
        return (
            <div className="fixed inset-0 z-40 flex items-center justify-center">
                <div className={`absolute inset-0 backdrop-blur-sm ${theme === 'dark'
                        ? 'bg-gray-900/50'
                        : 'bg-white/50'
                    }`} />
                <div className="relative z-10">
                    {loadingContent}
                </div>
            </div>
        );
    }

    return loadingContent;
}
