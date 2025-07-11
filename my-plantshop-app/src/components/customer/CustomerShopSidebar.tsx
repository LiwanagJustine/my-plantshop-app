'use client';

import React from 'react';
import { PlantFilters } from '@/types/plant';
import { categories, careLevels, lightRequirements, sizes } from '@/data/plants';

interface CustomerShopSidebarProps {
    isOpen: boolean;
    filters: PlantFilters;
    onFiltersChange: (filters: PlantFilters) => void;
}

export function CustomerShopSidebar({ isOpen, filters, onFiltersChange }: CustomerShopSidebarProps) {
    const updateFilters = (key: keyof PlantFilters, value: any) => {
        onFiltersChange({
            ...filters,
            [key]: value,
        });
    };

    const toggleArrayFilter = (key: 'category' | 'careLevel' | 'lightRequirement' | 'size', value: string) => {
        const currentValues = filters[key] as string[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        updateFilters(key, newValues);
    };

    const clearAllFilters = () => {
        onFiltersChange({
            category: [],
            careLevel: [],
            priceRange: [0, 200],
            lightRequirement: [],
            size: [],
            inStock: false,
            onSale: false,
        });
    };

    if (!isOpen) return null;

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-40">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Filters
                    </h2>
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium cursor-pointer"
                    >
                        Clear All
                    </button>
                </div>

                {/* Quick Filters */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Quick Filters
                    </h3>
                    <div className="space-y-2">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.inStock}
                                onChange={(e) => updateFilters('inStock', e.target.checked)}
                                className="rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                In Stock Only
                            </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.onSale}
                                onChange={(e) => updateFilters('onSale', e.target.checked)}
                                className="rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                On Sale
                            </span>
                        </label>
                    </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Price Range
                    </h3>
                    <div className="space-y-2">
                        <input
                            type="range"
                            min="0"
                            max="200"
                            value={filters.priceRange[1]}
                            onChange={(e) => updateFilters('priceRange', [0, parseInt(e.target.value)])}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>$0</span>
                            <span>${filters.priceRange[1]}</span>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Categories
                    </h3>
                    <div className="space-y-2">
                        {categories.filter(cat => cat !== 'All').map((category) => (
                            <label key={category} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.category.includes(category)}
                                    onChange={() => toggleArrayFilter('category', category)}
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    {category}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Care Level */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Care Level
                    </h3>
                    <div className="space-y-2">
                        {careLevels.map((level) => (
                            <label key={level} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.careLevel.includes(level)}
                                    onChange={() => toggleArrayFilter('careLevel', level)}
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Light Requirements */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Light Requirements
                    </h3>
                    <div className="space-y-2">
                        {lightRequirements.map((light) => (
                            <label key={light} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.lightRequirement.includes(light)}
                                    onChange={() => toggleArrayFilter('lightRequirement', light)}
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    {light} Light
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Size */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Size
                    </h3>
                    <div className="space-y-2">
                        {sizes.map((size) => (
                            <label key={size} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.size.includes(size)}
                                    onChange={() => toggleArrayFilter('size', size)}
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    {size}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
