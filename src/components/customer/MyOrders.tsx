'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CustomerOrder {
    id: string;
    items: string[];
    total: string;
    status: 'processing' | 'shipped' | 'delivered' | 'pending';
    date: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
}

const mockCustomerOrders: CustomerOrder[] = [
    {
        id: '#2001',
        items: ['Monstera Deliciosa', 'Ceramic Pot'],
        total: '$65.98',
        status: 'shipped',
        date: '2 days ago',
        trackingNumber: 'TRK123456789',
        estimatedDelivery: 'Tomorrow'
    },
    {
        id: '#2002',
        items: ['Snake Plant', 'Plant Food'],
        total: '$39.98',
        status: 'processing',
        date: '5 days ago',
        estimatedDelivery: 'In 2-3 days'
    },
    {
        id: '#2003',
        items: ['Peace Lily'],
        total: '$34.99',
        status: 'delivered',
        date: '1 week ago'
    }
];

function CustomerOrderStatusBadge({ status }: { status: CustomerOrder['status'] }) {
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

export function MyOrders() {
    const { theme } = useTheme();

    return (
        <div className={`p-6 rounded-xl border ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    My Recent Orders
                </h3>
                <button className={`text-sm font-medium transition-colors ${theme === 'dark'
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-green-600 hover:text-green-500'
                    }`}>
                    View all orders
                </button>
            </div>

            <div className="space-y-4">
                {mockCustomerOrders.map((order) => (
                    <div
                        key={order.id}
                        className={`p-4 rounded-lg border transition-colors hover:bg-current/5 ${theme === 'dark'
                                ? 'border-gray-700'
                                : 'border-gray-100'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    Order {order.id}
                                </p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {order.items.join(', ')}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {order.total}
                                </p>
                                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                                    }`}>
                                    {order.date}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <CustomerOrderStatusBadge status={order.status} />

                            {order.status === 'shipped' && (
                                <div className="text-right">
                                    <p className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                        }`}>
                                        Arriving {order.estimatedDelivery}
                                    </p>
                                    {order.trackingNumber && (
                                        <button className={`text-xs underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                            }`}>
                                            Track: {order.trackingNumber}
                                        </button>
                                    )}
                                </div>
                            )}

                            {order.status === 'processing' && order.estimatedDelivery && (
                                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Ships {order.estimatedDelivery}
                                </p>
                            )}

                            {order.status === 'delivered' && (
                                <button className={`text-xs font-medium ${theme === 'dark'
                                        ? 'text-green-400 hover:text-green-300'
                                        : 'text-green-600 hover:text-green-500'
                                    }`}>
                                    Leave Review
                                </button>
                            )}
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
                    View order history →
                </button>
            </div>
        </div>
    );
}
