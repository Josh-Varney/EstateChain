import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingHeader from '../../components/header/header';
import LandingSubscription from '../../components/footer/footer';

const PrivacyPolicyPage: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

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
                <a href="/" className="hover:underline">Home</a> / <span>Privacy Policy</span>
            </nav>

            {/* Hero Section */}
            <div className="text-white py-12" data-aos="fade-up">
                <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold">Your Privacy Is Our Priority</h1>
                    <p className="text-gray-500 text-md mt-4">
                        We are committed to protecting your personal data and ensuring transparency in how we handle it.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-4 px-6 space-y-8">
                {[
                    {
                        title: 'Introduction',
                        id: 'introduction',
                        content: (
                            <p>
                                This Privacy Policy explains our policies regarding the collection, use, and disclosure of your personal
                                information. By using our services, you agree to the terms of this policy.
                            </p>
                        ),
                    },
                    {
                        title: 'Data Sharing',
                        id: 'dataSharing',
                        content: (
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>With Service Providers:</strong> To provide services on our behalf (e.g., hosting, analytics).</li>
                                <li><strong>For Legal Obligations:</strong> To comply with applicable laws or protect our legal rights.</li>
                                <li><strong>In Business Transfers:</strong> During mergers, acquisitions, or sale of assets.</li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Children\'s Privacy',
                        id: 'childrensPrivacy',
                        content: (
                            <p>
                                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal
                                information from children. If we become aware of such data, we will take immediate steps to delete it.
                            </p>
                        ),
                    },
                    {
                        title: 'International Transfers',
                        id: 'internationalTransfers',
                        content: (
                            <p>
                                If you access our services from outside our operational region, your data may be transferred internationally.
                                We ensure compliance with applicable laws and implement measures like data encryption and secure protocols
                                to protect your information during these transfers.
                            </p>
                        ),
                    },
                    {
                        title: 'Security Measures',
                        id: 'security',
                        content: (
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Encryption:</strong> Data encryption both in transit and at rest.</li>
                                <li><strong>Access Control:</strong> Limiting data access to authorized personnel.</li>
                                <li><strong>Monitoring:</strong> Continuous monitoring of our systems to detect and prevent threats.</li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Updates to This Privacy Policy',
                        id: 'policyUpdates',
                        content: (
                            <p>
                                We may update this Privacy Policy periodically to reflect changes in our practices or for legal
                                requirements. Changes will be notified on this page with an updated revision date. We encourage you to review
                                this policy regularly.
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

export default PrivacyPolicyPage;
