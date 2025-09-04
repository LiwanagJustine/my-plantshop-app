'use client';

import React from 'react';
import { CustomerShopLayout } from '@/components/customer/CustomerShopLayout';
import { ProductCard } from '@/components/customer/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';

export default function WishlistPage() {
    const { wishlistItems, loading, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const addToCartFromWishlist = async (item: any) => {
        const success = await addToCart(item.plant_id, 1);
        if (success) {
            // Optionally remove from wishlist after adding to cart
            // await removeFromWishlist(item.plant_id);
        }
    };

    const moveAllToCart = async () => {
        for (const item of wishlistItems) {
            await addToCart(item.plant_id, 1);
        }
    };

    if (loading) {
        return (
            <CustomerShopLayout>
                <div className="text-center py-12">
                    <p>Loading wishlist...</p>
                </div>
            </CustomerShopLayout>
        );
    }

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
                                        onClick={() => {
                                            // Clear all wishlist items
                                            wishlistItems.forEach(item => removeFromWishlist(item.plant_id));
                                        }}
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
                        {wishlistItems.map((item) => (
                            <div key={item.wishlist_id} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                {/* Product Image */}
                                <div className="aspect-square bg-gray-200 dark:bg-gray-700">
                                    <img
                                        src={item.image}
                                        alt={item.plant_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                        {item.plant_name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">
                                        {item.scientific_name}
                                    </p>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            ${item.price}
                                        </span>
                                        {item.original_price && (
                                            <span className="text-sm text-gray-500 line-through">
                                                ${item.original_price}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                        Added {new Date(item.added_at).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Action buttons */}
                                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                                    <button
                                        onClick={() => removeFromWishlist(item.plant_id)}
                                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors cursor-pointer"
                                        title="Remove from wishlist"
                                    >
                                        <span className="text-sm">×</span>
                                    </button>
                                </div>

                                {/* Add to cart button at bottom */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <button
                                        onClick={() => addToCartFromWishlist(item)}
                                        disabled={!item.in_stock}
                                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg ${item.in_stock
                                            ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            }`}
                                    >
                                        {item.in_stock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </CustomerShopLayout>
    );
}
