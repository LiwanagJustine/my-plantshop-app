'use client';

import React from 'react';
import {
    DashboardLayout,
    DashboardHeader,
    StatsGrid,
    RecentOrders,
    PopularProducts
} from '@/components/dashboard';
import { AdminRouteGuard } from '@/components/auth';

export default function AdminDashboardPage() {
    return (
        <AdminRouteGuard>
            <DashboardLayout>
                <div className="space-y-6">
                    <DashboardHeader
                        title="Admin Dashboard"
                        subtitle="Welcome back! Here's what's happening with your PlantShop."
                    />

                    <StatsGrid />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RecentOrders />
                        <PopularProducts />
                    </div>
                </div>
            </DashboardLayout>
        </AdminRouteGuard>
    );
}
