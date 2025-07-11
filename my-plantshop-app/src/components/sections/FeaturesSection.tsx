'use client';

import { useTheme } from '../../context/ThemeContext';

export default function FeaturesSection() {
    const { theme } = useTheme();

    return (
        <section className="features-section py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                        }`}>
                        Why Choose <span className={`${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                            }`}>Our Plants</span>?
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                        Discover what makes our plant collection special and why thousands of customers trust us
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <div className={`group relative backdrop-blur-sm rounded-2xl p-6 border text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white/90 border-slate-200/50 hover:border-emerald-300/50'
                            : 'bg-slate-800/90 border-slate-600/50 hover:border-emerald-500/50'
                        }`}>
                        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                ? 'bg-gradient-to-br from-emerald-50/50 to-teal-50/50'
                                : 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20'
                            }`}></div>
                        <div className="relative z-10">
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${theme === 'light'
                                    ? 'bg-gradient-to-br from-emerald-100/80 to-emerald-200/80'
                                    : 'bg-gradient-to-br from-emerald-800/80 to-emerald-700/80'
                                }`}>
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-800 group-hover:text-emerald-700'
                                    : 'text-white group-hover:text-emerald-400'
                                }`}>Fresh & Healthy</h3>
                            <p className={`text-sm leading-relaxed transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-600 group-hover:text-slate-700'
                                    : 'text-slate-300 group-hover:text-slate-200'
                                }`}>
                                All our plants are carefully selected and nurtured to ensure they arrive in perfect condition with guaranteed freshness.
                            </p>
                        </div>
                    </div>

                    <div className={`group relative backdrop-blur-sm rounded-2xl p-6 border text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white/90 border-slate-200/50 hover:border-slate-300/50'
                            : 'bg-slate-800/90 border-slate-600/50 hover:border-slate-500/50'
                        }`}>
                        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                ? 'bg-gradient-to-br from-slate-50/50 to-gray-50/50'
                                : 'bg-gradient-to-br from-slate-700/20 to-slate-600/20'
                            }`}></div>
                        <div className="relative z-10">
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${theme === 'light'
                                    ? 'bg-gradient-to-br from-slate-100/80 to-slate-200/80'
                                    : 'bg-gradient-to-br from-slate-700/80 to-slate-600/80'
                                }`}>
                                <span className={`text-2xl ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                                    }`}>🚚</span>
                            </div>
                            <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-800 group-hover:text-slate-900'
                                    : 'text-white group-hover:text-slate-200'
                                }`}>Fast Delivery</h3>
                            <p className={`text-sm leading-relaxed transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-600 group-hover:text-slate-700'
                                    : 'text-slate-300 group-hover:text-slate-200'
                                }`}>
                                Quick and safe delivery to your doorstep with special eco-friendly packaging designed for plant protection.
                            </p>
                        </div>
                    </div>

                    <div className={`group relative backdrop-blur-sm rounded-2xl p-6 border text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white/90 border-slate-200/50 hover:border-teal-300/50'
                            : 'bg-slate-800/90 border-slate-600/50 hover:border-teal-500/50'
                        }`}>
                        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                ? 'bg-gradient-to-br from-teal-50/50 to-emerald-50/50'
                                : 'bg-gradient-to-br from-teal-900/20 to-emerald-900/20'
                            }`}></div>
                        <div className="relative z-10">
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${theme === 'light'
                                    ? 'bg-gradient-to-br from-teal-100/80 to-teal-200/80'
                                    : 'bg-gradient-to-br from-teal-800/80 to-teal-700/80'
                                }`}>
                                <span className="text-2xl">🌿</span>
                            </div>
                            <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-800 group-hover:text-teal-700'
                                    : 'text-white group-hover:text-teal-400'
                                }`}>Expert Care</h3>
                            <p className={`text-sm leading-relaxed transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-600 group-hover:text-slate-700'
                                    : 'text-slate-300 group-hover:text-slate-200'
                                }`}>
                                Get ongoing support and personalized care tips from our certified plant experts to keep your plants thriving.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Trust Indicators */}
                <div className={`mt-12 pt-8 border-t ${theme === 'light' ? 'border-slate-200/50' : 'border-slate-600/50'
                    }`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="group cursor-pointer">
                            <div className={`text-2xl lg:text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                }`}>10K+</div>
                            <div className={`text-sm transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-600 group-hover:text-slate-800'
                                    : 'text-slate-300 group-hover:text-slate-200'
                                }`}>Happy Customers</div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className={`text-2xl lg:text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                }`}>500+</div>
                            <div className={`text-sm transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-600 group-hover:text-slate-800'
                                    : 'text-slate-300 group-hover:text-slate-200'
                                }`}>Plant Varieties</div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className={`text-2xl lg:text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 ${theme === 'light' ? 'text-teal-700' : 'text-teal-400'
                                }`}>99%</div>
                            <div className={`text-sm transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-600 group-hover:text-slate-800'
                                    : 'text-slate-300 group-hover:text-slate-200'
                                }`}>Survival Rate</div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className={`text-2xl lg:text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                }`}>24/7</div>
                            <div className={`text-sm transition-colors duration-300 ${theme === 'light'
                                    ? 'text-slate-600 group-hover:text-slate-800'
                                    : 'text-slate-300 group-hover:text-slate-200'
                                }`}>Plant Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
