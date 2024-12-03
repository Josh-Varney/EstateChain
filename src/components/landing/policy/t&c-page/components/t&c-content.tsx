import React from 'react';

interface ContentSectionProps {
    expandedSection: string | null;
    toggleSection: (section: string) => void;
}

const sections = [
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
];

const ContentSection: React.FC<ContentSectionProps> = ({ expandedSection, toggleSection }) => (
    <main className="max-w-7xl mx-auto py-10 px-6 space-y-10">
        {sections.map(({ title, id, content }) => (
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
);

export default ContentSection;
