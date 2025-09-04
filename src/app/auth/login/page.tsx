// app/auth/login/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/hooks/useNotifications';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { DemoCredentials } from '@/components/auth/DemoCredentials';
import { NotificationContainer } from '@/components/ui/Notification';
import { type LoginFormData } from '@/lib/validations/auth';

// ✅ Just use implicit typing, no need to constrain it
export default function LoginPage({ searchParams }: any) {
    const router = useRouter();
    const { login: authLogin, user } = useAuth();
    const { notifications, addNotification, removeNotification } = useNotifications();
    const [loading, setLoading] = useState(false);

    const redirectUrl =
        typeof searchParams?.redirect === 'string'
            ? searchParams.redirect
            : '/customer/dashboard';

    const urlMessage =
        typeof searchParams?.message === 'string' ? searchParams.message : undefined;

    useEffect(() => {
        if (user && !loading) {
            const targetUrl = user.role === 'admin' ? '/admin/dashboard' : redirectUrl;
            window.location.href = `${window.location.origin}${targetUrl}`;
        }
    }, [user, router, redirectUrl, loading]);

    useEffect(() => {
        if (urlMessage) {
            addNotification({
                type: 'success',
                message: urlMessage,
                duration: 7000,
            });
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, [urlMessage, addNotification]);

    const handleLogin = async (data: LoginFormData) => {
        setLoading(true);
        try {
            await authLogin(data.email, data.password, data.rememberMe);
            setTimeout(async () => {
                const response = await fetch('/api/auth/me', { credentials: 'include' });
                const currentOrigin = window.location.origin;

                if (response.ok) {
                    const userData = await response.json();
                    const targetUrl =
                        userData.user.role === 'admin'
                            ? '/admin/dashboard'
                            : '/customer/dashboard';
                    window.location.href = `${currentOrigin}${targetUrl}`;
                } else {
                    window.location.href = `${currentOrigin}/customer/dashboard`;
                }
            }, 200);
        } catch (error: any) {
            addNotification({
                type: 'error',
                message: error.message || 'Login failed. Please try again.',
                duration: 5000,
            });
        } finally {
            setLoading(false);
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
