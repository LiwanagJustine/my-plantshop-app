'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function UnauthorizedAccess() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const { theme } = useTheme();

    console.log('🚫 UnauthorizedAccess component rendered');
    console.log('🚫 Current user:', user);

    const handleGoBack = () => {
        if (user?.role === 'customer') {
            router.push('/customer/dashboard');
        } else {
            router.push('/');
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push('/auth/login');
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${theme === 'dark'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-50 text-gray-900'
            }`}>
            <div className={`max-w-md w-full text-center p-8 rounded-lg shadow-lg ${theme === 'dark'
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
                }`}>
                {/* Error Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                    <svg
                        className="h-8 w-8 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>

                {/* Error Title */}
                <h1 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`}>
                    Access Denied
                </h1>

                {/* Error Message */}
                <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    You don't have permission to access this page.
                </p>

                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    This area is restricted to administrators only.
                </p>

                {/* User Info */}
                {user && (
                    <div className={`mb-6 p-4 rounded-lg ${theme === 'dark'
                            ? 'bg-gray-700 border border-gray-600'
                            : 'bg-gray-100 border border-gray-200'
                        }`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                            Logged in as:
                        </p>
                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            {user.email}
                        </p>
                        <p className={`text-sm capitalize ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            }`}>
                            Role: {user.role}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleGoBack}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark'
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        {user?.role === 'customer' ? 'Go to Dashboard' : 'Go to Home'}
                    </button>

                    <button
                        onClick={handleLogout}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark'
                                ? 'bg-gray-600 hover:bg-gray-700 text-gray-200 border border-gray-500'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
                            }`}
                    >
                        Switch Account
                    </button>

                    <Link
                        href="/"
                        className={`inline-block w-full px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark'
                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Return to Homepage
                    </Link>
                </div>

                {/* Security Notice */}
                <div className={`mt-6 p-3 rounded-lg ${theme === 'dark'
                        ? 'bg-yellow-900/20 border border-yellow-700/30'
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                    <p className={`text-xs ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'
                        }`}>
                        🔒 This attempt has been logged for security purposes.
                    </p>
                </div>
            </div>
        </div>
    );
}
