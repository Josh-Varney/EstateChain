import React from 'react';

const CookiePolicyPage: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-blue-600 text-white py-16 px-8 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight">Cookie Policy</h1>
                <p className="mt-4 text-lg">
                    Learn about our use of cookies, their purpose, and how you can manage them.
                </p>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-12 px-6 space-y-12">
                {/* What Are Cookies? */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">What Are Cookies?</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        Cookies are small text files stored on your device when you visit a website. They are widely used to make websites
                        work efficiently, improve user experience, and provide website owners with useful insights.
                    </p>
                </section>

                {/* Types of Cookies */}
                <section className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Types of Cookies We Use</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        We use different types of cookies to enhance your browsing experience:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly.</li>
                        <li><strong>Performance Cookies:</strong> These cookies help us understand how users interact with our website by
                            collecting anonymous data.
                        </li>
                        <li><strong>Functionality Cookies:</strong> These cookies allow us to remember your preferences and settings.</li>
                        <li><strong>Advertising Cookies:</strong> These cookies are used to deliver relevant advertisements to you.</li>
                    </ul>
                </section>

                {/* Why We Use Cookies */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Why We Use Cookies</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        We use cookies for various purposes, such as:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Ensuring the website functions correctly and securely.</li>
                        <li>Improving your browsing experience by remembering your preferences.</li>
                        <li>Analyzing website traffic and performance to optimize our content.</li>
                        <li>Providing personalized advertisements based on your interests.</li>
                    </ul>
                </section>

                {/* Managing Cookies */}
                <section className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Managing Cookies</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        You have the right to manage your cookie preferences. Here’s how you can do it:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>
                            <strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings.
                            Refer to your browser's help section for guidance.
                        </li>
                        <li>
                            <strong>Cookie Consent Banner:</strong> When visiting our website, you can use the cookie consent banner to
                            customize your preferences.
                        </li>
                        <li>
                            <strong>Third-Party Tools:</strong> Some third-party tools allow you to opt-out of targeted advertisements.
                        </li>
                    </ul>
                </section>

                {/* Third-Party Cookies */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Third-Party Cookies</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        We may allow third-party services to place cookies on your device. These cookies are subject to the privacy policies
                        of the respective third parties. Examples include analytics providers (e.g., Google Analytics) and advertising
                        platforms.
                    </p>
                </section>

                {/* Updates to This Policy */}
                <section className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Updates to This Policy</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        We may update this Cookie Policy periodically to reflect changes in technology, legislation, or our business
                        practices. Any updates will be posted on this page with the revision date.
                    </p>
                </section>

                {/* Contact Us */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Contact Us</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        If you have any questions about this Cookie Policy, please contact us:
                    </p>
                    <address className="mt-4 text-gray-700 dark:text-gray-300">
                        <strong>Email:</strong> <a href="mailto:support@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@example.com</a> <br />
                        <strong>Address:</strong> 123 Cookie Lane, Webtown, WT 56789
                    </address>
                </section>
            </main>
        </div>
    );
};

export default CookiePolicyPage;
