'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function CustomerTopbar() {
    const { theme, toggleTheme } = useTheme();
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className={`border-b backdrop-blur-sm ${theme === 'dark'
                ? 'bg-gray-800/90 border-gray-700'
                : 'bg-white/90 border-gray-200'
            }`}>
            <div className="flex items-center justify-between h-16 px-6">
                {/* Left Side - Mobile Menu & Search */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Search */}
                    <div className="relative hidden md:block">
                        <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-all ${showSearch || theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search plants, care tips..."
                                className="bg-transparent border-none outline-none text-sm w-64"
                                onFocus={() => setShowSearch(true)}
                                onBlur={() => setShowSearch(false)}
                            />
                            <kbd className={`px-1.5 py-0.5 text-xs rounded border ${theme === 'dark'
                                    ? 'bg-gray-600 border-gray-500 text-gray-300'
                                    : 'bg-gray-200 border-gray-300 text-gray-500'
                                }`}>
                                ⌘K
                            </kbd>
                        </div>
                    </div>
                </div>

                {/* Right Side - Actions & User Menu */}
                <div className="flex items-center gap-4">
                    {/* Mobile Search Button */}
                    <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Wishlist Quick Access */}
                    <button className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark'
                            ? 'bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 border border-pink-500/30'
                            : 'bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200'
                        }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Wishlist (7)
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`p-2 rounded-lg transition-colors relative ${theme === 'dark'
                                    ? 'hover:bg-gray-700'
                                    : 'hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 3a4 4 0 014 4v7.5l2 2V19H2v-2.5l2-2V7a4 4 0 014-4z" />
                            </svg>
                            {/* Notification Badge */}
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border z-50 ${theme === 'dark'
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-200'
                                }`}>
                                <div className="p-4 border-b border-current/10">
                                    <h3 className="font-semibold">Plant Care Notifications</h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    <CustomerNotificationItem
                                        title="Time to water your Monstera!"
                                        message="Your Monstera Deliciosa needs watering today"
                                        time="2 hours ago"
                                        type="reminder"
                                    />
                                    <CustomerNotificationItem
                                        title="Order shipped!"
                                        message="Your Snake Plant is on its way"
                                        time="1 day ago"
                                        type="order"
                                    />
                                    <CustomerNotificationItem
                                        title="New care tip available"
                                        message="Learn how to repot your Peace Lily"
                                        time="2 days ago"
                                        type="tip"
                                    />
                                </div>
                                <div className="p-3 border-t border-current/10">
                                    <button className="text-sm text-green-600 hover:text-green-500 font-medium">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                ? 'hover:bg-gray-700'
                                : 'hover:bg-gray-100'
                            }`}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                Emily Johnson
                            </p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                Plant Parent 🌱
                            </p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-sm">
                            EJ
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

interface CustomerNotificationItemProps {
    title: string;
    message: string;
    time: string;
    type: 'reminder' | 'order' | 'tip' | 'info';
}

function CustomerNotificationItem({ title, message, time, type }: CustomerNotificationItemProps) {
    const { theme } = useTheme();

    const getIcon = () => {
        switch (type) {
            case 'reminder':
                return (
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            case 'order':
                return (
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                );
            case 'tip':
                return (
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
        }
    };

    return (
        <div className={`p-4 border-b border-current/5 hover:bg-current/5 transition-colors cursor-pointer`}>
            <div className="flex gap-3">
                {getIcon()}
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {title}
                    </p>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {message}
                    </p>
                    <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                        {time}
                    </p>
                </div>
            </div>
        </div>
    );
}
