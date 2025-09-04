'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UnauthorizedAccess from './UnauthorizedAccess';
import AdminLoadingOverlay from '@/components/ui/AdminLoadingOverlay';

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

            // Check if we have a cached admin verification (valid for 5 minutes)
            const cachedAdminCheck = localStorage.getItem('admin-verified');
            const cachedTimestamp = localStorage.getItem('admin-verified-time');
            const cachedUserId = localStorage.getItem('admin-verified-user');

            // Check if this is a direct URL access (more secure)
            const isDirectAccess = !document.referrer ||
                !document.referrer.includes(window.location.hostname) ||
                performance.navigation.type === 1; // TYPE_RELOAD

            // For direct URL access, always verify with server (security)
            if (isDirectAccess) {
                console.log('🔒 AdminRouteGuard: Direct URL access detected, performing server verification');
                // Skip cache for direct access
            } else if (cachedAdminCheck === 'true' && cachedTimestamp && cachedUserId === user.id?.toString()) {
                const timeDiff = Date.now() - parseInt(cachedTimestamp);
                const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

                if (timeDiff < fiveMinutes) {
                    console.log('🔒 AdminRouteGuard: Using cached admin verification');
                    setAuthorized(true);
                    setChecking(false);
                    return;
                }
            }

            console.log('🔒 AdminRouteGuard: User found, checking role...');
            console.log('🔒 AdminRouteGuard: Current user role from context:', user.role);

            // If user context already shows admin, trust it initially
            if (user.role === 'admin') {
                console.log('🔒 AdminRouteGuard: User context shows admin, granting access');
                setAuthorized(true);
                setChecking(false);

                // Cache the verification
                localStorage.setItem('admin-verified', 'true');
                localStorage.setItem('admin-verified-time', Date.now().toString());
                localStorage.setItem('admin-verified-user', user.id?.toString() || '');
                return;
            }

            // Double-check user role from server only if context doesn't show admin
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
                    // Clear cache on auth failure
                    localStorage.removeItem('admin-verified');
                    localStorage.removeItem('admin-verified-time');
                    localStorage.removeItem('admin-verified-user');
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

                    // Cache the verification
                    localStorage.setItem('admin-verified', 'true');
                    localStorage.setItem('admin-verified-time', Date.now().toString());
                    localStorage.setItem('admin-verified-user', user.id?.toString() || '');
                } else {
                    console.log('🚨 AdminRouteGuard: Access denied - user is not admin');
                    console.log('🚨 AdminRouteGuard: User role is:', userRole);
                    setAuthorized(false);

                    // Clear cache on access denial
                    localStorage.removeItem('admin-verified');
                    localStorage.removeItem('admin-verified-time');
                    localStorage.removeItem('admin-verified-user');
                }
            } catch (error) {
                console.error('🚨 AdminRouteGuard: Error checking auth:', error);
                // Clear cache on error
                localStorage.removeItem('admin-verified');
                localStorage.removeItem('admin-verified-time');
                localStorage.removeItem('admin-verified-user');
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
            <AdminLoadingOverlay
                message="Verifying admin access permissions..."
                isVisible={true}
            />
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
