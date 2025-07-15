'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function DemoCredentials() {
    const { theme } = useTheme();
    const [copiedText, setCopiedText] = useState<string | null>(null);

    const credentials = [
        {
            title: 'Customer Account',
            email: 'customer@plantshop.com',
            password: 'Customer123',
            role: 'customer'
        },
        {
            title: 'Admin Account',
            email: 'admin@plantshop.com',
            password: 'Admin123',
            role: 'Administrator'
        }
    ];

    const copyToClipboard = async (text: string) => {
        try {
            // Modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers or non-secure contexts
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'absolute';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            // Show feedback
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 2000);
        } catch (error) {
            console.error('Failed to copy text:', error);
            // Fallback method
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'absolute';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                setCopiedText(text);
                setTimeout(() => setCopiedText(null), 2000);
            } catch (fallbackError) {
                console.error('All copy methods failed:', fallbackError);
                alert('Copy failed. Please manually select and copy the text.');
            }
        }
    };

    return (
        <div className={`mt-8 p-6 rounded-lg border ${theme === 'dark'
            ? 'bg-blue-900/10 border-blue-500/20'
            : 'bg-blue-50 border-blue-200'
            }`}>
            <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
                    }`}>
                    Demo Credentials
                </h3>
            </div>

            <div className="space-y-4">
                {credentials.map((cred, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg border ${theme === 'dark'
                            ? 'bg-gray-800/50 border-gray-600'
                            : 'bg-white border-gray-200'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                }`}>
                                {cred.title}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark'
                                ? 'bg-green-900/30 text-green-400'
                                : 'bg-green-100 text-green-700'
                                }`}>
                                {cred.role}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Email:
                                </span>
                                <button
                                    onClick={() => copyToClipboard(cred.email)}
                                    className={`relative text-sm font-mono px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-2 ${copiedText === cred.email
                                            ? theme === 'dark'
                                                ? 'bg-green-900/30 text-green-400'
                                                : 'bg-green-100 text-green-700'
                                            : theme === 'dark'
                                                ? 'hover:bg-gray-700 text-gray-300'
                                                : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                    title="Click to copy"
                                >
                                    {cred.email}
                                    {copiedText === cred.email ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Password:
                                </span>
                                <button
                                    onClick={() => copyToClipboard(cred.password)}
                                    className={`relative text-sm font-mono px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-2 ${copiedText === cred.password
                                            ? theme === 'dark'
                                                ? 'bg-green-900/30 text-green-400'
                                                : 'bg-green-100 text-green-700'
                                            : theme === 'dark'
                                                ? 'hover:bg-gray-700 text-gray-300'
                                                : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                    title="Click to copy"
                                >
                                    {cred.password}
                                    {copiedText === cred.password ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className={`text-xs mt-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                💡 Click on email or password to copy to clipboard • ✅ Green checkmark indicates successful copy
            </p>
        </div>
    );
}
