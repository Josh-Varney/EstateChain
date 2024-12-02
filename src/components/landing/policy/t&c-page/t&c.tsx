import React from 'react';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-blue-600 text-white py-16 px-8 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight">Terms of Service</h1>
                <p className="mt-4 text-lg">
                    These terms outline the rules and regulations for using our platform and services. Please read them carefully.
                </p>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-12 px-6 space-y-12">
                {/* Introduction */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Introduction</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree with any
                        part of these terms, you must not use our services. These terms are legally binding and apply to all users.
                    </p>
                </section>

                {/* Eligibility */}
                <section className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Eligibility</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        To use our platform, you must:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Be at least 18 years old or the age of majority in your jurisdiction.</li>
                        <li>Provide accurate and truthful information during registration.</li>
                        <li>Not be prohibited from using our services under applicable laws.</li>
                    </ul>
                </section>

                {/* User Obligations */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">User Obligations</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        As a user of our platform, you agree to:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Comply with all applicable local, national, and international laws and regulations.</li>
                        <li>Use our platform only for lawful purposes and in a manner consistent with these terms.</li>
                        <li>Maintain the confidentiality of your account credentials and notify us immediately of any unauthorized access.</li>
                        <li>Not use the platform for any fraudulent, harmful, or malicious activities.</li>
                    </ul>
                </section>

                {/* Prohibited Activities */}
                <section className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Prohibited Activities</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        You are strictly prohibited from:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Engaging in activities that violate any applicable laws or regulations.</li>
                        <li>Uploading, transmitting, or distributing malicious software, viruses, or harmful code.</li>
                        <li>Attempting to gain unauthorized access to our systems, data, or user accounts.</li>
                        <li>Engaging in harassment, discrimination, or any abusive behavior towards other users or our staff.</li>
                        <li>Using the platform to infringe upon the intellectual property rights of others.</li>
                    </ul>
                </section>

                {/* Payment Terms */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Payment Terms</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        If you make purchases or subscribe to paid services on our platform:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>All payments must be made in accordance with the prices and terms listed at the time of purchase.</li>
                        <li>You agree to provide valid and current payment information.</li>
                        <li>We reserve the right to suspend or terminate your access for non-payment or chargebacks.</li>
                    </ul>
                </section>

                {/* Intellectual Property */}
                <section className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Intellectual Property</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        All content on this platform, including text, graphics, logos, and software, is the intellectual property of our
                        company or our licensors. You may not reproduce, distribute, or create derivative works without our explicit
                        permission.
                    </p>
                </section>

                {/* Privacy and Data Protection */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Privacy and Data Protection</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        Your use of the platform is subject to our Privacy Policy, which explains how we collect, use, and protect your
                        personal data. By using the platform, you consent to the collection and use of your data in accordance with the
                        Privacy Policy.
                    </p>
                </section>

                {/* Limitation of Liability */}
                <section className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Limitation of Liability</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        To the fullest extent permitted by law, we are not liable for:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Any indirect, incidental, or consequential damages arising from your use of the platform.</li>
                        <li>Loss of data, revenue, or profits.</li>
                        <li>Errors, interruptions, or failures of the platform.</li>
                    </ul>
                </section>

                {/* Termination */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Termination</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        We reserve the right to terminate or suspend your access to the platform at any time, for any reason, including
                        breach of these Terms of Service.
                    </p>
                </section>

                {/* Governing Law */}
                <section className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Governing Law</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes will be
                        resolved exclusively in the courts of [Your Jurisdiction].
                    </p>
                </section>

                {/* Contact Information */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Contact Us</h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        If you have any questions or concerns about these Terms of Service, you can contact us at:
                    </p>
                    <address className="mt-4 text-gray-700 dark:text-gray-300">
                        <strong>Email:</strong> <a href="mailto:support@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@example.com</a> <br />
                        <strong>Address:</strong> 123 Terms Lane, Legal City, LC 12345
                    </address>
                </section>
            </main>
        </div>
    );
};

export default TermsOfServicePage;
