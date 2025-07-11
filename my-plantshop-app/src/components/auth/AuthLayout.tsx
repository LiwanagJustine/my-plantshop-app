'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen flex ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-green-50 via-white to-green-50'
            }`}>
            {/* Left Side - Branding */}
            <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${theme === 'dark'
                    ? 'bg-gradient-to-br from-green-900 via-green-800 to-gray-900'
                    : 'bg-gradient-to-br from-green-600 via-green-700 to-green-800'
                }`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                        <defs>
                            <pattern id="plant-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M10 2C10 2 8 4 8 8C8 12 10 14 10 14C10 14 12 12 12 8C12 4 10 2 10 2Z" fill="currentColor" />
                                <path d="M10 14C10 14 8 16 8 20C8 24 10 26 10 26C10 26 12 24 12 20C12 16 10 14 10 14Z" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#plant-pattern)" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 py-8 text-white">
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C10.34 2 9 3.34 9 5c0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.66-1.34-3-3-3zm0 16c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm6-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-12 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold">PlantShop</h1>
                        </div>

                        {/* Tagline */}
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold leading-tight">
                                Grow Your Green Paradise
                            </h2>
                            <p className="text-xl text-green-100 leading-relaxed">
                                Discover thousands of beautiful plants, expert care guides, and everything you need to create your perfect indoor garden.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4 pt-8">
                            {[
                                { icon: '🌱', text: 'Premium quality plants from trusted growers' },
                                { icon: '📦', text: 'Fast & secure delivery with care instructions' },
                                { icon: '💚', text: 'Expert support for your plant journey' },
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <span className="text-2xl">{feature.icon}</span>
                                    <span className="text-green-100">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 lg:w-1/2 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6">
                    {/* Mobile Logo */}
                    <Link href="/" className="lg:hidden flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-green-600' : 'bg-green-600'
                            }`}>
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C10.34 2 9 3.34 9 5c0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.66-1.34-3-3-3zm0 16c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm6-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-12 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                        </div>
                        <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            PlantShop
                        </span>
                    </Link>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md space-y-8">
                        {/* Title */}
                        <div className="text-center space-y-2">
                            <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                {title}
                            </h3>
                            {subtitle && (
                                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* Form */}
                        <div className={`p-8 rounded-2xl shadow-xl ${theme === 'dark'
                                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700'
                                : 'bg-white/80 backdrop-blur-sm border border-white/50'
                            }`}>
                            {children}
                        </div>

                        {/* Back to Home */}
                        <div className="text-center">
                            <Link
                                href="/"
                                className={`inline-flex items-center space-x-2 text-sm font-medium transition-colors ${theme === 'dark'
                                        ? 'text-gray-400 hover:text-green-400'
                                        : 'text-gray-600 hover:text-green-600'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back to PlantShop</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
