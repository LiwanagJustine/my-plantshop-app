'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AdminLoadingOverlay from '@/components/ui/AdminLoadingOverlay';

interface CustomerRouteGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function CustomerRouteGuard({ children, fallback }: CustomerRouteGuardProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (loading) {
            console.log('🔒 CustomerRouteGuard: Still loading auth context...');
            return;
        }

        if (!user) {
            console.log('🔒 CustomerRouteGuard: No user found, redirecting to login');
            router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname));
            return;
        }

        // Check if user is customer (not admin)
        console.log('🔒 CustomerRouteGuard: Current user:', user);
        console.log('🔒 CustomerRouteGuard: Current user role:', user.role);

        if (user.role === 'customer') {
            console.log('✅ CustomerRouteGuard: Customer access granted');
            setAuthorized(true);
            setChecking(false);
        } else if (user.role === 'admin') {
            console.log('🚨 CustomerRouteGuard: Admin trying to access customer area, redirecting to dashboard');
            router.push('/dashboard');
            return;
        } else {
            console.log('🚨 CustomerRouteGuard: Unknown role:', user.role);
            router.push('/auth/login');
            return;
        }
    }, [user, loading, router]);

    // Show loading overlay while checking
    if (loading || checking) {
        return <AdminLoadingOverlay />;
    }

    // Show unauthorized message or fallback
    if (!authorized) {
        return fallback || (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You don&apos;t have permission to access this customer area.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
