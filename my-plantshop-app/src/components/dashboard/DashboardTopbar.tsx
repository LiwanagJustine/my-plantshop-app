'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function DashboardTopbar() {
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
                                placeholder="Search products, orders..."
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

                    {/* Quick Add */}
                    <button className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark'
                            ? 'bg-green-600 hover:bg-green-500 text-white'
                            : 'bg-green-600 hover:bg-green-500 text-white'
                        }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Product
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
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
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
                                    <h3 className="font-semibold">Notifications</h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    <NotificationItem
                                        title="New Order #1234"
                                        message="Order received from customer John Doe"
                                        time="2 min ago"
                                        type="order"
                                    />
                                    <NotificationItem
                                        title="Low Stock Alert"
                                        message="Monstera Deliciosa is running low (5 left)"
                                        time="1 hour ago"
                                        type="warning"
                                    />
                                    <NotificationItem
                                        title="Payment Received"
                                        message="$89.99 payment confirmed for order #1233"
                                        time="3 hours ago"
                                        type="success"
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
                                John Doe
                            </p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                Admin
                            </p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-sm">
                            JD
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

interface NotificationItemProps {
    title: string;
    message: string;
    time: string;
    type: 'order' | 'warning' | 'success' | 'info';
}

function NotificationItem({ title, message, time, type }: NotificationItemProps) {
    const { theme } = useTheme();

    const getIcon = () => {
        switch (type) {
            case 'order':
                return (
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                );
            case 'warning':
                return (
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                );
            case 'success':
                return (
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
