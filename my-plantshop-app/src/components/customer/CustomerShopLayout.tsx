'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CustomerShopSidebar } from './CustomerShopSidebar';
import { CustomerShopTopbar } from './CustomerShopTopbar';
import { PlantFilters } from '@/types/plant';

interface CustomerShopLayoutProps {
    children: React.ReactNode;
}

export function CustomerShopLayout({ children }: CustomerShopLayoutProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [filters, setFilters] = useState<PlantFilters>({
        category: [],
        careLevel: [],
        priceRange: [0, 200],
        lightRequirement: [],
        size: [],
        inStock: false,
        onSale: false,
    });

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login?redirect=/customer/dashboard');
        }
    }, [user, loading, router]);

    // Show loading while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Show nothing while redirecting (user is not authenticated)
    if (!user) {
        return null;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top bar */}
            <CustomerShopTopbar onToggleSidebar={toggleSidebar} />

            <div className="flex">
                {/* Sidebar */}
                <CustomerShopSidebar
                    isOpen={isSidebarOpen}
                    filters={filters}
                    onFiltersChange={setFilters}
                />

                {/* Main content */}
                <main className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'ml-80' : 'ml-0'}
          pt-16
        `}>
                    <div className="p-6">
                        {React.isValidElement(children)
                            ? React.cloneElement(children, { filters } as any)
                            : children
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}
