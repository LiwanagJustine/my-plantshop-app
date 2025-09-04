'use client';

import React, { useEffect, useState } from 'react';
import { useToast, Toast } from '@/context/ToastContext';
import { useTheme } from '@/context/ThemeContext';

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const handleRemove = () => {
        setIsLeaving(true);
        setTimeout(() => onRemove(toast.id), 300);
    };

    const getToastStyles = () => {
        const baseStyles = `
            transform transition-all duration-300 ease-in-out
            ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
        `;

        const typeStyles = {
            success: theme === 'dark'
                ? 'bg-green-900 border-green-700'
                : 'bg-green-50 border-green-200',
            error: theme === 'dark'
                ? 'bg-red-900 border-red-700'
                : 'bg-red-50 border-red-200',
            warning: theme === 'dark'
                ? 'bg-yellow-900 border-yellow-700'
                : 'bg-yellow-50 border-yellow-200',
            info: theme === 'dark'
                ? 'bg-blue-900 border-blue-700'
                : 'bg-blue-50 border-blue-200',
        };

        return `${baseStyles} ${typeStyles[toast.type]}`;
    };

    const getIconAndColors = () => {
        switch (toast.type) {
            case 'success':
                return {
                    icon: '✅',
                    iconBg: theme === 'dark' ? 'bg-green-800' : 'bg-green-100',
                    iconColor: theme === 'dark' ? 'text-green-300' : 'text-green-600',
                    titleColor: theme === 'dark' ? 'text-green-300' : 'text-green-800',
                };
            case 'error':
                return {
                    icon: '❌',
                    iconBg: theme === 'dark' ? 'bg-red-800' : 'bg-red-100',
                    iconColor: theme === 'dark' ? 'text-red-300' : 'text-red-600',
                    titleColor: theme === 'dark' ? 'text-red-300' : 'text-red-800',
                };
            case 'warning':
                return {
                    icon: '⚠️',
                    iconBg: theme === 'dark' ? 'bg-yellow-800' : 'bg-yellow-100',
                    iconColor: theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600',
                    titleColor: theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800',
                };
            case 'info':
                return {
                    icon: 'ℹ️',
                    iconBg: theme === 'dark' ? 'bg-blue-800' : 'bg-blue-100',
                    iconColor: theme === 'dark' ? 'text-blue-300' : 'text-blue-600',
                    titleColor: theme === 'dark' ? 'text-blue-300' : 'text-blue-800',
                };
            default:
                return {
                    icon: 'ℹ️',
                    iconBg: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100',
                    iconColor: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
                    titleColor: theme === 'dark' ? 'text-gray-300' : 'text-gray-800',
                };
        }
    };

    const { icon, iconBg, iconColor, titleColor } = getIconAndColors();

    return (
        <div className={`
            max-w-sm w-full border rounded-lg shadow-lg p-4 mb-3
            ${getToastStyles()}
        `}>
            <div className="flex items-start">
                {/* Icon */}
                <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3
                    ${iconBg}
                `}>
                    <span className={`text-sm ${iconColor}`}>
                        {icon}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${titleColor}`}>
                        {toast.title}
                    </h4>
                    {toast.message && (
                        <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {toast.message}
                        </p>
                    )}
                    {toast.action && (
                        <div className="mt-3">
                            <button
                                onClick={toast.action.onClick}
                                className={`
                                    text-sm font-medium underline hover:no-underline
                                    ${toast.type === 'success'
                                        ? (theme === 'dark' ? 'text-green-300 hover:text-green-200' : 'text-green-700 hover:text-green-800')
                                        : (theme === 'dark' ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700')
                                    }
                                `}
                            >
                                {toast.action.label}
                            </button>
                        </div>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={handleRemove}
                    className={`
                        flex-shrink-0 ml-4 p-1 rounded-md hover:opacity-75 transition-opacity
                        ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}
                    `}
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={removeToast}
                />
            ))}
        </div>
    );
}
