import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    const { theme } = useTheme();

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
    };

    const getVariantClasses = () => {
        const isDark = theme === 'dark';

        switch (variant) {
            case 'primary':
                return `
          bg-green-600 hover:bg-green-700 text-white 
          ${isDark ? 'bg-green-500 hover:bg-green-600' : ''}
          disabled:bg-gray-400 disabled:cursor-not-allowed
        `;
            case 'secondary':
                return `
          ${isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }
          disabled:opacity-50 disabled:cursor-not-allowed
        `;
            case 'outline':
                return `
          border-2 bg-transparent hover:bg-opacity-10
          ${isDark
                        ? 'border-green-500 text-green-400 hover:bg-green-500'
                        : 'border-green-600 text-green-600 hover:bg-green-600'
                    }
          disabled:opacity-50 disabled:cursor-not-allowed
        `;
            case 'ghost':
                return `
          bg-transparent hover:bg-opacity-10
          ${isDark
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
          disabled:opacity-50 disabled:cursor-not-allowed
        `;
            default:
                return '';
        }
    };

    const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-lg font-medium
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20
    ${sizeClasses[size]}
    ${getVariantClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'pointer-events-none' : ''}
  `.trim().replace(/\s+/g, ' ');

    return (
        <button
            className={`${baseClasses} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Loading...
                </>
            ) : (
                <>
                    {leftIcon && <span>{leftIcon}</span>}
                    {children}
                    {rightIcon && <span>{rightIcon}</span>}
                </>
            )}
        </button>
    );
}
