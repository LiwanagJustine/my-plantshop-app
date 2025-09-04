'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { NotificationContainer } from '@/components/ui/Notification';
import { type RegisterFormData } from '@/lib/validations/auth';

export default function RegisterPage() {
    const router = useRouter();
    const { notifications, addNotification, removeNotification } = useNotifications();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (data: RegisterFormData) => {
        setLoading(true);

        try {
            // Call the actual registration API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);

                // Show success notification without auto-redirect
                addNotification({
                    type: 'success',
                    message: 'Account created successfully! Click "Sign in here" below to login with your new credentials.',
                    duration: 10000, // 10 seconds to give user time to read
                });

                // No automatic redirect - user can navigate manually
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

        } catch (error: any) {
            console.error('Registration failed:', error);
            addNotification({
                type: 'error',
                message: error.message || 'Registration failed. Please try again.',
                duration: 5000, // 5 seconds for error messages
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
                title="Create Account"
                subtitle="Join PlantShop and start your green journey"
            >
                <RegisterForm onSubmit={handleRegister} loading={loading} />
            </AuthLayout>
        </>
    );
}
