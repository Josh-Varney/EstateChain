import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingHeader from '../../components/header/header';
import LandingSubscription from '../../components/footer/footer';

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

            {/* Breadcrumb Navigation */}
            <nav
                className="text-sm text-gray-500 dark:text-gray-400 py-4 px-6 max-w-7xl mx-auto"
                data-aos="fade-right"
            >
                <a href="/" className="hover:underline">Home</a> / <span>Terms & Conditions</span>
            </nav>

            {/* Hero Section */}
            <div className="text-white py-10" data-aos="fade-up">
                <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold">Terms & Conditions</h1>
                    <p className="text-gray-500 text-md mt-4">
                        Please read these terms carefully before using our platform.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-10 px-6 space-y-10">
                {[
                    {
                        title: 'Introduction',
                        id: 'introduction',
                        content: (
                            <p>
                                By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree
                                with any part of these terms, you must not use our services.
                            </p>
                        ),
                    },
                    {
                        title: 'Eligibility',
                        id: 'eligibility',
                        content: (
                            <ul className="list-disc list-inside space-y-2">
                                <li>Be at least 18 years old or the age of majority in your jurisdiction.</li>
                                <li>Provide accurate and truthful information during registration.</li>
                                <li>Not be prohibited from using our services under applicable laws.</li>
                            </ul>
                        ),
                    },
                    {
                        title: 'User Obligations',
                        id: 'userObligations',
                        content: (
                            <ul className="list-disc list-inside space-y-2">
                                <li>Comply with all applicable laws and regulations.</li>
                                <li>Use our platform only for lawful purposes.</li>
                                <li>Maintain the confidentiality of your account credentials.</li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Prohibited Activities',
                        id: 'prohibitedActivities',
                        content: (
                            <ul className="list-disc list-inside space-y-2">
                                <li>Engaging in illegal activities or harassment.</li>
                                <li>Uploading malicious software or viruses.</li>
                                <li>Infringing intellectual property rights of others.</li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Limitation of Liability',
                        id: 'limitationLiability',
                        content: (
                            <p>
                                We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
                            </p>
                        ),
                    },
                ].map(({ title, id, content }) => (
                    <section key={id} data-aos="fade-up">
                        <div
                            role="button"
                            aria-expanded={expandedSection === id}
                            tabIndex={0}
                            onClick={() => toggleSection(id)}
                            onKeyPress={(e) => e.key === 'Enter' && toggleSection(id)}
                            className={`cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 ${
                                expandedSection === id ? 'border-l-4 border-blue-600' : ''
                            }`}
                        >
                            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 flex items-center">
                                <span>{title}</span>
                                <span className="ml-2">{expandedSection === id ? '-' : '+'}</span>
                            </h2>
                            <div
                                style={{
                                    maxHeight: expandedSection === id ? '500px' : '0',
                                    opacity: expandedSection === id ? '1' : '0',
                                }}
                                className="transition-all duration-300 overflow-hidden mt-4"
                            >
                                {content}
                            </div>
                        </div>
                    </section>
                ))}
            </main>

            {/* Footer */}
            <hr className="border-gray-500 border-1 mt-12 mb-16 w-screen" data-aos="fade-up" />
            <section data-aos="fade-in">
                <LandingSubscription />
                <div className="pb-12 dark:bg-gray-900"></div>
            </section>
        </div>
    );
};

export default TermsOfServicePage;
