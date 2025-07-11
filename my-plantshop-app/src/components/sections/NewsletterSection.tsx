'use client';

import { useTheme } from '../../context/ThemeContext';

export default function NewsletterSection() {
    const { theme } = useTheme();

    return (
        <section className="newsletter-section py-16">
            <div className="max-w-4xl mx-auto text-center px-4">
                <div className="mb-8">
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-white' : 'text-slate-200'
                        }`}>
                        Get <span className={`${theme === 'light' ? 'text-emerald-400' : 'text-emerald-300'
                            }`}>Plant Care Tips</span> Weekly
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-slate-300' : 'text-slate-400'
                        }`}>
                        Join 10,000+ plant lovers receiving expert care tips, seasonal advice, and exclusive offers
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-300 ${theme === 'light'
                                    ? 'text-slate-700 bg-white/95 border-white/20 placeholder-slate-400'
                                    : 'text-slate-200 bg-slate-800/95 border-slate-600/50 placeholder-slate-500'
                                }`}
                            aria-label="Email for newsletter"
                        />
                        <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer ${theme === 'light'
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600'
                            }`}>
                            Subscribe
                        </button>
                    </div>
                    <p className={`text-xs mt-3 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                        No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                </div>
            </div>
        </section>
    );
}
