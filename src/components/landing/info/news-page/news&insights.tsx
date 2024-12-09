import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingHeader from '../../components/header/header';
import LandingSubscription from '../../components/footer/footer';
import HeroSection from './components/n&i-hero';
import WhyInsightsMatterSection from './components/n&i-matter';
import LatestNewsSection from './components/n&i-latest';
import FeaturedStoriesSection from './components/n&i-featured';

const NewsInsightsPage: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1200, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 flex flex-col min-h-screen">
            <header>
                <LandingHeader />
            </header>
            <HeroSection />
            <LatestNewsSection />
            <FeaturedStoriesSection />
            <WhyInsightsMatterSection />
            <footer className="bg-gradient-to-b from-gray-800 to-gray-900 py-10">
                <LandingSubscription />
            </footer>
        </div>
    );
};

export default NewsInsightsPage;
