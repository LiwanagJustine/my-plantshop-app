'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ReactNode;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
    const { theme } = useTheme();

    const getChangeColor = () => {
        switch (changeType) {
            case 'positive':
                return theme === 'dark' ? 'text-green-400' : 'text-green-600';
            case 'negative':
                return theme === 'dark' ? 'text-red-400' : 'text-red-600';
            default:
                return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
        }
    };

    const getChangeIcon = () => {
        if (changeType === 'positive') {
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
            );
        } else if (changeType === 'negative') {
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
            );
        }
        return null;
    };

    return (
        <div className={`p-6 rounded-xl border transition-all hover:shadow-lg ${theme === 'dark'
            ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/20'
            : 'bg-white border-gray-200 hover:shadow-gray-200/50'
            }`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {title}
                    </p>
                    <p className={`text-2xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {value}
                    </p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${getChangeColor()}`}>
                        {getChangeIcon()}
                        <span>{change}</span>
                    </div>
                </div>
                <div className={`p-3 rounded-xl ${theme === 'dark'
                    ? 'bg-green-900/20 text-green-400'
                    : 'bg-green-50 text-green-600'
                    }`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export function StatsGrid() {
    const { formatPrice } = useCurrency();

    const stats = [
        {
            title: 'Total Revenue',
            value: formatPrice(12426), // Converting $12,426 to current currency
            change: '+20.1% from last month',
            changeType: 'positive' as const,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: 'Orders',
            value: '1,259',
            change: '+180.1% from last month',
            changeType: 'positive' as const,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            title: 'Products',
            value: '573',
            change: '+19% from last month',
            changeType: 'positive' as const,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            title: 'Active Customers',
            value: '2,356',
            change: '+201 since last hour',
            changeType: 'positive' as const,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}
