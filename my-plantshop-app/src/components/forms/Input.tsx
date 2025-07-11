import React, { forwardRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
        const { theme } = useTheme();

        const baseInputClasses = `
      w-full px-4 py-3 rounded-lg border transition-all duration-200
      ${leftIcon ? 'pl-12' : ''}
      ${rightIcon ? 'pr-12' : ''}
      ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
            }
      ${error
                ? theme === 'dark'
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : ''
            }
    `.trim().replace(/\s+/g, ' ');

        return (
            <div className="space-y-2">
                {label && (
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`${baseInputClasses} ${className}`}
                        {...props}
                    />
                    {rightIcon && (
                        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
