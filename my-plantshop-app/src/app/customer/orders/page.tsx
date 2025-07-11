'use client';

import React from 'react';
import { CustomerShopLayout } from '@/components/customer/CustomerShopLayout';

export default function OrdersPage() {
    const mockOrders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 89.97,
            items: [
                { name: 'Monstera Deliciosa', quantity: 1, price: 45.99 },
                { name: 'Snake Plant', quantity: 1, price: 28.99 },
                { name: 'Golden Pothos', quantity: 1, price: 18.99 },
            ],
            trackingNumber: 'TK123456789',
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            status: 'Shipped',
            total: 52.99,
            items: [
                { name: 'Rubber Plant', quantity: 1, price: 52.99 },
            ],
            trackingNumber: 'TK987654321',
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            status: 'Processing',
            total: 124.97,
            items: [
                { name: 'Fiddle Leaf Fig', quantity: 1, price: 89.99 },
                { name: 'Peace Lily', quantity: 1, price: 34.99 },
            ],
        },
    ];

    const getStatusColor = (status: string) => {
        const colors = {
            'Delivered': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            'Shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
            'Processing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            'Pending': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
            'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        };
        return colors[status as keyof typeof colors] || colors.Pending;
    };

    return (
        <CustomerShopLayout>
            <div>
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                My Orders
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Track and manage your plant orders
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <a
                                href="/customer/dashboard"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                            >
                                ← Back to Dashboard
                            </a>
                            <a
                                href="/customer/cart"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                                View Cart
                            </a>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {mockOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                        >
                            {/* Order header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        Order {order.id}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Placed on {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                                        ${order.total.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Order items */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                                    Items ({order.items.length})
                                </h4>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                    <span className="text-2xl">🌱</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tracking info */}
                            {order.trackingNumber && (
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                Tracking Number
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                                                {order.trackingNumber}
                                            </p>
                                        </div>
                                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
                                            Track Package
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <div className="flex space-x-3">
                                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                        View Details
                                    </button>
                                    {order.status === 'Delivered' && (
                                        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                            Buy Again
                                        </button>
                                    )}
                                    {order.status === 'Processing' && (
                                        <button className="px-4 py-2 border border-red-300 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CustomerShopLayout>
    );
}
