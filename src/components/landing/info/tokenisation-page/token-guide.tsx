import React, { useState, useEffect } from "react";
import LandingHeader from "../../components/header/header";
import LandingSubscription from "../../components/footer/footer";
import AOS from "aos";
import "aos/dist/aos.css";

const TokenInformation = () => {
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true,     // Whether animation should happen only once
        });
    }, []);

    const renderContent = () => {
        if (activeTab === "overview") {
            return (
                <div className="mt-12" data-aos="fade-up">
                    <h3 className="text-4xl font-extrabold text-white mb-6">
                        Portfolio Overview
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-12">
                        Take control of your tokenized real estate investments with cutting-edge tools designed to provide in-depth insights, performance analysis, and growth opportunities.
                    </p>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {[
                            {
                                title: "Performance Analytics",
                                description:
                                    "Real-time insights into ROI, trends, and growth projections. Make smarter decisions using intuitive analytics tools.",
                                points: [
                                    "Track ROI over specific periods.",
                                    "Identify underperforming assets.",
                                    "Access visualized performance trends.",
                                ],
                            },
                            {
                                title: "Property Insights",
                                description:
                                    "Detailed analysis of individual properties, from token distribution to long-term rental income potential.",
                                points: [
                                    "Analyze token-specific data.",
                                    "Access historical trends.",
                                    "Estimate long-term value.",
                                ],
                            },
                            {
                                title: "Growth Opportunities",
                                description:
                                    "Discover new investments across regions and sectors. Diversify your portfolio with confidence.",
                                points: [
                                    "Identify high-potential markets.",
                                    "Minimize portfolio risk.",
                                    "Access exclusive opportunities.",
                                ],
                            },
                        ].map(({ title, description, points }, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                                data-aos="zoom-in"
                                data-aos-delay={`${200 * (idx + 1)}`}
                            >
                                <h4 className="text-xl font-bold text-blue-400 mb-4">
                                    {title}
                                </h4>
                                <p className="text-gray-300 mb-6">{description}</p>
                                <ul className="text-gray-400 space-y-3">
                                    {points.map((point, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start space-x-2"
                                        >
                                            <span className="text-blue-400">●</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === "management") {
            return (
                <div className="mt-12" data-aos="fade-up">
                    <h3 className="text-3xl font-extrabold text-white mb-6">
                        Asset Management
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-12">
                        Simplify the way you manage your tokenized real estate investments. Use advanced tools to optimize and secure your portfolio.
                    </p>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {[
                            {
                                title: "Effortless Transfers",
                                description:
                                    "Instantly move tokens with seamless security. Maximize the flexibility of your portfolio.",
                            },
                            {
                                title: "Secondary Markets",
                                description:
                                    "Trade on secondary markets to take advantage of emerging opportunities.",
                            },
                            {
                                title: "Advanced Analytics",
                                description:
                                    "Analyze returns, risks, and performance with precision.",
                            },
                            {
                                title: "Detailed Transaction History",
                                description:
                                    "Track every transaction with advanced filtering.",
                            },
                            {
                                title: "Real-Time Notifications",
                                description:
                                    "Stay updated on market trends, asset performance, and important milestones.",
                            },
                            {
                                title: "Portfolio Optimization",
                                description:
                                    "Use AI-driven tools to balance your portfolio for better returns.",
                            },
                        ].map(({ title, description }, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-blue-900 to-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                                data-aos="zoom-in"
                                data-aos-delay={`${200 * (idx + 1)}`}
                            >
                                <h4 className="text-xl font-bold text-blue-400 mb-4">
                                    {title}
                                </h4>
                                <p className="text-gray-300">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            <LandingHeader />
            <div className="container mx-auto py-12 px-6">
                {/* Hero Section */}
                <div className="text-center mb-12" data-aos="fade-down">
                    <h1 className="text-5xl font-extrabold text-white mb-6">
                        Empower Your Tokenized Real Estate Portfolio
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Our platform provides the tools and insights you need to take control, grow, and optimize your investments in tokenized real estate.
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-gray-800 shadow-xl rounded-2xl p-10" data-aos="fade-up">
                    <div className="flex border-b border-gray-700 mb-8">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`flex-1 text-center py-4 font-medium transition-all focus:outline-none ${
                                activeTab === "overview"
                                    ? "text-blue-500 border-b-4 border-blue-500"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Portfolio Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("management")}
                            className={`flex-1 text-center py-4 font-medium transition-all focus:outline-none ${
                                activeTab === "management"
                                    ? "text-blue-500 border-b-4 border-blue-500"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Asset Management
                        </button>
                    </div>
                    {renderContent()}
                </div>

                {/* Why Choose Us */}
                <div
                    className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-lg shadow-lg text-center"
                    data-aos="fade-up"
                >
                    <h3 className="text-4xl font-extrabold text-white mb-6">
                        Why Choose Us?
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        Trusted by thousands of investors globally, our platform delivers powerful tools and unmatched insights into tokenized real estate.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Trusted Security",
                                description: "Enterprise-grade security for all transactions.",
                            },
                            {
                                title: "Comprehensive Insights",
                                description: "Stay ahead with analytics and real-time updates.",
                            },
                            {
                                title: "Global Opportunities",
                                description: "Access diverse properties across geographies.",
                            },
                        ].map(({ title, description }, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                                data-aos="fade-right"
                                data-aos-delay={`${200 * (idx + 1)}`}
                            >
                                <h4 className="text-2xl font-bold text-blue-400 mb-4">
                                    {title}
                                </h4>
                                <p className="text-gray-300">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <LandingSubscription />
        </div>
    );
};

export default TokenInformation;
