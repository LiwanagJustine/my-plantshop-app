'use client';

import React from 'react';
import { CustomerShopLayout } from '@/components/customer/CustomerShopLayout';
import { ProductGrid } from '@/components/customer/ProductGrid';

export default function CustomerDashboardPage() {
    return (
        <CustomerShopLayout>
            <ProductGrid />
        </CustomerShopLayout>
    );
}
