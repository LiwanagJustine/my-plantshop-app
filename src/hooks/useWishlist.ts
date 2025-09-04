'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

interface WishlistItem {
    wishlist_id: number;
    plant_id: number;
    plant_name: string;
    name: string;
    scientific_name: string;
    price: number;
    original_price?: number;
    image: string;
    in_stock: boolean;
    stock_quantity: number;
    rating: number;
    review_count: number;
    is_on_sale: boolean;
    added_at: string;
}

export function useWishlist() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { addToast } = useToast();

    // Fetch wishlist items
    const fetchWishlist = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const response = await fetch('/api/wishlist', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
            }

            const result = await response.json();
            if (result.success) {
                setWishlistItems(result.data);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            addToast({
                type: 'error',
                title: 'Failed to load wishlist'
            });
        } finally {
            setLoading(false);
        }
    };

    // Add item to wishlist
    const addToWishlist = async (plantId: string | number) => {
        if (!user) {
            addToast({
                type: 'error',
                title: 'Please login to add items to wishlist'
            });
            return false;
        }

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ plantId: Number(plantId) })
            });

            const result = await response.json();

            if (result.success) {
                addToast({
                    type: 'success',
                    title: result.message
                });
                await fetchWishlist(); // Refresh wishlist
                return true;
            } else {
                addToast({
                    type: 'error',
                    title: result.error || 'Failed to add to wishlist'
                });
                return false;
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            addToast({
                type: 'error',
                title: 'Failed to add to wishlist'
            });
            return false;
        }
    };

    // Remove item from wishlist
    const removeFromWishlist = async (plantId: string | number) => {
        try {
            const response = await fetch(`/api/wishlist?plantId=${Number(plantId)}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            const result = await response.json();

            if (result.success) {
                addToast({
                    type: 'success',
                    title: result.message
                });
                await fetchWishlist(); // Refresh wishlist
                return true;
            } else {
                addToast({
                    type: 'error',
                    title: result.error || 'Failed to remove from wishlist'
                });
                return false;
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            addToast({
                type: 'error',
                title: 'Failed to remove from wishlist'
            });
            return false;
        }
    };

    // Check if item is in wishlist
    const isInWishlist = (plantId: string | number) => {
        return wishlistItems.some(item => item.plant_id === Number(plantId));
    };

    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
        }
    }, [user]);

    return {
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
        isInWishlist
    };
}
