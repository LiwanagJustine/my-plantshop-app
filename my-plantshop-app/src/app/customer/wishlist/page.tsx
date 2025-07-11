'use client';

import React, { useState } from 'react';
import { CustomerShopLayout } from '@/components/customer/CustomerShopLayout';
import { ProductCard } from '@/components/customer/ProductCard';
import { mockPlants } from '@/data/plants';

export default function WishlistPage() {
    // Mock wishlist - in real app this would come from state/API
    const [wishlistItems, setWishlistItems] = useState([
        mockPlants[0], // Monstera Deliciosa
        mockPlants[2], // Fiddle Leaf Fig
        mockPlants[4], // Peace Lily
    ]);

    const removeFromWishlist = (plantId: string) => {
        setWishlistItems(prev => prev.filter(plant => plant.id !== plantId));
    };

    const addToCart = (plant: any) => {
        // TODO: Implement actual cart functionality
        console.log('Adding to cart:', plant);
        // For now, navigate to cart page
        window.location.href = '/customer/cart';
    };

    const moveAllToCart = () => {
        // TODO: Implement actual cart functionality
        console.log('Moving all items to cart:', wishlistItems);
        // Navigate to cart page
        window.location.href = '/customer/cart';
    };

    return (
        <CustomerShopLayout>
            <div>
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                My Wishlist
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {wishlistItems.length} plant{wishlistItems.length !== 1 ? 's' : ''} saved for later
                            </p>
                        </div>

                        <div className="flex space-x-3">
                            <a
                                href="/customer/dashboard"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                            >
                                ← Back to Dashboard
                            </a>
                            {wishlistItems.length > 0 && (
                                <>
                                    <button
                                        onClick={() => setWishlistItems([])}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={moveAllToCart}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                                    >
                                        Add All to Cart
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-8xl mb-6">💚</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Your wishlist is empty
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Save plants you love to your wishlist so you can easily find them later.
                        </p>
                        <a
                            href="/customer/dashboard"
                            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Browse Plants
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((plant) => (
                            <div key={plant.id} className="relative">
                                <ProductCard plant={plant} />

                                {/* Action buttons overlay */}
                                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                                    {/* Remove from wishlist button */}
                                    <button
                                        onClick={() => removeFromWishlist(plant.id)}
                                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors cursor-pointer"
                                        title="Remove from wishlist"
                                    >
                                        <span className="text-sm">×</span>
                                    </button>
                                </div>

                                {/* Add to cart button at bottom */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <button
                                        onClick={() => addToCart(plant)}
                                        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-lg"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recommendations */}
                {wishlistItems.length > 0 && (
                    <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            You might also like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {mockPlants
                                .filter(plant => !wishlistItems.some(w => w.id === plant.id))
                                .slice(0, 4)
                                .map((plant) => (
                                    <ProductCard key={plant.id} plant={plant} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </CustomerShopLayout>
    );
}
