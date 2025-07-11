'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { type RegisterFormData } from '@/lib/validations/auth';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (data: RegisterFormData) => {
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Registration attempt with:', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: '***',
                terms: data.terms,
            });

            // TODO: Replace with actual registration logic
            // Example:
            // const response = await fetch('/api/auth/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     firstName: data.firstName,
            //     lastName: data.lastName,
            //     email: data.email,
            //     password: data.password,
            //   }),
            // });
            // 
            // if (response.ok) {
            //   const result = await response.json();
            //   // Handle successful registration
            //   // Maybe auto-login or redirect to email verification
            //   router.push('/auth/login?message=Account created successfully');
            // } else {
            //   // Handle registration error
            //   throw new Error('Registration failed');
            // }

            // For demo purposes, redirect to login page with success message
            router.push('/auth/login?message=Account created successfully! Please sign in.');

        } catch (error) {
            console.error('Registration failed:', error);
            // TODO: Show error message to user
            // You could use a toast library or state management for this
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join PlantShop and start your green journey"
        >
            <RegisterForm onSubmit={handleRegister} loading={loading} />
        </AuthLayout>
    );
}
