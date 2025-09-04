'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';

export function DashboardTopbar() {
    const { theme, toggleTheme } = useTheme();
    const { currency, toggleCurrency } = useCurrency();
    const { user, logout } = useAuth();
    const router = useRouter();
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Helper function to get user initials
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2); // Take only first 2 initials
    };

    // Helper function to capitalize role
    const getDisplayRole = (role: string) => {
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    // Handle sign out
    const handleSignOut = async () => {
        try {
            await logout();
            setShowUserMenu(false);
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showUserMenu || showNotifications) {
                const target = event.target as Element;
                if (!target.closest('.dropdown-container')) {
                    setShowUserMenu(false);
                    setShowNotifications(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu, showNotifications]);

    return (
        <header className={`border-b backdrop-blur-sm ${theme === 'dark'
            ? 'bg-gray-800/90 border-gray-700'
            : 'bg-white/90 border-gray-200'
            }`}>
            <div className="flex items-center justify-between h-16 px-6">
                {/* Left Side - Mobile Menu & Search */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
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
                    <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Quick Add */}
                    <button
                        onClick={() => {
                            router.push('/admin/products/add');
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${theme === 'dark'
                            ? 'bg-green-600 hover:bg-green-500 text-white'
                            : 'bg-green-600 hover:bg-green-500 text-white'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Product
                    </button>

                    {/* Currency Toggle */}
                    <button
                        onClick={toggleCurrency}
                        className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border cursor-pointer ${theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                            }`}
                        title={`Switch to ${currency === 'USD' ? 'Philippine Peso' : 'US Dollar'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        {currency === 'USD' ? 'USD ($)' : 'PHP (₱)'}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                    </button>

                    {/* Notifications */}
                    <div className="relative dropdown-container">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`p-2 rounded-lg transition-colors relative cursor-pointer ${theme === 'dark'
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
                                        message="Order received from customer Emily Johnson"
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
                                    <button className="text-sm text-green-600 hover:text-green-500 font-medium cursor-pointer">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${theme === 'dark'
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
                    <div className="relative dropdown-container">
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {user?.name || 'Loading...'}
                                </p>
                                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    {user?.role ? getDisplayRole(user.role) : 'User'}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:from-green-600 hover:to-green-700 transition-all"
                            >
                                {user?.name ? getUserInitials(user.name) : '?'}
                            </button>
                        </div>

                        {/* User Dropdown Menu */}
                        {showUserMenu && (
                            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${theme === 'dark'
                                ? 'bg-gray-800 border-gray-700'
                                : 'bg-white border-gray-200'
                                }`}>
                                <div className="p-3 border-b border-current/10">
                                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {user?.name || 'User'}
                                    </p>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }`}>
                                        {user?.email || ''}
                                    </p>
                                </div>
                                <div className="py-1">
                                    <button
                                        className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2 ${theme === 'dark'
                                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile Settings
                                    </button>
                                    <button
                                        className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2 ${theme === 'dark'
                                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Account Settings
                                    </button>
                                    <div className="border-t border-current/10 my-1"></div>
                                    <button
                                        onClick={handleSignOut}
                                        className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2 ${theme === 'dark'
                                            ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300'
                                            : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                                            }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
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
