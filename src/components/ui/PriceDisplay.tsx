'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';

interface PriceDisplayProps {
    usdPrice: number;
    className?: string;
}

export function PriceDisplay({ usdPrice, className = '' }: PriceDisplayProps) {
    const { formatPrice } = useCurrency();
    const { theme } = useTheme();

    return (
        <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} ${className}`}>
            {formatPrice(usdPrice)}
        </span>
    );
}

// Example usage component showing how to use currency context
export function CurrencyExample() {
    const { currency, formatPrice, convertPrice } = useCurrency();
    const { theme } = useTheme();

    const sampleProducts = [
        { name: 'Monstera Deliciosa', usdPrice: 45.99 },
        { name: 'Snake Plant', usdPrice: 29.99 },
        { name: 'Fiddle Leaf Fig', usdPrice: 79.99 },
    ];

    return (
        <div className={`p-6 rounded-lg border ${theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
            }`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Product Prices ({currency})
            </h3>

            <div className="space-y-3">
                {sampleProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {product.name}
                        </span>
                        <PriceDisplay usdPrice={product.usdPrice} />
                    </div>
                ))}
            </div>

            <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Exchange Rate: 1 USD = {(56.5).toFixed(2)} PHP
                </p>
            </div>
        </div>
    );
}
