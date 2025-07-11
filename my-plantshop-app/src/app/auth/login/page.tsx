'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { DemoCredentials } from '@/components/auth/DemoCredentials';
import { type LoginFormData } from '@/lib/validations/auth';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const urlMessage = searchParams?.get('message');
        if (urlMessage) {
            setMessage(urlMessage);
            // Clear the message from URL after showing it
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
    }, [searchParams]);

    const handleLogin = async (data: LoginFormData) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result.user);

                // Redirect based on user role
                if (result.user.role === 'admin') {
                    router.push('/dashboard');
                } else {
                    router.push('/customer/dashboard');
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Login failed');
            }

        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your PlantShop account"
        >
            {message && (
                <div className={`mb-6 p-4 rounded-lg border ${theme === 'dark'
                    ? 'bg-green-900/20 border-green-500/30 text-green-400'
                    : 'bg-green-50 border-green-200 text-green-700'
                    }`}>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{message}</span>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className={`mb-6 p-4 rounded-lg border ${theme === 'dark'
                    ? 'bg-red-900/20 border-red-500/30 text-red-400'
                    : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{errorMessage}</span>
                    </div>
                </div>
            )}

            <LoginForm onSubmit={handleLogin} loading={loading} />

            <DemoCredentials />
        </AuthLayout>
    );
}
