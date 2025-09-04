/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/hooks/useNotifications';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { DemoCredentials } from '@/components/auth/DemoCredentials';
import { NotificationContainer } from '@/components/ui/Notification';
import { type LoginFormData } from '@/lib/validations/auth';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login: authLogin, user } = useAuth();
    const { notifications, addNotification, removeNotification } = useNotifications();
    const [loading, setLoading] = useState(false);

    // Get redirect URL from search params
    const redirectUrl = searchParams?.get('redirect') || '/customer/dashboard';

    // If user is already logged in, redirect them
    useEffect(() => {
        console.log('🔥 Login page useEffect - user state:', user);
        console.log('🔥 Current location:', window.location.href);

        // Disable automatic redirect during login process to prevent conflicts
        if (user && !loading) {
            const targetUrl = user.role === 'admin' ? '/admin/dashboard' : redirectUrl;
            console.log('🔥 useEffect redirecting to:', targetUrl);
            console.log('🔥 User role:', user.role);

            // Use window.location to ensure correct port
            const currentOrigin = window.location.origin;
            const fullUrl = `${currentOrigin}${targetUrl}`;
            console.log('🔥 useEffect full URL:', fullUrl);

            window.location.href = fullUrl;
        }
    }, [user, router, redirectUrl, loading]);

    useEffect(() => {
        const urlMessage = searchParams?.get('message');
        if (urlMessage) {
            addNotification({
                type: 'success',
                message: urlMessage,
                duration: 7000, // 7 seconds for success messages
            });
            // Clear the message from URL after showing it
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
    }, [searchParams, addNotification]);

    const handleLogin = async (data: LoginFormData) => {
        setLoading(true);
        console.log('🔥 Login form submitted with data:', {
            email: data.email,
            hasPassword: !!data.password,
            rememberMe: data.rememberMe
        });

        try {
            console.log('🔥 Calling authLogin...');
            // Use the AuthContext login method
            await authLogin(data.email, data.password, data.rememberMe);

            console.log('🔥 Login successful, user should be set in context');

            // Handle immediate redirect to prevent port issues
            console.log('🔥 Handling immediate redirect...');
            const currentOrigin = window.location.origin;

            // Get the updated user from context to determine correct redirect
            setTimeout(async () => {
                try {
                    // Re-fetch user data to get the correct role
                    const response = await fetch('/api/auth/me', {
                        credentials: 'include'
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        const userRole = userData.user.role;
                        console.log('🔥 User role from API:', userRole);

                        // Redirect based on actual user role
                        const targetUrl = userRole === 'admin' ? '/admin/dashboard' : '/customer/dashboard';
                        const fullUrl = `${currentOrigin}${targetUrl}`;
                        console.log('🔥 Role-based redirect to:', fullUrl);
                        window.location.href = fullUrl;
                    } else {
                        // Fallback to default customer dashboard
                        const fallbackUrl = `${currentOrigin}/customer/dashboard`;
                        console.log('🔥 Fallback redirect to:', fallbackUrl);
                        window.location.href = fallbackUrl;
                    }
                } catch (error) {
                    console.error('🚨 Error getting user role, using fallback:', error);
                    const fallbackUrl = `${currentOrigin}/customer/dashboard`;
                    window.location.href = fallbackUrl;
                }
            }, 200);

        } catch (error: any) {
            console.error('🚨 Login failed:', error);
            console.error('🚨 Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });

            addNotification({
                type: 'error',
                message: error.message || 'Login failed. Please try again.',
                duration: 5000, // 5 seconds for error messages
            });
        } finally {
            setLoading(false);
            console.log('🔥 Login process completed');
        }
    };

    return (
        <>
            <NotificationContainer
                notifications={notifications}
                onRemove={removeNotification}
            />

            <AuthLayout
                title="Welcome Back"
                subtitle="Sign in to your PlantShop account"
            >
                <LoginForm onSubmit={handleLogin} loading={loading} />
                <DemoCredentials />
            </AuthLayout>
        </>
    );
}
