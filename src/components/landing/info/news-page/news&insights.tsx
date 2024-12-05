import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import LandingHeader from '../../components/header/header';
import LandingSubscription from '../../components/footer/footer';

const NewsInsightsPage: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1200, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 flex flex-col min-h-screen">
            {/* Header */}
            <header>
                <LandingHeader />
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-teal-500 to-gray-800 text-white py-20">
                <div className="container mx-auto px-6 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center">
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
                            className="mt-6 inline-block bg-white text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
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
            </section>

            <hr
                className="border-gray-600 "
                data-aos="scale-up"
                data-aos-duration="500"
            />

            {/* Latest News Section */}
            <section id="latest-news" className="py-16 bg-gray-800">
                <div className="container mx-auto px-6 md:px-12">
                    <h2
                        className="text-4xl font-bold text-teal-400 mb-10 text-center"
                        data-aos="fade-up"
                    >
                        Latest News
                    </h2>
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* News Item 1 */}
                        <div
                            className="p-6 bg-gray-700 shadow-md rounded-lg flex-1 hover:shadow-lg transition-shadow"
                            data-aos="fade-right"
                        >
                            <h3 className="text-xl font-semibold text-blue-400 mb-4">
                                Tokenization Trends in 2024
                            </h3>
                            <p className="text-gray-300">
                                Discover the latest innovations in blockchain tokenization and how it’s transforming
                                industries.
                            </p>
                            <a
                                href="#"
                                className="mt-4 inline-block text-blue-400 hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                        {/* News Item 2 */}
                        <div
                            className="p-6 bg-gray-700 shadow-md rounded-lg flex-1 hover:shadow-lg transition-shadow"
                            data-aos="fade-up"
                        >
                            <h3 className="text-xl font-semibold text-purple-400 mb-4">
                                How AI is Revolutionizing Data Security
                            </h3>
                            <p className="text-gray-300">
                                Explore how AI advancements are setting new standards in cybersecurity and protecting
                                critical systems.
                            </p>
                            <a
                                href="#"
                                className="mt-4 inline-block text-purple-400 hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <hr
                className="border-gray-600 "
                data-aos="scale-up"
                data-aos-duration="500"
            />

            {/* Featured Stories Section */}
            <section className="py-16 bg-gradient-to-r from-gray-700 to-gray-800">
                <div className="container mx-auto px-6 md:px-12">
                    <h2
                        className="text-4xl font-bold text-teal-400 mb-10 text-center"
                        data-aos="fade-up"
                    >
                        Featured Stories
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div
                            className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                            data-aos="fade-right"
                        >
                            <h3 className="text-2xl font-bold text-green-400 mb-4">The Rise of Green Technology</h3>
                            <p className="text-gray-300 mb-6">
                                Green technology is paving the way for sustainable innovation. Learn how companies are
                                harnessing renewable energy and eco-friendly practices to shape the future.
                            </p>
                            <a href="#" className="text-green-400 hover:underline">
                                Read the full story →
                            </a>
                        </div>
                        <div
                            className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                            data-aos="fade-left"
                        >
                            <h3 className="text-2xl font-bold text-blue-400 mb-4">Blockchain in Healthcare</h3>
                            <p className="text-gray-300 mb-6">
                                Discover how blockchain is transforming the healthcare industry by enhancing data
                                security and ensuring transparency in patient care.
                            </p>
                            <a href="#" className="text-blue-400 hover:underline">
                                Read the full story →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <hr
                className="border-gray-600 "
                data-aos="scale-up"
                data-aos-duration="500"
            />

            {/* Why Insights Matter Section */}
            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 items-center gap-12">
                        <div data-aos="fade-right">
                            <h2 className="text-4xl font-bold text-teal-400 mb-6">
                                Why Insights Matter
                            </h2>
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                In a rapidly changing world, staying informed is key to making impactful decisions. Our
                                insights empower leaders and innovators to navigate challenges and seize opportunities.
                            </p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start">
                                    <div className="text-blue-400 mr-4">
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
                                    Stay ahead of industry trends
                                </li>
                                <li className="flex items-start">
                                    <div className="text-purple-400 mr-4">
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
                                    Navigate challenges with confidence
                                </li>
                                <li className="flex items-start">
                                    <div className="text-green-400 mr-4">
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
                                    Inspire innovation and growth
                                </li>
                            </ul>
                        </div>
                        <div data-aos="fade-left" className="flex justify-center">
                            <img
                                src="https://via.placeholder.com/400x300"
                                alt="Why Insights Matter"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Divider */}
            <hr
                className="border-gray-600 "
                data-aos="scale-up"
                data-aos-duration="500"
            />

            {/* Footer */}
            <footer className="bg-gradient-to-b from-gray-800 to-gray-900 py-10">
                <LandingSubscription />
            </footer>
        </div>
    );
};

export default NewsInsightsPage;
