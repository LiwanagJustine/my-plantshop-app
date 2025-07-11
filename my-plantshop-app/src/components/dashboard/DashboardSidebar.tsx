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

const sidebarItems: SidebarItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
            </svg>
        ),
    },
    {
        id: 'products',
        label: 'Products',
        href: '/dashboard/products',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
        subItems: [
            {
                id: 'all-products',
                label: 'All Products',
                href: '/dashboard/products',
                icon: <span className="w-2 h-2 rounded-full bg-current"></span>
            },
            {
                id: 'categories',
                label: 'Categories',
                href: '/dashboard/products/categories',
                icon: <span className="w-2 h-2 rounded-full bg-current"></span>
            },
            {
                id: 'inventory',
                label: 'Inventory',
                href: '/dashboard/products/inventory',
                icon: <span className="w-2 h-2 rounded-full bg-current"></span>,
                badge: '12'
            }
        ]
    },
    {
        id: 'orders',
        label: 'Orders',
        href: '/dashboard/orders',
        badge: '3',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
    },
    {
        id: 'customers',
        label: 'Customers',
        href: '/dashboard/customers',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
        ),
    },
    {
        id: 'analytics',
        label: 'Analytics',
        href: '/dashboard/analytics',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

export function DashboardSidebar() {
    const { theme } = useTheme();
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>(['products']);

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
                        Dashboard
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => (
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
                                                    ? 'bg-red-900/50 text-red-400'
                                                    : 'bg-red-100 text-red-600'
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
                    href="/settings"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
}
