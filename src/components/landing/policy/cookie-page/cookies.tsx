import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingHeader from '../../components/header/header';
import LandingSubscription from '../../components/footer/footer';

const CookiePolicyPage: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
            {/* Header */}
            <header>
                <LandingHeader />
            </header>

            {/* Breadcrumb Navigation */}
            <nav
                className="text-sm text-gray-500 dark:text-gray-400 py-4 px-6 max-w-7xl mx-auto"
                data-aos="fade-down"
            >
                <a href="/" className="hover:underline">Home</a> / <span>Cookie Policy</span>
            </nav>

            {/* Hero Section */}
            <div className="text-white py-10" data-aos="fade-up">
                <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold">Cookie Policy</h1>
                    <p className="text-gray-500 text-md mt-4">
                        Learn about our use of cookies, their purpose, and how you can manage them.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-10 px-6 space-y-10">
                {[
                    {
                        title: 'What Are Cookies?',
                        id: 'whatAreCookies',
                        content: (
                            <p>
                                Cookies are small text files stored on your device when you visit a website. They are widely used to make
                                websites work efficiently, improve user experience, and provide website owners with insights.
                            </p>
                        ),
                    },
                    {
                        title: 'Types of Cookies We Use',
                        id: 'typesOfCookies',
                        content: (
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
                                <li><strong>Performance Cookies:</strong> Help us understand how users interact with our website.</li>
                                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings.</li>
                                <li><strong>Advertising Cookies:</strong> Deliver relevant advertisements to you.</li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Why We Use Cookies',
                        id: 'whyUseCookies',
                        content: (
                            <ul className="list-disc list-inside space-y-2">
                                <li>Ensuring the website functions correctly and securely.</li>
                                <li>Improving your browsing experience by remembering preferences.</li>
                                <li>Analyzing website traffic and performance to optimize content.</li>
                                <li>Providing personalized advertisements based on interests.</li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Managing Cookies',
                        id: 'managingCookies',
                        content: (
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    <strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies.
                                </li>
                                <li>
                                    <strong>Cookie Consent Banner:</strong> Customize preferences using our consent banner.
                                </li>
                                <li>
                                    <strong>Third-Party Tools:</strong> Opt-out of targeted advertisements through third-party tools.
                                </li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Third-Party Cookies',
                        id: 'thirdPartyCookies',
                        content: (
                            <p>
                                We may allow third-party services to place cookies on your device, subject to their privacy policies.
                                Examples include analytics providers (e.g., Google Analytics) and advertising platforms.
                            </p>
                        ),
                    },
                    {
                        title: 'Updates to This Policy',
                        id: 'updatesPolicy',
                        content: (
                            <p>
                                This Cookie Policy may be updated periodically to reflect changes in technology, legislation, or business
                                practices. Updates will be posted on this page with the revision date.
                            </p>
                        ),
                    },
                    {
                        title: 'Contact Us',
                        id: 'contactUs',
                        content: (
                            <address>
                                <p>
                                    If you have any questions, please contact us at:
                                </p>
                                <p>
                                    <strong>Email:</strong> <a href="mailto:support@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@example.com</a><br />
                                    <strong>Address:</strong> 123 Cookie Lane, Webtown, WT 56789
                                </p>
                            </address>
                        ),
                    },
                ].map(({ title, id, content }) => (
                    <section key={id}>
                        <div
                            role="button"
                            aria-expanded={expandedSection === id}
                            tabIndex={0}
                            onClick={() => toggleSection(id)}
                            onKeyPress={(e) => e.key === 'Enter' && toggleSection(id)}
                            data-aos="fade-up"
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
            <hr className="border-gray-500 border-1 mt-12 mb-16 w-screen" />
            <section>
                <LandingSubscription />
                <div className="pb-12 dark:bg-gray-900"></div>
            </section>
        </div>
    );
};

export default CookiePolicyPage;
