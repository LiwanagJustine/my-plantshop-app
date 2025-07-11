'use client';

import { useTheme } from '../../context/ThemeContext';

export default function FooterSection() {
    const { theme } = useTheme();

    return (
        <footer className={`py-12 ${theme === 'light' ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-200'
            }`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className={`font-bold text-lg mb-4 ${theme === 'light' ? 'text-emerald-400' : 'text-emerald-300'
                            }`}>Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Indoor Plants</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Outdoor Plants</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Plant Care</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Accessories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg mb-4 ${theme === 'light' ? 'text-emerald-400' : 'text-emerald-300'
                            }`}>Care</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Plant Guide</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Troubleshooting</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Seasonal Tips</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Expert Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg mb-4 ${theme === 'light' ? 'text-emerald-400' : 'text-emerald-300'
                            }`}>Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>About Us</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Contact</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Shipping</a></li>
                            <li><a href="#" className={`transition-colors ${theme === 'light'
                                    ? 'text-slate-300 hover:text-emerald-400'
                                    : 'text-slate-400 hover:text-emerald-300'
                                }`}>Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg mb-4 ${theme === 'light' ? 'text-emerald-400' : 'text-emerald-300'
                            }`}>Connect</h3>
                        <div className="flex space-x-3">
                            <a href="#" className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${theme === 'light'
                                    ? 'bg-slate-700 hover:bg-emerald-600'
                                    : 'bg-slate-800 hover:bg-emerald-500'
                                }`}>
                                <span className="text-sm">📘</span>
                            </a>
                            <a href="#" className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${theme === 'light'
                                    ? 'bg-slate-700 hover:bg-emerald-600'
                                    : 'bg-slate-800 hover:bg-emerald-500'
                                }`}>
                                <span className="text-sm">📷</span>
                            </a>
                            <a href="#" className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${theme === 'light'
                                    ? 'bg-slate-700 hover:bg-emerald-600'
                                    : 'bg-slate-800 hover:bg-emerald-500'
                                }`}>
                                <span className="text-sm">🐦</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`border-t pt-6 text-center ${theme === 'light' ? 'border-slate-700' : 'border-slate-600'
                    }`}>
                    <p className={`text-sm ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                        © 2025 PlantShop. All rights reserved. Made with 💚 for plant lovers.
                    </p>
                </div>
            </div>
        </footer>
    );
}
