'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Notification } from '@/hooks/useNotifications';

interface NotificationItemProps {
    notification: Notification;
    onRemove: (id: string) => void;
}

export function NotificationItem({ notification, onRemove }: NotificationItemProps) {
    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        // Trigger animation on mount
        setTimeout(() => setIsVisible(true), 50);

        // Progress bar animation
        const duration = notification.duration || 5000;
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const progressStep = 100 / steps;

        const progressTimer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev - progressStep;
                return newProgress <= 0 ? 0 : newProgress;
            });
        }, interval);

        // Auto-remove
        const removeTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onRemove(notification.id), 300); // Wait for exit animation
        }, duration);

        return () => {
            clearInterval(progressTimer);
            clearTimeout(removeTimer);
        };
    }, [notification.id, notification.duration, onRemove]);

    const getNotificationStyles = () => {
        const baseStyles = "border-l-4 p-4 rounded-lg shadow-lg backdrop-blur-sm";

        switch (notification.type) {
            case 'success':
                return `${baseStyles} ${theme === 'dark'
                    ? 'bg-green-900/90 border-green-500 text-green-100'
                    : 'bg-green-50/90 border-green-500 text-green-800'
                    }`;
            case 'error':
                return `${baseStyles} ${theme === 'dark'
                    ? 'bg-red-900/90 border-red-500 text-red-100'
                    : 'bg-red-50/90 border-red-500 text-red-800'
                    }`;
            case 'warning':
                return `${baseStyles} ${theme === 'dark'
                    ? 'bg-yellow-900/90 border-yellow-500 text-yellow-100'
                    : 'bg-yellow-50/90 border-yellow-500 text-yellow-800'
                    }`;
            case 'info':
                return `${baseStyles} ${theme === 'dark'
                    ? 'bg-blue-900/90 border-blue-500 text-blue-100'
                    : 'bg-blue-50/90 border-blue-500 text-blue-800'
                    }`;
            default:
                return baseStyles;
        }
    };

    const getIcon = () => {
        switch (notification.type) {
            case 'success':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getProgressBarColor = () => {
        switch (notification.type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'info':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div
            className={`
                relative overflow-hidden transition-all duration-300 ease-in-out mb-2
                ${isVisible ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'}
                ${getNotificationStyles()}
            `}
        >
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-black/10 w-full">
                <div
                    className={`h-full transition-all duration-75 ease-linear ${getProgressBarColor()}`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                    {getIcon()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-5">
                        {notification.message}
                    </p>
                </div>

                {/* Close button */}
                <button
                    onClick={() => onRemove(notification.id)}
                    className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Close notification"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

interface NotificationContainerProps {
    notifications: Notification[];
    onRemove: (id: string) => void;
}

export function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2">
            {notifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}
