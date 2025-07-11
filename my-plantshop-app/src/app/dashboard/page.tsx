'use client';

import React from 'react';
import {
    DashboardLayout,
    DashboardHeader,
    StatsGrid,
    RecentOrders,
    PopularProducts
} from '@/components/dashboard';

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <DashboardHeader
                    title="Dashboard"
                    subtitle="Welcome back! Here's what's happening with your PlantShop."
                />

                <StatsGrid />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RecentOrders />
                    <PopularProducts />
                </div>
            </div>
        </DashboardLayout>
    );
}
