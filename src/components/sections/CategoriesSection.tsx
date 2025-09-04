'use client';

import { useTheme } from '../../context/ThemeContext';
import AnimatedSection from '../ui/AnimatedSection';

export default function CategoriesSection() {
    const { theme } = useTheme();

    return (
        <section className="categories-section py-16">
            <div className="max-w-7xl mx-auto px-4">
                <AnimatedSection animation="slideUp">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                            }`}>
                            Shop by <span className={`${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                }`}>Category</span>
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                            }`}>
                            Find the perfect plants for your space and lifestyle
                        </p>
                    </div>
                </AnimatedSection>

                {/* Plant Categories with Real Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    <div className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl hover:-translate-y-3 cursor-pointer ${theme === 'light'
                        ? 'bg-white/90 border-slate-200/50 hover:border-emerald-300/50'
                        : 'bg-slate-800/90 border-slate-600/50 hover:border-emerald-500/50'
                        }`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === 'light'
                            ? 'bg-gradient-to-br from-emerald-50/50 to-teal-50/50'
                            : 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20'
                            }`}></div>
                        <div className="relative z-10">
                            <div className="relative w-full h-40 overflow-hidden">
                                <img
                                    src="/images/plants/plant5.jpg"
                                    alt="Indoor Plants Collection"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-emerald-100/90 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">Low Maintenance</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                    }`}>Indoor Plants</h3>
                                <p className={`text-sm mb-3 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                    }`}>Perfect for homes and offices, bringing nature indoors</p>
                                <div className={`font-medium text-sm ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                    }`}>Starting from $25</div>
                            </div>
                        </div>
                    </div>

                    <div className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl hover:-translate-y-3 cursor-pointer ${theme === 'light'
                        ? 'bg-white/90 border-slate-200/50 hover:border-teal-300/50'
                        : 'bg-slate-800/90 border-slate-600/50 hover:border-teal-500/50'
                        }`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === 'light'
                            ? 'bg-gradient-to-br from-teal-50/50 to-emerald-50/50'
                            : 'bg-gradient-to-br from-teal-900/20 to-emerald-900/20'
                            }`}></div>
                        <div className="relative z-10">
                            <div className="relative w-full h-40 overflow-hidden">
                                <img
                                    src="/images/plants/plant6.jpg"
                                    alt="Succulent Collection"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent"></div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-teal-100/90 text-teal-700 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">Drought Resistant</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                    }`}>Succulents</h3>
                                <p className={`text-sm mb-3 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                    }`}>Easy care desert beauties for minimalist spaces</p>
                                <div className={`font-medium text-sm ${theme === 'light' ? 'text-teal-700' : 'text-teal-400'
                                    }`}>Starting from $15</div>
                            </div>
                        </div>
                    </div>

                    <div className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl hover:-translate-y-3 cursor-pointer ${theme === 'light'
                        ? 'bg-white/90 border-slate-200/50 hover:border-emerald-300/50'
                        : 'bg-slate-800/90 border-slate-600/50 hover:border-emerald-500/50'
                        }`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === 'light'
                            ? 'bg-gradient-to-br from-emerald-50/50 to-teal-50/50'
                            : 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20'
                            }`}></div>
                        <div className="relative z-10">
                            <div className="relative w-full h-40 overflow-hidden">
                                <img
                                    src="/images/plants/plant7.jpg"
                                    alt="Large Statement Plants"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-emerald-100/90 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">Statement Pieces</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                    }`}>Large Plants</h3>
                                <p className={`text-sm mb-3 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                    }`}>Transform your space instantly with dramatic foliage</p>
                                <div className={`font-medium text-sm ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                    }`}>Starting from $85</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trending Plants Grid with Images */}
                <div className="mb-8">
                    <h3 className={`text-2xl lg:text-3xl font-bold mb-8 text-center ${theme === 'light' ? 'text-slate-800' : 'text-white'
                        }`}>
                        Trending <span className={`${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                            }`}>This Month</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                        <div className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white/90 border-slate-200/50 hover:border-emerald-300/50'
                            : 'bg-slate-800/90 border-slate-600/50 hover:border-emerald-500/50'
                            }`}>
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                ? 'bg-gradient-to-br from-emerald-50/50 to-teal-50/50'
                                : 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20'
                                }`}></div>
                            <div className="relative z-10">
                                <div className="relative w-full h-24 mb-3 overflow-hidden rounded-t-2xl">
                                    <img
                                        src="/images/plants/plant8.jpg"
                                        alt="Monstera Deliciosa"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="px-4 pb-4">
                                    <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                        }`}>Monstera</h4>
                                    <p className={`text-xs mb-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                        }`}>Easy Care</p>
                                    <div className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                        }`}>$45</div>
                                    <div className="mt-2">
                                        <button className={`w-full text-xs py-1.5 rounded-lg font-medium transition-colors ${theme === 'light'
                                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                            : 'bg-emerald-900/50 text-emerald-300 hover:bg-emerald-800/50'
                                            }`}>
                                            Quick Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white/90 border-slate-200/50 hover:border-teal-300/50'
                            : 'bg-slate-800/90 border-slate-600/50 hover:border-teal-500/50'
                            }`}>
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                ? 'bg-gradient-to-br from-teal-50/50 to-emerald-50/50'
                                : 'bg-gradient-to-br from-teal-900/20 to-emerald-900/20'
                                }`}></div>
                            <div className="relative z-10">
                                <div className="relative w-full h-24 mb-3 overflow-hidden rounded-t-2xl">
                                    <img
                                        src="/images/plants/plant9.jpg"
                                        alt="Snake Plant"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="px-4 pb-4">
                                    <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                        }`}>Snake Plant</h4>
                                    <p className={`text-xs mb-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                        }`}>Low Light</p>
                                    <div className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-teal-700' : 'text-teal-400'
                                        }`}>$32</div>
                                    <div className="mt-2">
                                        <button className={`w-full text-xs py-1.5 rounded-lg font-medium transition-colors ${theme === 'light'
                                            ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                                            : 'bg-teal-900/50 text-teal-300 hover:bg-teal-800/50'
                                            }`}>
                                            Quick Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white/90 border-slate-200/50 hover:border-amber-300/50'
                            : 'bg-slate-800/90 border-slate-600/50 hover:border-amber-500/50'
                            }`}>
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                ? 'bg-gradient-to-br from-amber-50/50 to-emerald-50/50'
                                : 'bg-gradient-to-br from-amber-900/20 to-emerald-900/20'
                                }`}></div>
                            <div className="relative z-10">
                                <div className="relative w-full h-24 mb-3 overflow-hidden rounded-t-2xl">
                                    <img
                                        src="/images/plants/plant10.jpg"
                                        alt="Fiddle Leaf Fig"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="px-4 pb-4">
                                    <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                        }`}>Fiddle Leaf</h4>
                                    <p className={`text-xs mb-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                        }`}>Statement</p>
                                    <div className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'
                                        }`}>$85</div>
                                    <div className="mt-2">
                                        <button className={`w-full text-xs py-1.5 rounded-lg font-medium transition-colors ${theme === 'light'
                                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                            : 'bg-amber-900/50 text-amber-300 hover:bg-amber-800/50'
                                            }`}>
                                            Quick Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white/90 border-slate-200/50 hover:border-purple-300/50'
                            : 'bg-slate-800/90 border-slate-600/50 hover:border-purple-500/50'
                            }`}>
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                ? 'bg-gradient-to-br from-purple-50/50 to-teal-50/50'
                                : 'bg-gradient-to-br from-purple-900/20 to-teal-900/20'
                                }`}></div>
                            <div className="relative z-10">
                                <div className="relative w-full h-24 mb-3 overflow-hidden rounded-t-2xl">
                                    <img
                                        src="/images/plants/plant11.jpg"
                                        alt="Succulent Mix"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="px-4 pb-4">
                                    <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                        }`}>Succulent Mix</h4>
                                    <p className={`text-xs mb-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                        }`}>Beginner</p>
                                    <div className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-purple-700' : 'text-purple-400'
                                        }`}>$28</div>
                                    <div className="mt-2">
                                        <button className={`w-full text-xs py-1.5 rounded-lg font-medium transition-colors ${theme === 'light'
                                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                            : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/50'
                                            }`}>
                                            Quick Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer ${theme === 'light'
                        ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}>
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    );
}
