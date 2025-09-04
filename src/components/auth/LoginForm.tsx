'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Input, Button, Checkbox } from '@/components/forms';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';

interface LoginFormProps {
    onSubmit?: (data: LoginFormData) => Promise<void> | void;
    loading?: boolean;
}

export function LoginForm({ onSubmit, loading = false }: LoginFormProps) {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const handleFormSubmit = async (data: LoginFormData) => {
        try {
            await onSubmit?.(data);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const isLoading = loading || isSubmitting;

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Email Field */}
            <Input
                {...register('email')}
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                error={errors.email?.message}
                leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                }
                autoComplete="email"
                disabled={isLoading}
            />

            {/* Password Field */}
            <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
                leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                }
                rightIcon={
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`hover:opacity-70 transition-opacity ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                        disabled={isLoading}
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                }
                autoComplete="current-password"
                disabled={isLoading}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
                <Checkbox
                    {...register('rememberMe')}
                    label="Remember me"
                    disabled={isLoading}
                />

                <Link
                    href="/auth/forgot-password"
                    className={`text-sm font-medium transition-colors ${theme === 'dark'
                            ? 'text-green-400 hover:text-green-300'
                            : 'text-green-600 hover:text-green-500'
                        }`}
                >
                    Forgot password?
                </Link>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
            >
                Sign In
            </Button>

            {/* Register Link */}
            <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Don&apos;t have an account?{' '}
                <Link
                    href="/auth/register"
                    className={`font-medium transition-colors ${theme === 'dark'
                            ? 'text-green-400 hover:text-green-300'
                            : 'text-green-600 hover:text-green-500'
                        }`}
                >
                    Create one here
                </Link>
            </div>
        </form>
    );
}
