'use client';

import { useTheme } from '../../context/ThemeContext';
import AnimatedSection from '../ui/AnimatedSection';

export default function HeroSection() {
    const { theme } = useTheme();

    return (
        <section className="hero-section px-4 py-16 lg:py-24 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                {/* Left Side - Content */}
                <div className="left-side flex-1 space-y-8 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
                    <AnimatedSection animation="slideUp" delay={0}>
                        <div className="space-y-6">
                            <h1 className={`text-4xl lg:text-6xl font-bold leading-tight ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                }`}>
                                Welcome to{' '}
                                <span className={`block lg:inline ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                    }`}>My Plant Shop</span>
                            </h1>
                            <p className={`text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                }`}>
                                Transform your space with beautiful, healthy plants.
                                Your one-stop destination for indoor and outdoor greenery.
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slideUp" delay={200}>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <button
                                className={`px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg cursor-pointer ${theme === 'light'
                                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    }`}
                                aria-label="Shop now for plants"
                            >
                                Shop Now
                            </button>
                            <button
                                className={`border-2 px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer ${theme === 'light'
                                    ? 'border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
                                    : 'border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-900'
                                    }`}
                                aria-label="Explore plant collection"
                            >
                                Explore Collection
                            </button>
                        </div>
                    </AnimatedSection>

                    {/* Feature highlights */}
                    <AnimatedSection animation="slideUp" delay={300}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 pt-8 pb-4">
                            <div className={`group relative backdrop-blur-sm rounded-xl p-4 lg:p-5 border text-center lg:text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer ${theme === 'light'
                                ? 'bg-white/80 border-slate-200/50 hover:border-emerald-300/50'
                                : 'bg-slate-800/80 border-slate-600/50 hover:border-emerald-500/50'
                                }`}>
                                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                    ? 'bg-gradient-to-br from-emerald-50/40 to-teal-50/40'
                                    : 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20'
                                    }`}></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center lg:justify-start mb-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 ${theme === 'light'
                                            ? 'bg-emerald-100/80 group-hover:bg-emerald-200/80'
                                            : 'bg-emerald-800/80 group-hover:bg-emerald-700/80'
                                            }`}>
                                            <span className={`text-xs ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                                                }`}>🌿</span>
                                        </div>
                                        <div className={`text-2xl lg:text-3xl font-bold ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                            }`}>500+</div>
                                    </div>
                                    <div className={`text-sm font-semibold transition-colors duration-300 ${theme === 'light'
                                        ? 'text-slate-700 group-hover:text-slate-800'
                                        : 'text-slate-300 group-hover:text-slate-200'
                                        }`}>Plant Varieties</div>
                                    <div className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                                        }`}>Curated worldwide</div>
                                </div>
                            </div>

                            <div className={`group relative backdrop-blur-sm rounded-xl p-4 lg:p-5 border text-center lg:text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer ${theme === 'light'
                                ? 'bg-white/80 border-slate-200/50 hover:border-slate-300/50'
                                : 'bg-slate-800/80 border-slate-600/50 hover:border-slate-500/50'
                                }`}>
                                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                    ? 'bg-gradient-to-br from-slate-50/40 to-gray-50/40'
                                    : 'bg-gradient-to-br from-slate-700/20 to-slate-600/20'
                                    }`}></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center lg:justify-start mb-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 ${theme === 'light'
                                            ? 'bg-slate-100/80 group-hover:bg-slate-200/80'
                                            : 'bg-slate-700/80 group-hover:bg-slate-600/80'
                                            }`}>
                                            <span className={`text-xs ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                                                }`}>💬</span>
                                        </div>
                                        <div className={`text-2xl lg:text-3xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                            }`}>24/7</div>
                                    </div>
                                    <div className={`text-sm font-semibold transition-colors duration-300 ${theme === 'light'
                                        ? 'text-slate-700 group-hover:text-slate-800'
                                        : 'text-slate-300 group-hover:text-slate-200'
                                        }`}>Care Support</div>
                                    <div className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                                        }`}>Expert guidance</div>
                                </div>
                            </div>

                            <div className={`group relative backdrop-blur-sm rounded-xl p-4 lg:p-5 border text-center lg:text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer ${theme === 'light'
                                ? 'bg-white/80 border-slate-200/50 hover:border-teal-300/50'
                                : 'bg-slate-800/80 border-slate-600/50 hover:border-teal-500/50'
                                }`}>
                                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light'
                                    ? 'bg-gradient-to-br from-teal-50/40 to-emerald-50/40'
                                    : 'bg-gradient-to-br from-teal-900/20 to-emerald-900/20'
                                    }`}></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center lg:justify-start mb-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 ${theme === 'light'
                                            ? 'bg-teal-100/80 group-hover:bg-teal-200/80'
                                            : 'bg-teal-800/80 group-hover:bg-teal-700/80'
                                            }`}>
                                            <span className={`text-xs ${theme === 'light' ? 'text-teal-700' : 'text-teal-300'
                                                }`}>🚀</span>
                                        </div>
                                        <div className={`text-2xl lg:text-3xl font-bold ${theme === 'light' ? 'text-teal-700' : 'text-teal-400'
                                            }`}>Free</div>
                                    </div>
                                    <div className={`text-sm font-semibold transition-colors duration-300 ${theme === 'light'
                                        ? 'text-slate-700 group-hover:text-slate-800'
                                        : 'text-slate-300 group-hover:text-slate-200'
                                        }`}>Delivery</div>
                                    <div className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                                        }`}>Fast & secure</div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Right Side - Hero Image */}
                <AnimatedSection animation="slideInRight" delay={100} className="right-side flex-1 flex justify-center lg:justify-end">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-200/30 rounded-full blur-3xl opacity-40 scale-110"></div>
                        <img
                            src="/images/plants/plant1.png"
                            alt="Beautiful plants from My Plant Shop"
                            className="relative z-10 max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer rounded-2xl"
                        />
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
