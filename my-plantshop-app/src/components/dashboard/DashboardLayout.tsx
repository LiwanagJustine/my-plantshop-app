'use client';

import React, { ReactNode } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopbar } from './DashboardTopbar';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === 'dark'
                ? 'bg-gray-900'
                : 'bg-gray-50'
            }`}>
            {/* Desktop Layout */}
            <div className="flex h-screen">
                {/* Sidebar - Hidden on mobile, visible on desktop */}
                <div className="hidden lg:flex lg:flex-shrink-0">
                    <DashboardSidebar />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Navigation */}
                    <DashboardTopbar />

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>

            {/* Mobile Bottom Navigation - Visible only on mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
                <div className={`border-t ${theme === 'dark'
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}>
                    <div className="grid grid-cols-4 py-2">
                        {/* Mobile navigation items will go here */}
                        <MobileNavItem icon="🏠" label="Dashboard" active />
                        <MobileNavItem icon="📦" label="Products" />
                        <MobileNavItem icon="📊" label="Orders" />
                        <MobileNavItem icon="👤" label="Profile" />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface MobileNavItemProps {
    icon: string;
    label: string;
    active?: boolean;
}

function MobileNavItem({ icon, label, active = false }: MobileNavItemProps) {
    const { theme } = useTheme();

    return (
        <button
            className={`flex flex-col items-center py-2 px-1 text-xs transition-colors ${active
                    ? theme === 'dark'
                        ? 'text-green-400'
                        : 'text-green-600'
                    : theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-800'
                }`}
        >
            <span className="text-lg mb-1">{icon}</span>
            <span>{label}</span>
        </button>
    );
}
