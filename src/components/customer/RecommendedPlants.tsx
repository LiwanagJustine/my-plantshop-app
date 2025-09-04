'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface RecommendedPlant {
    id: string;
    name: string;
    price: string;
    image: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    reason: string;
    inStock: boolean;
}

const mockRecommendedPlants: RecommendedPlant[] = [
    {
        id: '1',
        name: 'Pothos Golden',
        price: '$24.99',
        image: '🌿',
        difficulty: 'Beginner',
        reason: 'Perfect for beginners like you!',
        inStock: true
    },
    {
        id: '2',
        name: 'ZZ Plant',
        price: '$32.99',
        image: '🌱',
        difficulty: 'Beginner',
        reason: 'Low maintenance, great for offices',
        inStock: true
    },
    {
        id: '3',
        name: 'Fiddle Leaf Fig',
        price: '$89.99',
        image: '🍃',
        difficulty: 'Intermediate',
        reason: 'Based on your Monstera success',
        inStock: false
    },
    {
        id: '4',
        name: 'Spider Plant',
        price: '$19.99',
        image: '🕷️',
        difficulty: 'Beginner',
        reason: 'Great for air purification',
        inStock: true
    }
];

function DifficultyBadge({ difficulty }: { difficulty: RecommendedPlant['difficulty'] }) {
    const { theme } = useTheme();

    const getDifficultyStyles = () => {
        switch (difficulty) {
            case 'Beginner':
                return theme === 'dark'
                    ? 'bg-green-900/30 text-green-400 border-green-500/30'
                    : 'bg-green-50 text-green-700 border-green-200';
            case 'Intermediate':
                return theme === 'dark'
                    ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'Advanced':
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
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyStyles()}`}>
            {difficulty}
        </span>
    );
}

export function RecommendedPlants() {
    const { theme } = useTheme();

    return (
        <div className={`p-6 rounded-xl border ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Recommended for You
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Based on your plant preferences
                    </p>
                </div>
                <button className={`text-sm font-medium transition-colors ${theme === 'dark'
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-green-600 hover:text-green-500'
                    }`}>
                    View all
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockRecommendedPlants.map((plant) => (
                    <div
                        key={plant.id}
                        className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer group ${theme === 'dark'
                                ? 'border-gray-700 hover:border-gray-600'
                                : 'border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl">
                                {plant.image}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {plant.name}
                                    </h4>
                                    <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                        }`}>
                                        {plant.price}
                                    </span>
                                </div>

                                <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {plant.reason}
                                </p>

                                <div className="flex items-center justify-between">
                                    <DifficultyBadge difficulty={plant.difficulty} />

                                    {plant.inStock ? (
                                        <button className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${theme === 'dark'
                                                ? 'bg-green-600 hover:bg-green-500 text-white'
                                                : 'bg-green-600 hover:bg-green-500 text-white'
                                            }`}>
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <span className={`text-xs px-3 py-1 rounded-full ${theme === 'dark'
                                                ? 'bg-gray-700 text-gray-400'
                                                : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
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
                    Explore more plants →
                </button>
            </div>
        </div>
    );
}
