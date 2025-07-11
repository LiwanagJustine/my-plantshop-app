'use client';

import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

export default function HeaderSection() {
    const { theme, mounted } = useTheme();

    if (!mounted) {
        // Return a light-themed header while loading
        return (
            <header className="relative z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-16">
                    <nav className="flex items-center justify-between h-16 lg:h-18">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg lg:text-xl font-bold">🌱</span>
                            </div>
                            <span className="text-xl lg:text-2xl font-bold text-slate-800">PlantShop</span>
                        </Link>
                        <div className="p-2 w-9 h-9 rounded-lg bg-slate-100 animate-pulse">
                            <div className="w-5 h-5"></div>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }

    return (
        <header className={`relative z-50 backdrop-blur-md border-b sticky top-0 transition-colors duration-300 ${theme === 'light'
            ? 'bg-white/90 border-slate-200/50'
            : 'bg-slate-900/90 border-slate-700/50'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <nav className="flex items-center justify-between h-16 lg:h-18">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer group">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white text-lg lg:text-xl font-bold">🌱</span>
                        </div>
                        <span className={`text-xl lg:text-2xl font-bold transition-colors duration-300 logo-text ${theme === 'light'
                            ? 'text-slate-800 group-hover:text-emerald-700'
                            : 'text-white group-hover:text-emerald-400'
                            }`}>
                            PlantShop
                        </span>
                    </Link>

                    {/* Navigation Links - Hidden on mobile */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className={`active font-medium transition-colors duration-300 cursor-pointer relative group ${theme === 'light'
                            ? 'text-slate-700 hover:text-emerald-700'
                            : 'text-slate-300 hover:text-emerald-400'
                            }`}>
                            Home
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${theme === 'light' ? 'bg-emerald-700' : 'bg-emerald-400'
                                }`}></span>
                        </a>
                        <a href="#" className={`font-medium transition-colors duration-300 cursor-pointer relative group ${theme === 'light'
                            ? 'text-slate-700 hover:text-emerald-700'
                            : 'text-slate-300 hover:text-emerald-400'
                            }`}>
                            Plants
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${theme === 'light' ? 'bg-emerald-700' : 'bg-emerald-400'
                                }`}></span>
                        </a>
                        <a href="#" className={`font-medium transition-colors duration-300 cursor-pointer relative group ${theme === 'light'
                            ? 'text-slate-700 hover:text-emerald-700'
                            : 'text-slate-300 hover:text-emerald-400'
                            }`}>
                            Care Guide
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${theme === 'light' ? 'bg-emerald-700' : 'bg-emerald-400'
                                }`}></span>
                        </a>
                        <a href="#" className={`font-medium transition-colors duration-300 cursor-pointer relative group ${theme === 'light'
                            ? 'text-slate-700 hover:text-emerald-700'
                            : 'text-slate-300 hover:text-emerald-400'
                            }`}>
                            About
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${theme === 'light' ? 'bg-emerald-700' : 'bg-emerald-400'
                                }`}></span>
                        </a>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Search Bar */}
                        <div className="relative group search-container">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search plants..."
                                    className={`w-32 sm:w-48 md:w-56 px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 ${theme === 'light'
                                        ? 'text-slate-700 bg-slate-50/80 border border-slate-200/50 placeholder-slate-400'
                                        : 'text-slate-300 bg-slate-800/80 border border-slate-600/50 placeholder-slate-500'
                                        }`}
                                    aria-label="Search for plants"
                                />
                                <button className={`p-2 rounded-lg transition-all duration-300 cursor-pointer sm:-ml-10 sm:relative sm:z-10 ${theme === 'light'
                                    ? 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                                    : 'text-slate-300 hover:text-emerald-400 hover:bg-emerald-900/20'
                                    }`} aria-label="Search">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Cart Icon with Badge */}
                        <button className={`relative p-2 rounded-lg transition-all duration-300 cursor-pointer ${theme === 'light'
                            ? 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                            : 'text-slate-300 hover:text-emerald-400 hover:bg-emerald-900/20'
                            }`}>
                            <svg className="w-5 h-5 hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l1.68 8.4a2 2 0 002 1.6h8.64a2 2 0 002-1.6L21 6H6" />
                                <circle cx="9" cy="19" r="1" />
                                <circle cx="20" cy="19" r="1" />
                            </svg>
                            <span className={`cart-badge absolute -top-1 -right-1 w-4 h-4 text-white text-xs rounded-full flex items-center justify-center font-medium ${theme === 'light' ? 'bg-emerald-600' : 'bg-emerald-500'
                                }`}>3</span>
                        </button>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Login Button */}
                        <Link
                            href="/auth/login"
                            className={`hidden sm:block px-4 py-2 border rounded-lg transition-all duration-300 font-medium cursor-pointer ${theme === 'light'
                                ? 'text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white'
                                : 'text-slate-200 border-slate-600 hover:bg-slate-600 hover:text-white'
                                }`}
                        >
                            Login
                        </Link>

                        {/* Mobile Menu Button */}
                        <button className={`md:hidden p-2 rounded-lg transition-all duration-300 cursor-pointer ${theme === 'light'
                            ? 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                            : 'text-slate-300 hover:text-emerald-400 hover:bg-emerald-900/20'
                            }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
