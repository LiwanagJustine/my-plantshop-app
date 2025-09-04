import HeaderSection from '../components/sections/HeaderSection';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import FooterSection from '../components/sections/FooterSection';
import LoadingWrapper from '../components/LoadingWrapper';

export default function Home() {
    return (
        <LoadingWrapper>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
                <HeaderSection />

                <div className="main-container">
                    <HeroSection />
                    <AboutSection />
                    <BestSellersSection />
                    <FeaturesSection />
                    <CategoriesSection />
                    <NewsletterSection />
                    <FooterSection />
                </div>
            </div>
        </LoadingWrapper>
    );
}

