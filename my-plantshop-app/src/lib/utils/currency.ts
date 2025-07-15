// Currency conversion utilities

export interface ExchangeRates {
    USD: number;
    PHP: number;
}

export interface CurrencyApiResponse {
    success: boolean;
    rates: ExchangeRates;
    base: string;
    date: string;
}

// Fallback exchange rate (updated manually)
export const FALLBACK_USD_TO_PHP = 56.5;

/**
 * Fetch current USD to PHP exchange rate
 * Falls back to predefined rate if API fails
 */
export async function fetchExchangeRate(): Promise<number> {
    try {
        // Using a free exchange rate API (you can replace with your preferred provider)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

        if (!response.ok) {
            throw new Error('Failed to fetch exchange rate');
        }

        const data: CurrencyApiResponse = await response.json();

        if (data.success && data.rates.PHP) {
            return data.rates.PHP;
        }

        throw new Error('Invalid exchange rate data');
    } catch (error) {
        console.warn('Failed to fetch live exchange rate, using fallback:', error);
        return FALLBACK_USD_TO_PHP;
    }
}

/**
 * Convert amount between USD and PHP
 */
export function convertCurrency(
    amount: number,
    fromCurrency: 'USD' | 'PHP',
    toCurrency: 'USD' | 'PHP',
    exchangeRate: number
): number {
    if (fromCurrency === toCurrency) return amount;

    if (fromCurrency === 'USD' && toCurrency === 'PHP') {
        return amount * exchangeRate;
    } else if (fromCurrency === 'PHP' && toCurrency === 'USD') {
        return amount / exchangeRate;
    }

    return amount;
}

/**
 * Format currency with appropriate symbol
 */
export function formatCurrency(amount: number, currency: 'USD' | 'PHP'): string {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatter.format(amount);
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: 'USD' | 'PHP'): string {
    return currency === 'USD' ? '$' : '₱';
}

/**
 * Parse currency string to number
 */
export function parseCurrencyString(value: string): number {
    return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
}
