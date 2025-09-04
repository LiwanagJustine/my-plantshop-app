'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminRouteGuard } from '@/components/auth';

export default function AdminRootPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to admin dashboard
        router.replace('/admin/dashboard');
    }, [router]);

    return (
        <AdminRouteGuard>
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Redirecting to admin dashboard...</p>
                </div>
            </div>
        </AdminRouteGuard>
    );
}
