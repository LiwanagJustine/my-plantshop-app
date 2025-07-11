'use client';

import { useTheme } from '../../context/ThemeContext';
import AnimatedSection from '../ui/AnimatedSection';

export default function AboutSection() {
    const { theme } = useTheme();

    return (
        <section className="about-section py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <AnimatedSection animation="slideInLeft">
                        <div className="space-y-6">
                            <h2 className={`text-3xl lg:text-4xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'
                                }`}>
                                About <span className={`${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                    }`}>Our Shop</span>
                            </h2>
                            <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                }`}>
                                We&apos;re passionate plant enthusiasts dedicated to bringing nature into your home.
                                With over 5 years of experience, we carefully curate the finest plants from trusted
                                growers worldwide.
                            </p>
                            <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                }`}>
                                Our mission is simple: help you create beautiful, thriving indoor gardens that
                                improve your wellbeing and transform your living spaces.
                            </p>
                            <button className={`inline-flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer ${theme === 'light'
                                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}>
                                Learn More About Us
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection animation="slideInRight" delay={200}>
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-60 ${theme === 'light' ? 'bg-emerald-200/20' : 'bg-emerald-600/10'
                                }`}></div>
                            <div className={`relative rounded-3xl overflow-hidden border group ${theme === 'light' ? 'border-emerald-200/30' : 'border-emerald-600/20'
                                }`}>
                                <img
                                    src="/images/plants/plant12.jpg"
                                    alt="Beautiful indoor plants collection showcasing our expertise"
                                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
