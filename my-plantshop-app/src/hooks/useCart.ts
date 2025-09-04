'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

interface CartItem {
    cart_id: number;
    plant_id: number;
    plant_name: string;
    name: string;
    scientific_name: string;
    price: number;
    image: string;
    quantity: number;
    in_stock: boolean;
    stock_quantity: number;
    added_at: string;
}

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { addToast } = useToast();

    // Fetch cart items
    const fetchCart = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const response = await fetch('/api/cart', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }

            const result = await response.json();
            if (result.success) {
                setCartItems(result.data);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            addToast({
                type: 'error',
                title: 'Failed to load cart'
            });
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart
    const addToCart = async (plantId: string | number, quantity: number = 1) => {
        if (!user) {
            addToast({
                type: 'error',
                title: 'Please login to add items to cart'
            });
            return false;
        }

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ plantId: Number(plantId), quantity })
            });

            const result = await response.json();

            if (result.success) {
                addToast({
                    type: 'success',
                    title: result.message
                });
                await fetchCart(); // Refresh cart
                return true;
            } else {
                addToast({
                    type: 'error',
                    title: result.error || 'Failed to add to cart'
                });
                return false;
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            addToast({
                type: 'error',
                title: 'Failed to add to cart'
            });
            return false;
        }
    };

    // Remove item from cart
    const removeFromCart = async (cartId: number) => {
        try {
            const response = await fetch(`/api/cart?cartId=${cartId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            const result = await response.json();

            if (result.success) {
                addToast({
                    type: 'success',
                    title: result.message
                });
                await fetchCart(); // Refresh cart
                return true;
            } else {
                addToast({
                    type: 'error',
                    title: result.error || 'Failed to remove from cart'
                });
                return false;
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            addToast({
                type: 'error',
                title: 'Failed to remove from cart'
            });
            return false;
        }
    };

    // Update cart item quantity
    const updateCartQuantity = async (cart_id: number, quantity: number) => {
        try {
            const res = await fetch('/api/cart/update-quantity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart_id, quantity })
            });
            if (res.ok) {
                await fetchCart();
                addToast({
                    type: 'success',
                    title: 'Cart updated!'
                });
                return true;
            } else {
                addToast({
                    type: 'error',
                    title: 'Failed to update cart'
                });
                addToast({
                    type: 'error',
                    title: 'Error updating cart'
                });
            }
        } catch (err) {
            addToast({
                type: 'error',
                title: 'Error updating cart'
            });
            return false;
        }
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    // Calculate total items
    const totalItems = cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [user]);

    return {
        cartItems,
        loading,
        removeFromCart,
        totalPrice,
        updateCartQuantity,
        addToCart,
        fetchCart,
        totalItems
    };
}
