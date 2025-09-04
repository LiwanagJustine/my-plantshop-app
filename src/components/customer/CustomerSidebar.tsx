'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
    badge?: string;
    subItems?: SidebarItem[];
}

const customerSidebarItems: SidebarItem[] = [
    {
        id: 'dashboard',
        label: 'My Dashboard',
        href: '/customer/dashboard',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        id: 'orders',
        label: 'My Orders',
        href: '/customer/orders',
        badge: '2',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
    },
    {
        id: 'plants',
        label: 'My Plants',
        href: '/customer/plants',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        ),
        subItems: [
            {
                id: 'my-collection',
                label: 'My Collection',
                href: '/customer/plants/collection',
                icon: <span className="w-2 h-2 rounded-full bg-current"></span>
            },
            {
                id: 'care-reminders',
                label: 'Care Reminders',
                href: '/customer/plants/reminders',
                icon: <span className="w-2 h-2 rounded-full bg-current"></span>,
                badge: '3'
            },
            {
                id: 'plant-journal',
                label: 'Plant Journal',
                href: '/customer/plants/journal',
                icon: <span className="w-2 h-2 rounded-full bg-current"></span>
            }
        ]
    },
    {
        id: 'wishlist',
        label: 'Wishlist',
        href: '/customer/wishlist',
        badge: '7',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
    {
        id: 'browse',
        label: 'Browse Plants',
        href: '/products',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        id: 'support',
        label: 'Plant Care Help',
        href: '/customer/support',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

export function CustomerSidebar() {
    const { theme } = useTheme();
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>(['plants']);

    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const isActive = (href: string) => {
        return pathname === href || pathname?.startsWith(href + '/');
    };

    return (
        <div className={`w-64 h-full flex flex-col border-r ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 p-6 border-b border-current/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                    🌱
                </div>
                <div>
                    <h1 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        PlantShop
                    </h1>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        My Account
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {customerSidebarItems.map((item) => (
                    <div key={item.id}>
                        {/* Main Item */}
                        <div className="relative">
                            {item.subItems ? (
                                <button
                                    onClick={() => toggleExpanded(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(item.href)
                                            ? theme === 'dark'
                                                ? 'bg-green-900/50 text-green-400 border border-green-500/30'
                                                : 'bg-green-50 text-green-700 border border-green-200'
                                            : theme === 'dark'
                                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    {item.icon}
                                    <span className="flex-1 text-left">{item.label}</span>
                                    {item.badge && (
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${theme === 'dark'
                                                ? 'bg-green-900 text-green-400'
                                                : 'bg-green-100 text-green-700'
                                            }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                    <svg
                                        className={`w-4 h-4 transition-transform ${expandedItems.includes(item.id) ? 'rotate-90' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(item.href)
                                            ? theme === 'dark'
                                                ? 'bg-green-900/50 text-green-400 border border-green-500/30'
                                                : 'bg-green-50 text-green-700 border border-green-200'
                                            : theme === 'dark'
                                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    {item.icon}
                                    <span className="flex-1">{item.label}</span>
                                    {item.badge && (
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${theme === 'dark'
                                                ? 'bg-green-900 text-green-400'
                                                : 'bg-green-100 text-green-700'
                                            }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            )}
                        </div>

                        {/* Sub Items */}
                        {item.subItems && expandedItems.includes(item.id) && (
                            <div className="ml-6 mt-2 space-y-1">
                                {item.subItems.map((subItem) => (
                                    <Link
                                        key={subItem.id}
                                        href={subItem.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive(subItem.href)
                                                ? theme === 'dark'
                                                    ? 'bg-green-900/30 text-green-400'
                                                    : 'bg-green-50 text-green-700'
                                                : theme === 'dark'
                                                    ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                            }`}
                                    >
                                        {subItem.icon}
                                        <span className="flex-1">{subItem.label}</span>
                                        {subItem.badge && (
                                            <span className={`px-1.5 py-0.5 text-xs rounded-full ${theme === 'dark'
                                                    ? 'bg-orange-900/50 text-orange-400'
                                                    : 'bg-orange-100 text-orange-600'
                                                }`}>
                                                {subItem.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                <Link
                    href="/customer/profile"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>My Profile</span>
                </Link>
            </div>
        </div>
    );
}
