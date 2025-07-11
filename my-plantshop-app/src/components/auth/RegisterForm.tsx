'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Input, Button, Checkbox } from '@/components/forms';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';

interface RegisterFormProps {
    onSubmit?: (data: RegisterFormData) => Promise<void> | void;
    loading?: boolean;
}

export function RegisterForm({ onSubmit, loading = false }: RegisterFormProps) {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const handleFormSubmit = async (data: RegisterFormData) => {
        try {
            await onSubmit?.(data);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const isLoading = loading || isSubmitting;
    const password = watch('password');

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <Input
                    {...register('firstName')}
                    type="text"
                    label="First Name"
                    placeholder="Enter your first name"
                    error={errors.firstName?.message}
                    leftIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    }
                    autoComplete="given-name"
                    disabled={isLoading}
                />

                {/* Last Name */}
                <Input
                    {...register('lastName')}
                    type="text"
                    label="Last Name"
                    placeholder="Enter your last name"
                    error={errors.lastName?.message}
                    leftIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    }
                    autoComplete="family-name"
                    disabled={isLoading}
                />
            </div>

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
                placeholder="Create a strong password"
                error={errors.password?.message}
                helperText="Must contain uppercase, lowercase, and number"
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
                autoComplete="new-password"
                disabled={isLoading}
            />

            {/* Confirm Password Field */}
            <Input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                rightIcon={
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`hover:opacity-70 transition-opacity ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                        disabled={isLoading}
                    >
                        {showConfirmPassword ? (
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
                autoComplete="new-password"
                disabled={isLoading}
            />

            {/* Terms and Conditions */}
            <Checkbox
                {...register('terms')}
                label={
                    <span>
                        I agree to the{' '}
                        <Link
                            href="/terms"
                            className={`font-medium transition-colors ${theme === 'dark'
                                    ? 'text-green-400 hover:text-green-300'
                                    : 'text-green-600 hover:text-green-500'
                                }`}
                        >
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link
                            href="/privacy"
                            className={`font-medium transition-colors ${theme === 'dark'
                                    ? 'text-green-400 hover:text-green-300'
                                    : 'text-green-600 hover:text-green-500'
                                }`}
                        >
                            Privacy Policy
                        </Link>
                    </span>
                }
                error={errors.terms?.message}
                disabled={isLoading}
            />

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
            >
                Create Account
            </Button>

            {/* Login Link */}
            <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Already have an account?{' '}
                <Link
                    href="/auth/login"
                    className={`font-medium transition-colors ${theme === 'dark'
                            ? 'text-green-400 hover:text-green-300'
                            : 'text-green-600 hover:text-green-500'
                        }`}
                >
                    Sign in here
                </Link>
            </div>
        </form>
    );
}
