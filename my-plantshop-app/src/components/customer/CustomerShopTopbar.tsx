'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

interface CustomerShopTopbarProps {
    onToggleSidebar: () => void;
}

export function CustomerShopTopbar({ onToggleSidebar }: CustomerShopTopbarProps) {
    const { user, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Left side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                    >
                        <span className="text-lg">☰</span>
                    </button>

                    <div className="flex items-center space-x-2">
                        <a
                            href="/customer/dashboard"
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🌱</span>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                PlantShop
                            </h1>
                        </a>
                    </div>
                </div>

                {/* Center - Search */}
                <div className="flex-1 max-w-xl mx-8">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                        <input
                            type="text"
                            placeholder="Search plants..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative cursor-pointer">
                        <span className="text-lg">🔔</span>
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Cart */}
                    <a
                        href="/customer/cart"
                        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative cursor-pointer"
                    >
                        <span className="text-lg">🛒</span>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </a>

                    {/* User menu */}
                    <div className="relative group">
                        <button className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                            <span className="text-lg">👤</span>
                            <span className="text-sm font-medium">{user?.name}</span>
                        </button>

                        {/* Dropdown menu */}
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="py-2">
                                <a href="/customer/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    My Profile
                                </a>
                                <a href="/customer/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    My Orders
                                </a>
                                <a href="/customer/cart" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    Shopping Cart
                                </a>
                                <a href="/customer/wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    Wishlist
                                </a>
                                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
