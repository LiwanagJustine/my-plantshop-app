'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Product {
    id: string;
    name: string;
    price: string;
    sales: number;
    stock: number;
    image: string;
    trend: 'up' | 'down' | 'stable';
}

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Monstera Deliciosa',
        price: '$45.99',
        sales: 142,
        stock: 23,
        image: '🌿',
        trend: 'up'
    },
    {
        id: '2',
        name: 'Snake Plant',
        price: '$29.99',
        sales: 89,
        stock: 45,
        image: '🐍',
        trend: 'up'
    },
    {
        id: '3',
        name: 'Fiddle Leaf Fig',
        price: '$89.99',
        sales: 67,
        stock: 12,
        image: '🍃',
        trend: 'stable'
    },
    {
        id: '4',
        name: 'Peace Lily',
        price: '$34.99',
        sales: 54,
        stock: 31,
        image: '☮️',
        trend: 'down'
    },
    {
        id: '5',
        name: 'Rubber Plant',
        price: '$52.99',
        sales: 43,
        stock: 8,
        image: '🌱',
        trend: 'up'
    }
];

function TrendIcon({ trend }: { trend: Product['trend'] }) {
    const { theme } = useTheme();

    const getColor = () => {
        switch (trend) {
            case 'up':
                return theme === 'dark' ? 'text-green-400' : 'text-green-600';
            case 'down':
                return theme === 'dark' ? 'text-red-400' : 'text-red-600';
            default:
                return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
        }
    };

    if (trend === 'up') {
        return (
            <svg className={`w-4 h-4 ${getColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
        );
    }

    if (trend === 'down') {
        return (
            <svg className={`w-4 h-4 ${getColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
        );
    }

    return (
        <svg className={`w-4 h-4 ${getColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
    );
}

export function PopularProducts() {
    const { theme } = useTheme();

    return (
        <div className={`p-6 rounded-xl border ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    Popular Products
                </h3>
                <button className={`text-sm font-medium transition-colors ${theme === 'dark'
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-green-600 hover:text-green-500'
                    }`}>
                    View all
                </button>
            </div>

            <div className="space-y-4">
                {mockProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-current/5 ${theme === 'dark'
                                ? 'border-gray-700'
                                : 'border-gray-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xl">
                                    {product.image}
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                                    {index + 1}
                                </div>
                            </div>
                            <div>
                                <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {product.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                        }`}>
                                        {product.price}
                                    </span>
                                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                                        }`}>
                                        •
                                    </span>
                                    <span className={`text-xs ${product.stock < 15
                                            ? theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                            : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        {product.stock} in stock
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="flex items-center gap-1">
                                <TrendIcon trend={product.trend} />
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {product.sales}
                                </span>
                            </div>
                            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                                }`}>
                                sales this month
                            </p>
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
                    View all products →
                </button>
            </div>
        </div>
    );
}
