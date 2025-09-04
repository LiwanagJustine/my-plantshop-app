import React, { forwardRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
    error?: string;
    description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, description, className = '', ...props }, ref) => {
        const { theme } = useTheme();

        return (
            <div className="space-y-2">
                <div className="flex items-start gap-3">
                    <div className="relative flex items-center">
                        <input
                            ref={ref}
                            type="checkbox"
                            className={`
                w-5 h-5 rounded border-2 transition-all duration-200
                ${theme === 'dark'
                                    ? 'bg-gray-800 border-gray-600 text-green-500 focus:ring-green-500/20'
                                    : 'bg-white border-gray-300 text-green-600 focus:ring-green-500/20'
                                }
                ${error
                                    ? theme === 'dark'
                                        ? 'border-red-500 focus:ring-red-500/20'
                                        : 'border-red-500 focus:ring-red-500/20'
                                    : ''
                                }
                checked:bg-green-600 checked:border-green-600
                focus:ring-2 focus:outline-none
                ${className}
              `.trim().replace(/\s+/g, ' ')}
                            {...props}
                        />
                        <svg
                            className={`
                absolute inset-0 w-5 h-5 text-white pointer-events-none
                ${props.checked ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-200
              `.trim().replace(/\s+/g, ' ')}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    {(label || description) && (
                        <div className="flex-1">
                            {label && (
                                <label className={`text-sm font-medium cursor-pointer ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    {label}
                                </label>
                            )}
                            {description && (
                                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {error && (
                    <p className="text-sm text-red-500 flex items-center gap-1 ml-8">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
