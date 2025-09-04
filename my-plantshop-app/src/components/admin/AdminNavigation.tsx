'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

interface AdminLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    showLoading?: boolean;
}

export function AdminLink({ href, children, className = '', showLoading = false }: AdminLinkProps) {
    const { theme } = useTheme();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        if (showLoading) {
            // Show minimal loading state for navigation
            const loadingElement = document.createElement('div');
            loadingElement.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-opacity ${theme === 'dark'
                    ? 'bg-gray-800 text-white border border-gray-700'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`;
            loadingElement.innerHTML = `
                <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
                    <span class="text-sm">Loading...</span>
                </div>
            `;
            document.body.appendChild(loadingElement);

            // Remove loading element after navigation
            setTimeout(() => {
                if (document.body.contains(loadingElement)) {
                    document.body.removeChild(loadingElement);
                }
            }, 2000);
        }
    };

    return (
        <Link
            href={href}
            className={className}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
}

interface AdminButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}

export function AdminButton({
    onClick,
    children,
    className = '',
    variant = 'primary',
    disabled = false
}: AdminButtonProps) {
    const { theme } = useTheme();

    const getVariantStyles = () => {
        const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

        switch (variant) {
            case 'primary':
                return `${baseStyles} bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`;
            case 'secondary':
                return `${baseStyles} ${theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
            case 'danger':
                return `${baseStyles} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`;
            default:
                return baseStyles;
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${getVariantStyles()} ${className}`}
        >
            {children}
        </button>
    );
}
