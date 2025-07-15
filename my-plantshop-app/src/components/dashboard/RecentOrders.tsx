'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

interface Order {
    id: string;
    customer: string;
    product: string;
    usdAmount: number; // Changed to store USD amount as number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
}

const mockOrders: Order[] = [
    {
        id: '#1001',
        customer: 'Emily Johnson',
        product: 'Monstera Deliciosa',
        usdAmount: 45.99,
        status: 'processing',
        date: '2 min ago'
    },
    {
        id: '#1002',
        customer: 'Michael Chen',
        product: 'Snake Plant',
        usdAmount: 29.99,
        status: 'shipped',
        date: '1 hour ago'
    },
    {
        id: '#1003',
        customer: 'Sarah Davis',
        product: 'Fiddle Leaf Fig',
        usdAmount: 89.99,
        status: 'delivered',
        date: '3 hours ago'
    },
    {
        id: '#1004',
        customer: 'James Wilson',
        product: 'Peace Lily',
        usdAmount: 34.99,
        status: 'pending',
        date: '5 hours ago'
    },
    {
        id: '#1005',
        customer: 'Lisa Anderson',
        product: 'Rubber Plant',
        usdAmount: 52.99,
        status: 'cancelled',
        date: '1 day ago'
    }
];

function StatusBadge({ status }: { status: Order['status'] }) {
    const { theme } = useTheme();

    const getStatusStyles = () => {
        switch (status) {
            case 'pending':
                return theme === 'dark'
                    ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'processing':
                return theme === 'dark'
                    ? 'bg-blue-900/30 text-blue-400 border-blue-500/30'
                    : 'bg-blue-50 text-blue-700 border-blue-200';
            case 'shipped':
                return theme === 'dark'
                    ? 'bg-purple-900/30 text-purple-400 border-purple-500/30'
                    : 'bg-purple-50 text-purple-700 border-purple-200';
            case 'delivered':
                return theme === 'dark'
                    ? 'bg-green-900/30 text-green-400 border-green-500/30'
                    : 'bg-green-50 text-green-700 border-green-200';
            case 'cancelled':
                return theme === 'dark'
                    ? 'bg-red-900/30 text-red-400 border-red-500/30'
                    : 'bg-red-50 text-red-700 border-red-200';
            default:
                return theme === 'dark'
                    ? 'bg-gray-900/30 text-gray-400 border-gray-500/30'
                    : 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyles()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export function RecentOrders() {
    const { theme } = useTheme();
    const { formatPrice } = useCurrency();

    return (
        <div className={`p-6 rounded-xl border ${theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    Recent Orders
                </h3>
                <button className={`text-sm font-medium transition-colors ${theme === 'dark'
                    ? 'text-green-400 hover:text-green-300'
                    : 'text-green-600 hover:text-green-500'
                    }`}>
                    View all
                </button>
            </div>

            <div className="space-y-4">
                {mockOrders.map((order) => (
                    <div
                        key={order.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-current/5 ${theme === 'dark'
                            ? 'border-gray-700'
                            : 'border-gray-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-sm">
                                {order.customer.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {order.customer}
                                </p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {order.product} • {order.id}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                {formatPrice(order.usdAmount)}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <StatusBadge status={order.status} />
                                <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                                    }`}>
                                    {order.date}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                <button className={`w-full py-2 text-sm font-medium transition-colors rounded-lg ${theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                    View all orders →
                </button>
            </div>
        </div>
    );
}
