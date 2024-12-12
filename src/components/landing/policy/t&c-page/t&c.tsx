import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingHeader from '../../components/header/header';
import Breadcrumb from './components/t&c-breadcrumb';
import HeroSection from './components/t&c-hero';
import ContentSection from './components/t&c-content';
import FooterSection from './components/t&c-footer';

const TermsOfServicePage: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            {/* Header */}
            <header data-aos="fade-down">
                <LandingHeader />
            </header>

            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Hero Section */}
            <HeroSection />

            {/* Content Section */}
            <ContentSection
                expandedSection={expandedSection}
                toggleSection={toggleSection}
            />

            {/* Footer */}
            <FooterSection />
        </div>
    );
};

export default TermsOfServicePage;
