'use client';

import { useTheme } from '../../context/ThemeContext';
import AnimatedSection from '../ui/AnimatedSection';

export default function BestSellersSection() {
    const { theme } = useTheme();

    return (
        <section className="bestsellers-section py-16">
            <div className="max-w-7xl mx-auto px-4">
                <AnimatedSection animation="slideUp">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                            }`}>
                            <span className={`${theme === 'light' ? 'text-emerald-800' : 'text-emerald-400'
                                }`}>Best</span> Sellers
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                            }`}>
                            Our customers&apos; favorite plants that are guaranteed to brighten any space
                        </p>
                    </div>
                </AnimatedSection>

                {/* Featured Product - Large Card */}
                <AnimatedSection animation="scaleIn" delay={200}>
                    <div className="mb-12">
                        <div className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer mx-auto max-w-4xl ${theme === 'light'
                            ? 'bg-white border-slate-200/50 hover:border-emerald-300/50'
                            : 'bg-slate-800 border-slate-600/50 hover:border-emerald-500/50'
                            }`}>
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg border border-yellow-400/20">🏆 #1 Best Seller</span>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="relative h-80 lg:h-96 overflow-hidden">
                                    <img
                                        src="/images/plants/plant1.png"
                                        alt="Monstera Deliciosa - Best Selling Plant"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="p-8 lg:p-10 flex flex-col justify-center">
                                    <h3 className={`text-2xl lg:text-3xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                        }`}>Monstera Deliciosa</h3>
                                    <p className={`mb-4 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                        }`}>
                                        The ultimate statement plant with stunning split leaves. Perfect for bright, indirect light and loved by plant enthusiasts worldwide.
                                    </p>
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center text-yellow-400 mr-3">
                                            ⭐⭐⭐⭐⭐
                                        </div>
                                        <span className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                                            }`}>(1,247 reviews)</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`text-3xl font-bold ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                            }`}>$45</div>
                                        <div className={`text-sm line-through ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                                            }`}>$65</div>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-medium text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        Add to Cart - Save 31%
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Grid of Popular Plants */}
                <AnimatedSection animation="slideUp" delay={300}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white border-slate-200/50 hover:border-teal-300/50'
                            : 'bg-slate-800 border-slate-600/50 hover:border-teal-500/50'
                            }`}>
                            <div className="absolute top-3 left-3 z-10">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme === 'light' ? 'bg-teal-100 text-teal-700' : 'bg-teal-800 text-teal-200'
                                    }`}>Popular</span>
                            </div>
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="/images/plants/plant2.jpg"
                                    alt="Snake Plant"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                    }`}>Snake Plant</h3>
                                <p className={`text-sm mb-3 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                    }`}>Low light, low maintenance beauty</p>
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`text-xl font-bold ${theme === 'light' ? 'text-teal-700' : 'text-teal-400'
                                        }`}>$32</div>
                                    <div className="flex items-center text-yellow-500 text-sm">
                                        ⭐⭐⭐⭐⭐ <span className={`ml-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                                            }`}>(892)</span>
                                    </div>
                                </div>
                                <button className={`w-full py-2 rounded-lg font-medium text-sm transition-colors duration-300 ${theme === 'light'
                                    ? 'bg-teal-700 text-white hover:bg-teal-800'
                                    : 'bg-teal-600 text-white hover:bg-teal-700'
                                    }`}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white border-slate-200/50 hover:border-emerald-300/50'
                            : 'bg-slate-800 border-slate-600/50 hover:border-emerald-500/50'
                            }`}>
                            <div className="absolute top-3 left-3 z-10">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme === 'light' ? 'bg-amber-100 text-amber-700' : 'bg-amber-800 text-amber-200'
                                    }`}>Trending</span>
                            </div>
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="/images/plants/plant3.jpg"
                                    alt="Fiddle Leaf Fig"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                    }`}>Fiddle Leaf Fig</h3>
                                <p className={`text-sm mb-3 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                    }`}>Statement plant for large spaces</p>
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`text-xl font-bold ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                        }`}>$85</div>
                                    <div className="flex items-center text-yellow-500 text-sm">
                                        ⭐⭐⭐⭐⭐ <span className={`ml-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                                            }`}>(674)</span>
                                    </div>
                                </div>
                                <button className={`w-full py-2 rounded-lg font-medium text-sm transition-colors duration-300 ${theme === 'light'
                                    ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    }`}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${theme === 'light'
                            ? 'bg-white border-slate-200/50 hover:border-purple-300/50'
                            : 'bg-slate-800 border-slate-600/50 hover:border-purple-500/50'
                            }`}>
                            <div className="absolute top-3 left-3 z-10">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme === 'light' ? 'bg-purple-100 text-purple-700' : 'bg-purple-800 text-purple-200'
                                    }`}>Easy Care</span>
                            </div>
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="/images/plants/plant4.jpg"
                                    alt="Succulent Collection"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                    }`}>Succulent Collection</h3>
                                <p className={`text-sm mb-3 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                    }`}>Perfect starter set for beginners</p>
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`text-xl font-bold ${theme === 'light' ? 'text-purple-700' : 'text-purple-400'
                                        }`}>$28</div>
                                    <div className="flex items-center text-yellow-500 text-sm">
                                        ⭐⭐⭐⭐⭐ <span className={`ml-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                                            }`}>(1,156)</span>
                                    </div>
                                </div>
                                <button className={`w-full py-2 rounded-lg font-medium text-sm transition-colors duration-300 ${theme === 'light'
                                    ? 'bg-purple-700 text-white hover:bg-purple-800'
                                    : 'bg-purple-600 text-white hover:bg-purple-700'
                                    }`}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeIn" delay={500}>
                    <div className="text-center mt-10">
                        <button className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer ${theme === 'light'
                            ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}>
                            View All Products
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
