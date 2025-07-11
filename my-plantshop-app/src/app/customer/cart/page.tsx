'use client';

import React, { useState } from 'react';
import { CustomerShopLayout } from '@/components/customer/CustomerShopLayout';
import { mockPlants } from '@/data/plants';
import { Plant } from '@/types/plant';

interface CartItem {
    plant: Plant;
    quantity: number;
}

export default function CartPage() {
    // Mock cart items - in real app this would come from context/state
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { plant: mockPlants[0], quantity: 1 }, // Monstera Deliciosa
        { plant: mockPlants[1], quantity: 2 }, // Snake Plant
        { plant: mockPlants[4], quantity: 1 }, // Peace Lily
    ]);

    const updateQuantity = (plantId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(plantId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.plant.id === plantId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const removeFromCart = (plantId: string) => {
        setCartItems(prev => prev.filter(item => item.plant.id !== plantId));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.plant.price * item.quantity), 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const proceedToCheckout = () => {
        // Navigate to checkout page
        window.location.href = '/customer/checkout';
    };

    return (
        <CustomerShopLayout>
            <div>
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Shopping Cart
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <a
                                href="/customer/dashboard"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                            >
                                ← Back to Dashboard
                            </a>
                            <a
                                href="/customer/wishlist"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                                View Wishlist
                            </a>
                        </div>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-8xl mb-6">🛒</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Your cart is empty
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Add some beautiful plants to your cart to get started.
                        </p>
                        <a
                            href="/customer/dashboard"
                            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
                        >
                            Browse Plants
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Cart Items
                                    </h2>
                                </div>

                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {cartItems.map((item) => (
                                        <div key={item.plant.id} className="p-6">
                                            <div className="flex items-center space-x-4">
                                                {/* Plant Image */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.plant.image}
                                                        alt={item.plant.name}
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                    />
                                                </div>

                                                {/* Plant Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                        {item.plant.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {item.plant.scientificName}
                                                    </p>
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            Care Level: {item.plant.careLevel}
                                                        </span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            Light: {item.plant.lightRequirement}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-medium text-gray-900 dark:text-white w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        ${(item.plant.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        ${item.plant.price.toFixed(2)} each
                                                    </p>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeFromCart(item.plant.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                                    title="Remove from cart"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Order Summary
                                </h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    {shipping > 0 && (
                                        <div className="text-sm text-green-600 dark:text-green-400">
                                            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={proceedToCheckout}
                                    className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
                                >
                                    Proceed to Checkout
                                </button>

                                <div className="mt-4 space-y-2">
                                    <a
                                        href="/customer/dashboard"
                                        className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                    >
                                        Continue Shopping
                                    </a>
                                    <a
                                        href="/customer/wishlist"
                                        className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                    >
                                        View Wishlist
                                    </a>
                                </div>

                                {/* Security badges */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Secure</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <span>Fast shipping</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CustomerShopLayout>
    );
}
