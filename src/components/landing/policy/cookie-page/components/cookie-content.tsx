import React from 'react';

interface ContentSectionProps {
    expandedSection: string | null;
    toggleSection: (section: string) => void;
}

const sections = [
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
];

const ContentSection: React.FC<ContentSectionProps> = ({ expandedSection, toggleSection }) => (
    <main className="max-w-7xl mx-auto py-10 px-6 space-y-8">
        {sections.map(({ title, id, content }) => (
            <section key={id} data-aos="fade-up">
                <div
                    role="button"
                    aria-expanded={expandedSection === id}
                    tabIndex={0}
                    onClick={() => toggleSection(id)}
                    onKeyPress={(e) => e.key === 'Enter' && toggleSection(id)}
                    className={`cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 ${
                        expandedSection === id ? 'border-l-4 border-teal-600' : ''
                    }`}
                >
                    <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 flex justify-between items-center">
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
);

export default ContentSection;
