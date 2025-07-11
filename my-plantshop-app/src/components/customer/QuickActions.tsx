'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface QuickActionProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    color: 'green' | 'blue' | 'purple' | 'pink';
    badge?: string;
}

function QuickActionCard({ title, description, icon, href, color, badge }: QuickActionProps) {
    const { theme } = useTheme();

    const getColorClasses = () => {
        const baseClasses = theme === 'dark' ? 'border-opacity-30' : 'border-opacity-20';

        switch (color) {
            case 'green':
                return `${baseClasses} ${theme === 'dark'
                        ? 'bg-green-900/20 border-green-500 hover:bg-green-900/30'
                        : 'bg-green-50 border-green-200 hover:bg-green-100'
                    }`;
            case 'blue':
                return `${baseClasses} ${theme === 'dark'
                        ? 'bg-blue-900/20 border-blue-500 hover:bg-blue-900/30'
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`;
            case 'purple':
                return `${baseClasses} ${theme === 'dark'
                        ? 'bg-purple-900/20 border-purple-500 hover:bg-purple-900/30'
                        : 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                    }`;
            case 'pink':
                return `${baseClasses} ${theme === 'dark'
                        ? 'bg-pink-900/20 border-pink-500 hover:bg-pink-900/30'
                        : 'bg-pink-50 border-pink-200 hover:bg-pink-100'
                    }`;
            default:
                return baseClasses;
        }
    };

    const getIconColor = () => {
        switch (color) {
            case 'green':
                return theme === 'dark' ? 'text-green-400' : 'text-green-600';
            case 'blue':
                return theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
            case 'purple':
                return theme === 'dark' ? 'text-purple-400' : 'text-purple-600';
            case 'pink':
                return theme === 'dark' ? 'text-pink-400' : 'text-pink-600';
            default:
                return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
        }
    };

    return (
        <Link
            href={href}
            className={`relative p-6 rounded-xl border transition-all hover:shadow-lg cursor-pointer group ${getColorClasses()}`}
        >
            {badge && (
                <span className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-semibold rounded-full ${theme === 'dark'
                        ? 'bg-red-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                    {badge}
                </span>
            )}

            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getIconColor()}`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {title}
                    </h3>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {description}
                    </p>
                </div>
                <svg
                    className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}

export function QuickActions() {
    const quickActions: QuickActionProps[] = [
        {
            title: 'Browse Plants',
            description: 'Discover new plants for your collection',
            href: '/products',
            color: 'green',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        },
        {
            title: 'Track Orders',
            description: 'Check your recent orders and delivery status',
            href: '/customer/orders',
            color: 'blue',
            badge: '2',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            title: 'Plant Care',
            description: 'Get reminders and care tips for your plants',
            href: '/customer/plants/reminders',
            color: 'purple',
            badge: '3',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: 'My Wishlist',
            description: 'View and manage your saved plants',
            href: '/customer/wishlist',
            color: 'pink',
            badge: '7',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
            ))}
        </div>
    );
}
