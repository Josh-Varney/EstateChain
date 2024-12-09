// pages/CaseStudiesPage.tsx
import React from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import LandingHeaderComponent from './components/case-header';
import HeroSection from './components/case-hero';
import IntroductionSection from './components/case-intro';
import StatisticsSection from './components/case-stats';
import CaseStudiesSection from './components/case-section';
import CTASection from './components/case-cta';
import FooterComponent from './components/case-foot';

const CaseStudiesPage: React.FC = () => {
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-t from-gray-800 to-gray-900 text-gray-100 flex flex-col">
            <LandingHeaderComponent />
            <HeroSection />
            <hr className="border-gray-500 border-1 w-screen" />
            <main className="container mx-auto px-6 md:px-12 py-16 flex-grow">
                <IntroductionSection />
                <StatisticsSection />
                <CaseStudiesSection />
                <CTASection />
            </main>
            <hr className="border-gray-500 border-1 w-screen" />
            <FooterComponent />
        </div>
    );
};

export default CaseStudiesPage;
