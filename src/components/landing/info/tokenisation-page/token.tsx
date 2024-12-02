import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BlockchainRealEstate: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            {/* Hero Section */}
            <header
                className="relative bg-gradient-to-b from-blue-600 to-blue-400 text-white py-20 px-8 text-center"
                data-aos="fade-down"
            >
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Blockchain in Real Estate
                </h1>
                <p className="mt-6 text-lg max-w-3xl mx-auto">
                    Learn how blockchain is transforming real estate through tokenization, enhanced transparency, automation, and accessibility.
                </p>
                <button
                    className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                >
                    Explore More
                </button>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-10">
                    <img
                        src="/path-to-real-estate-image.png"
                        alt="Blockchain in Real Estate"
                        className="w-full max-w-lg"
                        data-aos="zoom-in"
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-12 px-6 space-y-16">
                {/* What is Blockchain in Real Estate? */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                        What is Blockchain in Real Estate?
                    </h2>
                    <p className="mt-6 text-gray-700 dark:text-gray-300">
                        Blockchain is a decentralized ledger technology that records transactions securely and transparently. In real estate, it enables property tokenization, smart contracts, immutable ownership records, and efficient financing models.
                    </p>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        Tokenization divides real estate assets into digital tokens, each representing a fractional share of ownership. These tokens can be traded securely, opening new opportunities for global investors.
                    </p>
                    <div className="mt-6">
                        <img
                            src="/path-to-diagram.png"
                            alt="Blockchain Real Estate Overview"
                            className="rounded-lg shadow-lg mx-auto"
                            data-aos="zoom-in"
                        />
                        <p className="mt-4 text-gray-500 text-sm text-center">
                            Diagram: How blockchain transforms real estate transactions.
                        </p>
                    </div>
                </section>

                {/* Benefits of Blockchain in Real Estate */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                        Key Benefits of Blockchain in Real Estate
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        {[
                            {
                                title: 'Tokenization of Assets',
                                description:
                                    'Divide high-value properties into tokens for fractional ownership, enabling greater investor participation.',
                            },
                            {
                                title: 'Enhanced Liquidity',
                                description:
                                    'Trade tokenized real estate on blockchain platforms, creating liquidity for traditionally illiquid assets.',
                            },
                            {
                                title: 'Improved Transparency',
                                description:
                                    'Immutable blockchain ledgers ensure every transaction is secure, verified, and tamper-proof.',
                            },
                            {
                                title: 'Cost Efficiency',
                                description:
                                    'Reduce transaction costs through automation, eliminating intermediaries and manual processes.',
                            },
                            {
                                title: 'Faster Transactions',
                                description:
                                    'Smart contracts automate agreements and payments, significantly reducing transaction times.',
                            },
                            {
                                title: 'Global Accessibility',
                                description:
                                    'Open the market to global investors, bypassing geographical and regulatory barriers.',
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow hover:shadow-lg transition"
                                data-aos="zoom-in"
                            >
                                <h3 className="text-lg font-medium">{benefit.title}</h3>
                                <p className="mt-4 text-gray-700 dark:text-gray-300">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Blockchain Use Cases */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                        Real Estate Use Cases for Blockchain
                    </h2>
                    <p className="mt-6 text-gray-700 dark:text-gray-300">
                        Blockchain technology offers transformative use cases in real estate. Here’s how it’s shaping the industry:
                    </p>
                    <ul className="mt-6 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-4">
                        <li><strong>Tokenization:</strong> Fractionalize ownership of real estate for easier investment opportunities.</li>
                        <li><strong>Smart Contracts:</strong> Automate rental agreements, payments, and regulatory compliance.</li>
                        <li><strong>Immutable Land Registries:</strong> Store property deeds securely and eliminate fraudulent activities.</li>
                        <li><strong>Loan and Mortgage Securitization:</strong> Simplify underwriting, reduce processing times, and ensure transparency.</li>
                        <li><strong>Property Management:</strong> Streamline operations, rental collection, and maintenance scheduling.</li>
                        <li><strong>Urban Planning:</strong> Use blockchain for collaborative planning with community input and token-based incentives.</li>
                    </ul>
                </section>

                {/* Who Benefits? */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                        Who Benefits from Blockchain in Real Estate?
                    </h2>
                    <p className="mt-6 text-gray-700 dark:text-gray-300">
                        Blockchain technology offers advantages tailored to investors, property owners, and developers:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        {[
                            {
                                title: 'Investors',
                                benefits: [
                                    'Access to fractional ownership opportunities.',
                                    'Enhanced liquidity through tokenized marketplaces.',
                                    'Transparent and secure ownership records.',
                                    'Diverse global investment opportunities.',
                                ],
                            },
                            {
                                title: 'Property Owners',
                                benefits: [
                                    'Streamlined rental payments and tenant management.',
                                    'Automated contracts for reduced administrative work.',
                                    'Higher operational efficiency and cost savings.',
                                    'Expanded financing options through tokenization.',
                                ],
                            },
                            {
                                title: 'Developers',
                                benefits: [
                                    'Simplified access to global funding sources.',
                                    'Faster and more transparent project financing.',
                                    'Automated workflows for project management.',
                                    'Stronger community engagement through tokenized participation.',
                                ],
                            },
                        ].map((group, index) => (
                            <div
                                key={index}
                                className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow hover:shadow-lg transition"
                                data-aos="zoom-in"
                            >
                                <h3 className="text-lg font-medium">{group.title}</h3>
                                <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                    {group.benefits.map((benefit, i) => (
                                        <li key={i}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Interactive FAQ */}
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                        Frequently Asked Questions (FAQs)
                    </h2>
                    <div className="mt-6 space-y-4">
                        {[
                            {
                                question: 'What is real estate tokenization?',
                                answer: 'Real estate tokenization involves creating digital tokens that represent ownership shares of a property, enabling easier and secure trading on blockchain platforms.',
                            },
                            {
                                question: 'How does blockchain improve property management?',
                                answer: 'Blockchain simplifies rent collection, payment tracking, and maintenance scheduling while ensuring secure data sharing.',
                            },
                            {
                                question: 'What are the risks of blockchain in real estate?',
                                answer: 'While blockchain offers immense benefits, challenges include regulatory uncertainty, technical complexity, and adoption resistance.',
                            },
                        ].map((faq, index) => (
                            <details key={index} className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                                <summary className="cursor-pointer text-lg font-medium">{faq.question}</summary>
                                <p className="mt-4 text-gray-700 dark:text-gray-300">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Call-to-Action */}
                <section className="text-center py-16 px-8 bg-blue-600 text-white rounded-lg" data-aos="fade-up">
                    <h2 className="text-4xl font-semibold">Transform Your Real Estate Investments</h2>
                    <p className="mt-4 text-lg">
                        Learn how blockchain and tokenization can revolutionize your investment strategies.
                    </p>
                    <button className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200">
                        Get Started
                    </button>
                </section>

                {/* Resources */}
                <section
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                        Learn More
                    </h2>
                    <ul className="mt-6 space-y-4">
                        <li>
                            <a
                                href="https://www.pcisecuritystandards.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                PCI DSS Standards
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://ethereum.org/en/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Ethereum Blockchain Basics
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://consensys.net/blockchain-use-cases/real-estate/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Real Estate on Blockchain by ConsenSys
                            </a>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default BlockchainRealEstate;
