import React from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import LandingHeader from '../../components/header/header';
import LandingSubscription from '../../components/footer/footer';

const CaseStudiesPage: React.FC = () => {
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 flex flex-col">
            {/* Header */}
            <header>
                <LandingHeader />
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-800 text-white py-20 shadow-lg">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h1
                        className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg"
                        data-aos="fade-down"
                    >
                        Tokenization in Real Estate
                    </h1>
                    <p
                        className="mt-4 text-lg md:text-2xl font-light tracking-wide"
                        data-aos="fade-up"
                    >
                        Revolutionizing property investments with blockchain technology.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-6 md:px-12 py-16 flex-grow">
                {/* Introduction Section */}
                <section className="mb-20 text-center" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-blue-400 mb-6 tracking-tight">
                        What is Tokenization?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        Tokenization transforms real estate assets into digital tokens that represent ownership. This 
                        innovation brings unprecedented accessibility, liquidity, and transparency to the real estate market.
                    </p>
                </section>

                {/* Statistics Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" data-aos="fade-up">
                        <div className="bg-gray-800 shadow-xl rounded-lg p-8">
                            <h3 className="text-5xl font-bold text-blue-400">85%</h3>
                            <p className="text-gray-300 mt-4">Funding Success Rate</p>
                        </div>
                        <div className="bg-gray-800 shadow-xl rounded-lg p-8">
                            <h3 className="text-5xl font-bold text-green-400">$10M</h3>
                            <p className="text-gray-300 mt-4">Funds Raised</p>
                        </div>
                        <div className="bg-gray-800 shadow-xl rounded-lg p-8">
                            <h3 className="text-5xl font-bold text-purple-400">6 Months</h3>
                            <p className="text-gray-300 mt-4">To Liquidity</p>
                        </div>
                    </div>
                </section>

                {/* Case Studies Section */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-purple-400 mb-12 text-center tracking-wide" data-aos="fade-up">
                        Real-World Applications
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Case Study 1 */}
                        <div
                            className="p-8 bg-gray-800 shadow-2xl rounded-xl transform hover:scale-105 transition-transform duration-300"
                            data-aos="fade-right"
                        >
                            <h3 className="text-2xl font-bold text-blue-400 mb-4">Urban Realty Partners</h3>
                            <p className="text-gray-300 mb-4">
                                <strong>Challenge:</strong> High entry barriers for investors due to large property values.
                            </p>
                            <p className="text-gray-300 mb-4">
                                <strong>Solution:</strong> Fractional ownership via blockchain tokens worth as little as $500, 
                                democratizing access to real estate investment.
                            </p>
                            <p className="text-gray-300">
                                <strong>Result:</strong> Raised $10M in funding, achieving liquidity in just six months.
                            </p>
                        </div>

                        {/* Case Study 2 */}
                        <div
                            className="p-8 bg-gray-800 shadow-2xl rounded-xl transform hover:scale-105 transition-transform duration-300"
                            data-aos="fade-left"
                        >
                            <h3 className="text-2xl font-bold text-green-400 mb-4">GreenSpaces Ventures</h3>
                            <p className="text-gray-300 mb-4">
                                <strong>Challenge:</strong> Difficulty securing funding for eco-friendly commercial spaces.
                            </p>
                            <p className="text-gray-300 mb-4">
                                <strong>Solution:</strong> Blockchain tokens enabled small-scale investors to fund green 
                                office projects.
                            </p>
                            <p className="text-gray-300">
                                <strong>Result:</strong> Funded 85% of the project in just three months, ensuring transparency 
                                for investors.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 text-center rounded-xl shadow-lg"
                    data-aos="zoom-in"
                >
                    <h2 className="text-4xl font-bold mb-4">Learn More About Real Estate Tokenization</h2>
                    <p className="text-lg font-light mb-6">
                        Dive deeper into the world of blockchain-powered real estate investments.
                    </p>
                    <a
                        href="#"
                        className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        Get Started
                    </a>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-b from-gray-800 to-gray-900 py-12">
                <LandingSubscription />
            </footer>
        </div>
    );
};

export default CaseStudiesPage;
