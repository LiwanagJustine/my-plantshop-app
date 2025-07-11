'use client';

import React, { useState } from 'react';
import { CustomerShopSidebar } from './CustomerShopSidebar';
import { CustomerShopTopbar } from './CustomerShopTopbar';
import { PlantFilters } from '@/types/plant';

interface CustomerShopLayoutProps {
    children: React.ReactNode;
}

export function CustomerShopLayout({ children }: CustomerShopLayoutProps) {
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
