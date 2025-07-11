'use client';

import React, { useState } from 'react';
import { CustomerShopLayout } from '@/components/customer/CustomerShopLayout';

export default function PlantCarePage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const careGuides = [
        {
            id: 1,
            title: 'Watering Your Plants',
            category: 'watering',
            description: 'Learn the proper watering techniques for different plant types.',
            readTime: '5 min read',
            content: 'Most houseplants prefer to dry out slightly between waterings. Check the soil moisture by inserting your finger about 1-2 inches into the soil...',
            image: '💧',
        },
        {
            id: 2,
            title: 'Light Requirements Guide',
            category: 'lighting',
            description: 'Understanding different light conditions and plant placement.',
            readTime: '7 min read',
            content: 'Light is crucial for plant photosynthesis. Here\'s how to identify and provide the right lighting conditions...',
            image: '☀️',
        },
        {
            id: 3,
            title: 'Fertilizing Indoor Plants',
            category: 'fertilizing',
            description: 'When and how to feed your plants for optimal growth.',
            readTime: '6 min read',
            content: 'During growing season (spring and summer), most houseplants benefit from regular fertilizing...',
            image: '🌱',
        },
        {
            id: 4,
            title: 'Repotting Your Plants',
            category: 'repotting',
            description: 'Know when and how to repot your plants for healthy growth.',
            readTime: '8 min read',
            content: 'Signs your plant needs repotting include roots growing out of drainage holes, water running straight through...',
            image: '🪴',
        },
        {
            id: 5,
            title: 'Common Plant Problems',
            category: 'troubleshooting',
            description: 'Identify and solve common plant care issues.',
            readTime: '10 min read',
            content: 'Yellow leaves, brown tips, wilting - learn what these signs mean and how to fix them...',
            image: '🩺',
        },
        {
            id: 6,
            title: 'Seasonal Plant Care',
            category: 'seasonal',
            description: 'Adjust your plant care routine throughout the year.',
            readTime: '6 min read',
            content: 'Plants have different needs in different seasons. Here\'s how to adapt your care routine...',
            image: '🗓️',
        },
    ];

    const categories = [
        { id: 'all', name: 'All Guides', icon: '📚' },
        { id: 'watering', name: 'Watering', icon: '💧' },
        { id: 'lighting', name: 'Lighting', icon: '☀️' },
        { id: 'fertilizing', name: 'Fertilizing', icon: '🌱' },
        { id: 'repotting', name: 'Repotting', icon: '🪴' },
        { id: 'troubleshooting', name: 'Troubleshooting', icon: '🩺' },
        { id: 'seasonal', name: 'Seasonal Care', icon: '🗓️' },
    ];

    const filteredGuides = selectedCategory === 'all'
        ? careGuides
        : careGuides.filter(guide => guide.category === selectedCategory);

    return (
        <CustomerShopLayout>
            <div>
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Plant Care Guide
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Everything you need to know to keep your plants healthy and thriving
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <a
                                href="/customer/dashboard"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                            >
                                🛒 Shop Plants
                            </a>
                            <a
                                href="/customer/cart"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                                View Cart
                            </a>
                        </div>
                    </div>
                </div>

                {/* Category filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${selectedCategory === category.id
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Care guides grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGuides.map((guide) => (
                        <div
                            key={guide.id}
                            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <div className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="text-3xl">{guide.image}</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {guide.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {guide.readTime}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    {guide.description}
                                </p>

                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                    {guide.content}
                                </p>

                                <button className="text-green-600 dark:text-green-400 text-sm font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors cursor-pointer">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick tips section */}
                <div className="mt-12 bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Quick Plant Care Tips
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-start space-x-3">
                            <span className="text-2xl">💡</span>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Check Soil Moisture</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Stick your finger 1-2 inches into the soil before watering.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <span className="text-2xl">🌿</span>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Rotate Weekly</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Turn your plants weekly for even growth and light exposure.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <span className="text-2xl">🧹</span>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Clean Leaves</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Wipe leaves with a damp cloth to remove dust and improve photosynthesis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shop plants section */}
                <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Ready to Start Your Plant Journey?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                            Now that you know how to care for plants, browse our collection to find the perfect plants for your home and skill level.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a
                                href="/customer/dashboard"
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                🌱 Browse All Plants
                            </a>
                            <a
                                href="/customer/dashboard?filter=easy"
                                className="px-6 py-3 border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                Start with Easy Plants
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerShopLayout>
    );
}
