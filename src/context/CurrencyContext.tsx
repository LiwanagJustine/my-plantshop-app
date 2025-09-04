'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'USD' | 'PHP';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    toggleCurrency: () => void;
    formatPrice: (amount: number) => string;
    convertPrice: (usdAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rate - you can make this dynamic by fetching from an API
const USD_TO_PHP_RATE = 56.5; // Approximate exchange rate

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<Currency>('USD');

    const toggleCurrency = () => {
        setCurrency(prev => prev === 'USD' ? 'PHP' : 'USD');
    };

    const convertPrice = (usdAmount: number): number => {
        if (currency === 'USD') {
            return usdAmount;
        }
        return usdAmount * USD_TO_PHP_RATE;
    };

    const formatPrice = (amount: number): string => {
        const convertedAmount = convertPrice(amount);

        if (currency === 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(convertedAmount);
        } else {
            return new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
            }).format(convertedAmount);
        }
    };

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency,
            toggleCurrency,
            formatPrice,
            convertPrice
        }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
