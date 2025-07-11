'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export function UserNav() {
    const { user, logout } = useAuth();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            setIsOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center gap-4">
                <Link
                    href="/auth/login"
                    className={`text-sm font-medium transition-colors ${theme === 'dark'
                            ? 'text-gray-300 hover:text-white'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                >
                    Sign In
                </Link>
                <Link
                    href="/auth/register"
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${theme === 'dark'
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
            >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${theme === 'dark'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}>
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border ${theme === 'dark'
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    } z-50`}>
                    <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            {user.name}
                        </p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            {user.email}
                        </p>
                        <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${user.role === 'admin'
                                ? theme === 'dark'
                                    ? 'bg-blue-900/30 text-blue-400'
                                    : 'bg-blue-100 text-blue-700'
                                : theme === 'dark'
                                    ? 'bg-green-900/30 text-green-400'
                                    : 'bg-green-100 text-green-700'
                            }`}>
                            {user.role}
                        </span>
                    </div>

                    <div className="py-1">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 text-sm transition-colors ${theme === 'dark'
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Profile
                        </Link>
                        <Link
                            href="/orders"
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 text-sm transition-colors ${theme === 'dark'
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Orders
                        </Link>
                        {user.role === 'admin' && (
                            <Link
                                href="/admin"
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2 text-sm transition-colors ${theme === 'dark'
                                        ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700'
                                        : 'text-blue-600 hover:text-blue-700 hover:bg-gray-100'
                                    }`}
                            >
                                Admin Panel
                            </Link>
                        )}
                    </div>

                    <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <button
                            onClick={handleLogout}
                            className={`block w-full text-left px-4 py-2 text-sm transition-colors ${theme === 'dark'
                                    ? 'text-red-400 hover:text-red-300 hover:bg-gray-700'
                                    : 'text-red-600 hover:text-red-700 hover:bg-gray-100'
                                }`}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
