import React, { useState } from 'react';

const PrivacyPolicyPage: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-blue-600 text-white py-16 px-8 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
                <p className="mt-4 text-lg">
                    Your privacy is our priority. Learn how we handle your personal data with care and responsibility.
                </p>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-12 px-6 space-y-8">
                {/* Introduction */}
                <section>
                    <div
                        className="cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
                        onClick={() => toggleSection('introduction')}
                    >
                        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                            Introduction
                        </h2>
                        {expandedSection === 'introduction' && (
                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                This Privacy Policy explains our policies regarding the collection, use, and disclosure of your personal
                                information. By using our services, you agree to the terms of this policy.
                            </p>
                        )}
                    </div>
                </section>

                {/* Data Sharing */}
                <section>
                    <div
                        className="cursor-pointer bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6"
                        onClick={() => toggleSection('dataSharing')}
                    >
                        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                            Data Sharing
                        </h2>
                        {expandedSection === 'dataSharing' && (
                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                We do not sell your personal information. However, we may share your data in the following cases:
                            </p>
                        )}
                        {expandedSection === 'dataSharing' && (
                            <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                <li><strong>With Service Providers:</strong> To provide services on our behalf (e.g., hosting, analytics).</li>
                                <li><strong>For Legal Obligations:</strong> To comply with applicable laws or protect our legal rights.</li>
                                <li><strong>In Business Transfers:</strong> During mergers, acquisitions, or sale of assets.</li>
                            </ul>
                        )}
                    </div>
                </section>

                {/* Children's Privacy */}
                <section>
                    <div
                        className="cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
                        onClick={() => toggleSection('childrensPrivacy')}
                    >
                        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                            Children's Privacy
                        </h2>
                        {expandedSection === 'childrensPrivacy' && (
                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal
                                information from children. If we become aware of such data, we will take immediate steps to delete it.
                            </p>
                        )}
                    </div>
                </section>

                {/* International Transfers */}
                <section>
                    <div
                        className="cursor-pointer bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6"
                        onClick={() => toggleSection('internationalTransfers')}
                    >
                        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                            International Data Transfers
                        </h2>
                        {expandedSection === 'internationalTransfers' && (
                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                If you access our services from outside our operational region, your data may be transferred internationally.
                                We ensure compliance with applicable laws and implement measures like data encryption and secure protocols
                                to protect your information during these transfers.
                            </p>
                        )}
                    </div>
                </section>

                {/* Security */}
                <section>
                    <div
                        className="cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
                        onClick={() => toggleSection('security')}
                    >
                        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                            Security Measures
                        </h2>
                        {expandedSection === 'security' && (
                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                We implement industry-standard measures to safeguard your data, including:
                            </p>
                        )}
                        {expandedSection === 'security' && (
                            <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                <li><strong>Encryption:</strong> Data encryption both in transit and at rest.</li>
                                <li><strong>Access Control:</strong> Limiting data access to authorized personnel.</li>
                                <li><strong>Monitoring:</strong> Continuous monitoring of our systems to detect and prevent threats.</li>
                            </ul>
                        )}
                    </div>
                </section>

                {/* Updates to the Privacy Policy */}
                <section>
                    <div
                        className="cursor-pointer bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6"
                        onClick={() => toggleSection('policyUpdates')}
                    >
                        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                            Updates to This Privacy Policy
                        </h2>
                        {expandedSection === 'policyUpdates' && (
                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                We may update this Privacy Policy periodically to reflect changes in our practices or for legal
                                requirements. Changes will be notified on this page with an updated revision date. We encourage you to review
                                this policy regularly.
                            </p>
                        )}
                    </div>
                </section>

                {/* Footer CTA */}
                <footer className="bg-blue-600 text-white py-16 px-8 text-center">
                    <h2 className="text-4xl font-semibold">Have Questions?</h2>
                    <p className="mt-4 text-lg">
                        Contact us at <a href="mailto:support@example.com" className="underline">support@example.com</a> for assistance
                        regarding this Privacy Policy.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
