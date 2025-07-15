'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UnauthorizedAccess from './UnauthorizedAccess';

interface AdminRouteGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function AdminRouteGuard({ children, fallback }: AdminRouteGuardProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAdminAccess = async () => {
            console.log('🔒 AdminRouteGuard: Checking admin access...');
            console.log('🔒 User loading:', loading);
            console.log('🔒 User state:', user);

            // Wait for auth to finish loading
            if (loading) {
                console.log('🔒 AdminRouteGuard: Still loading, waiting...');
                return;
            }

            // If no user, redirect to login
            if (!user) {
                console.log('🚨 AdminRouteGuard: No user found, redirecting to login');
                router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname));
                return;
            }

            console.log('🔒 AdminRouteGuard: User found, checking role...');
            console.log('🔒 AdminRouteGuard: Current user role from context:', user.role);

            // Double-check user role from server
            try {
                console.log('🔒 AdminRouteGuard: Making API call to verify role...');

                // Try both localStorage token and cookies
                const localToken = localStorage.getItem('auth-token');
                console.log('🔒 AdminRouteGuard: LocalStorage token:', localToken ? 'present' : 'missing');

                const headers: any = { credentials: 'include' };
                if (localToken) {
                    headers.Authorization = `Bearer ${localToken}`;
                }

                const response = await fetch('/api/auth/me', {
                    credentials: 'include',
                    headers: localToken ? { Authorization: `Bearer ${localToken}` } : {}
                });

                console.log('🔒 AdminRouteGuard: API response status:', response.status);

                if (!response.ok) {
                    console.log('🚨 AdminRouteGuard: Auth check failed, redirecting to login');
                    router.push('/auth/login');
                    return;
                }

                const data = await response.json();
                const userRole = data.user?.role;

                console.log('🔒 AdminRouteGuard: Server confirmed user role:', userRole);
                console.log('🔒 AdminRouteGuard: Full server response:', data);

                // Check if user is admin
                if (userRole === 'admin') {
                    console.log('✅ AdminRouteGuard: Admin access granted');
                    setAuthorized(true);
                } else {
                    console.log('🚨 AdminRouteGuard: Access denied - user is not admin');
                    console.log('🚨 AdminRouteGuard: User role is:', userRole);
                    setAuthorized(false);
                }

            } catch (error) {
                console.error('🚨 AdminRouteGuard: Error checking auth:', error);
                router.push('/auth/login');
                return;
            }

            console.log('🔒 AdminRouteGuard: Setting checking to false');
            setChecking(false);
        };

        checkAdminAccess();
    }, [user, loading, router]);

    console.log('🔒 AdminRouteGuard: Render state - loading:', loading, 'checking:', checking, 'authorized:', authorized);

    // Show loading spinner while checking
    if (loading || checking) {
        console.log('🔒 AdminRouteGuard: Showing loading spinner');
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying access permissions...</p>
                </div>
            </div>
        );
    }

    // Show unauthorized access page if not admin
    if (!authorized) {
        console.log('🚨 AdminRouteGuard: Showing UnauthorizedAccess component');
        console.log('🚨 AdminRouteGuard: User state:', user);
        return fallback || <UnauthorizedAccess />;
    }

    // Render protected content for admin users
    console.log('✅ AdminRouteGuard: Rendering protected content for admin');
    return <>{children}</>;
}
