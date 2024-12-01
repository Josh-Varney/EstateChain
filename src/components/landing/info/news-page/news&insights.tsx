import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const NewsInsightsPage: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1200, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div className="bg-gray-50 text-gray-900">
            {/* Hero Section */}
            <header className="relative bg-gradient-to-br from-purple-700 to-blue-500 text-white">
                <div className="container mx-auto px-6 md:px-12 py-16 text-center md:text-left flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2" data-aos="fade-right">
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            Insights that Drive Change
                        </h1>
                        <p className="mt-4 text-lg">
                            Explore the latest news and expert perspectives that shape the future of technology and
                            innovation.
                        </p>
                        <a
                            href="#latest-news"
                            className="mt-6 inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            Discover More
                        </a>
                    </div>
                    <div
                        className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
                        data-aos="fade-left"
                    >
                        <img
                            src="https://via.placeholder.com/500x300"
                            alt="Insights Illustration"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </header>

            {/* Latest News Section */}
            <section id="latest-news" className="py-16 bg-gray-100">
                <div className="container mx-auto px-6 md:px-12">
                    <h2
                        className="text-4xl font-bold text-blue-600 mb-10 text-center"
                        data-aos="fade-up"
                    >
                        Latest News
                    </h2>
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* News Item 1 */}
                        <div
                            className="p-6 bg-white shadow-md rounded-lg flex-1 hover:shadow-lg transition-shadow"
                            data-aos="fade-right"
                        >
                            <h3 className="text-xl font-semibold text-blue-500 mb-4">
                                Tokenization Trends in 2024
                            </h3>
                            <p className="text-gray-700">
                                Discover the latest innovations in blockchain tokenization and how it’s transforming
                                industries.
                            </p>
                            <a
                                href="#"
                                className="mt-4 inline-block text-blue-500 hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                        {/* News Item 2 */}
                        <div
                            className="p-6 bg-white shadow-md rounded-lg flex-1 hover:shadow-lg transition-shadow"
                            data-aos="fade-up"
                        >
                            <h3 className="text-xl font-semibold text-purple-500 mb-4">
                                How AI is Revolutionizing Data Security
                            </h3>
                            <p className="text-gray-700">
                                Explore how AI advancements are setting new standards in cybersecurity and protecting
                                critical systems.
                            </p>
                            <a
                                href="#"
                                className="mt-4 inline-block text-purple-500 hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expert Insights Section */}
            <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-50">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 items-center gap-12">
                        {/* Insights Content */}
                        <div data-aos="fade-right">
                            <h2 className="text-4xl font-bold text-purple-700 mb-6">
                                Expert Insights
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Gain exclusive knowledge from our industry leaders, tackling the biggest challenges and
                                opportunities in innovation.
                            </p>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <div className="text-blue-600 mr-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    Blockchain: The Future of Trust
                                </li>
                                <li className="flex items-start">
                                    <div className="text-purple-600 mr-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    The Role of AI in Modern Analytics
                                </li>
                                <li className="flex items-start">
                                    <div className="text-green-600 mr-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    Overcoming Industry Challenges
                                </li>
                            </ul>
                        </div>
                        {/* Insights Illustration */}
                        <div data-aos="fade-left" className="flex justify-center">
                            <img
                                src="https://via.placeholder.com/400x300"
                                alt="Expert Insights"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 text-white text-center">
                <div className="container mx-auto px-6 md:px-12">
                    <h2
                        className="text-4xl font-bold mb-6"
                        data-aos="fade-up"
                    >
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-lg font-light max-w-xl mx-auto mb-8">
                        Stay ahead of the curve with exclusive updates on industry news and expert opinions.
                    </p>
                    <a
                        href="#"
                        className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        data-aos="fade-up"
                    >
                        Subscribe Now
                    </a>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <p className="text-sm md:text-base">
                        &copy; {new Date().getFullYear()} Innovation Insights. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default NewsInsightsPage;
