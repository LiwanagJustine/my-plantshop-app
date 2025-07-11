'use client';

import React, { useState, useMemo } from 'react';
import { Plant, PlantFilters } from '@/types/plant';
import { mockPlants } from '@/data/plants';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
    filters?: PlantFilters;
}

export function ProductGrid({ filters }: ProductGridProps) {
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'popularity'>('popularity');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Filter plants based on the current filters
    const filteredPlants = useMemo(() => {
        if (!filters) return mockPlants;

        return mockPlants.filter((plant) => {
            // Category filter
            if (filters.category.length > 0 && !filters.category.includes(plant.category)) {
                return false;
            }

            // Care level filter
            if (filters.careLevel.length > 0 && !filters.careLevel.includes(plant.careLevel)) {
                return false;
            }

            // Light requirement filter
            if (filters.lightRequirement.length > 0 && !filters.lightRequirement.includes(plant.lightRequirement)) {
                return false;
            }

            // Size filter
            if (filters.size.length > 0 && !filters.size.includes(plant.size)) {
                return false;
            }

            // Price range filter
            if (plant.price < filters.priceRange[0] || plant.price > filters.priceRange[1]) {
                return false;
            }

            // In stock filter
            if (filters.inStock && !plant.inStock) {
                return false;
            }

            // On sale filter
            if (filters.onSale && !plant.isOnSale) {
                return false;
            }

            return true;
        });
    }, [filters]);

    // Sort plants
    const sortedPlants = useMemo(() => {
        const sorted = [...filteredPlants].sort((a, b) => {
            let aValue: any, bValue: any;

            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'price':
                    aValue = a.price;
                    bValue = b.price;
                    break;
                case 'rating':
                    aValue = a.rating;
                    bValue = b.rating;
                    break;
                case 'popularity':
                    aValue = a.isPopular ? 1 : 0;
                    bValue = b.isPopular ? 1 : 0;
                    break;
                default:
                    return 0;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return sorted;
    }, [filteredPlants, sortBy, sortOrder]);

    return (
        <div>
            {/* Header with sort options */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Browse Plants
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {sortedPlants.length} plant{sortedPlants.length !== 1 ? 's' : ''} found
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
                    >
                        <option value="popularity">Popularity</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            {/* Product grid */}
            {sortedPlants.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🌱</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No plants found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your filters to see more results.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sortedPlants.map((plant) => (
                        <ProductCard key={plant.id} plant={plant} />
                    ))}
                </div>
            )}
        </div>
    );
}
