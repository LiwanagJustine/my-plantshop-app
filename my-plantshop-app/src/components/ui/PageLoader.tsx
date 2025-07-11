'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface PageLoaderProps {
    onLoadingComplete?: () => void;
    minLoadingTime?: number;
}

export default function PageLoader({ onLoadingComplete, minLoadingTime = 2000 }: PageLoaderProps) {
    const { theme } = useTheme();
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Growing your garden...');

    const loadingMessages = [
        'Growing your garden...',
        'Watering the plants...',
        'Collecting fresh plants...',
        'Preparing your experience...',
        'Almost ready!'
    ];

    useEffect(() => {
        const startTime = Date.now();
        let progressInterval: NodeJS.Timeout;
        let textInterval: NodeJS.Timeout;

        // Progress animation
        progressInterval = setInterval(() => {
            setProgress(prev => {
                const elapsed = Date.now() - startTime;
                const targetProgress = Math.min((elapsed / minLoadingTime) * 100, 100);
                const newProgress = prev + (targetProgress - prev) * 0.1;

                if (newProgress >= 99.5) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        onLoadingComplete?.();
                    }, 500);
                    return 100;
                }

                return newProgress;
            });
        }, 50);

        // Text animation
        textInterval = setInterval(() => {
            setLoadingText(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 800);

        return () => {
            clearInterval(progressInterval);
            clearInterval(textInterval);
        };
    }, [minLoadingTime, onLoadingComplete]);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${theme === 'light'
                ? 'bg-gradient-to-br from-emerald-50 via-white to-teal-50'
                : 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20'
            }`}>
            <div className="text-center space-y-8 max-w-md mx-auto px-6">
                {/* Logo and Plant Animation */}
                <div className="relative">
                    <div className={`absolute inset-0 rounded-full blur-3xl opacity-60 animate-pulse ${theme === 'light' ? 'bg-emerald-200/30' : 'bg-emerald-600/20'
                        }`}></div>
                    <div className={`relative backdrop-blur-sm rounded-2xl p-8 border shadow-xl ${theme === 'light'
                            ? 'bg-white/80 border-emerald-200/50'
                            : 'bg-slate-800/80 border-emerald-600/30'
                        }`}>
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center animate-bounce">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                }`}>PlantShop</h1>
                        </div>

                        {/* Animated Plants */}
                        <div className="flex justify-center space-x-2 mb-6">
                            <div className="w-3 h-6 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-3 h-8 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                            <div className="w-3 h-5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                            <div className="w-3 h-7 bg-emerald-600 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
                            <div className="w-3 h-4 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '800ms' }}></div>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-4">
                    <p className={`text-lg font-medium transition-all duration-500 ease-in-out ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'
                        }`}>
                        {loadingText}
                    </p>

                    {/* Progress Bar */}
                    <div className={`w-full rounded-full h-2 overflow-hidden ${theme === 'light' ? 'bg-emerald-100' : 'bg-slate-700'
                        }`}>
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    {/* Progress Percentage */}
                    <p className={`text-sm font-medium ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                        {Math.round(progress)}%
                    </p>
                </div>

                {/* Floating Elements */}
                <div className={`absolute top-20 left-20 w-4 h-4 rounded-full animate-bounce ${theme === 'light' ? 'bg-emerald-300/60' : 'bg-emerald-400/40'
                    }`} style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
                <div className={`absolute top-40 right-20 w-3 h-3 rounded-full animate-bounce ${theme === 'light' ? 'bg-teal-300/60' : 'bg-teal-400/40'
                    }`} style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
                <div className={`absolute bottom-40 left-32 w-2 h-2 rounded-full animate-bounce ${theme === 'light' ? 'bg-emerald-400/60' : 'bg-emerald-500/40'
                    }`} style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
                <div className={`absolute bottom-32 right-40 w-3 h-3 rounded-full animate-bounce ${theme === 'light' ? 'bg-teal-400/60' : 'bg-teal-500/40'
                    }`} style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}></div>
            </div>
        </div>
    );
}
