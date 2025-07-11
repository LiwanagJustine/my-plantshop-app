'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plant } from '@/types/plant';

interface ProductCardProps {
    plant: Plant;
}

export function ProductCard({ plant }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleAddToCart = () => {
        // TODO: Implement actual cart functionality
        console.log('Adding to cart:', plant.name);
        // Navigate to cart page after adding
        window.location.href = '/customer/cart';
    };

    const handleAddToWishlist = () => {
        // TODO: Implement actual wishlist functionality
        console.log('Adding to wishlist:', plant.name);
        // Navigate to wishlist page after adding
        window.location.href = '/customer/wishlist';
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`text-sm ${i <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                        }`}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    const getCareLevel = (level: string) => {
        const colors = {
            Easy: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            Hard: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        };
        return colors[level as keyof typeof colors] || colors.Medium;
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image container */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                {!imageError ? (
                    <Image
                        src={plant.image}
                        alt={plant.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl">🌱</div>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 space-y-1">
                    {plant.isOnSale && (
                        <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                            Sale
                        </span>
                    )}
                    {plant.isPopular && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                            Popular
                        </span>
                    )}
                    {!plant.inStock && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-500 text-white rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* Wishlist button */}
                <button
                    onClick={handleAddToWishlist}
                    className={`absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}
                >
                    <span className="text-red-500 text-lg">♡</span>
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title and scientific name */}
                <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                        {plant.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        {plant.scientificName}
                    </p>
                </div>

                {/* Rating and reviews */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex">{renderStars(plant.rating)}</div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({plant.reviewCount})
                    </span>
                </div>

                {/* Care level and size */}
                <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCareLevel(plant.careLevel)}`}>
                        {plant.careLevel}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {plant.size}
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${plant.price}
                        </span>
                        {plant.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ${plant.originalPrice}
                            </span>
                        )}
                    </div>
                    {plant.stockQuantity <= 5 && plant.inStock && (
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                            Only {plant.stockQuantity} left
                        </span>
                    )}
                </div>

                {/* Features */}
                <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                        {plant.features.slice(0, 2).map((feature, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                            >
                                {feature}
                            </span>
                        ))}
                        {plant.features.length > 2 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                +{plant.features.length - 2}
                            </span>
                        )}
                    </div>
                </div>

                {/* Add to cart button */}
                <button
                    onClick={handleAddToCart}
                    disabled={!plant.inStock}
                    className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${plant.inStock
                        ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {plant.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
}
