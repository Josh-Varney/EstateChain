import React from "react";

const AssetManagement = () => {
    const features = [
        { title: "Effortless Transfers", description: "Instantly move tokens with seamless security. Maximize the flexibility of your portfolio." },
        { title: "Secondary Markets", description: "Trade on secondary markets to take advantage of emerging opportunities." },
        { title: "Advanced Analytics", description: "Analyze returns, risks, and performance with precision." },
        { title: "Detailed Transaction History", description: "Track every transaction with advanced filtering." },
        { title: "Real-Time Notifications", description: "Stay updated on market trends, asset performance, and important milestones." },
        { title: "Portfolio Optimization", description: "Use AI-driven tools to balance your portfolio for better returns." },
    ];

    return (
        <div className="mt-12" data-aos="fade-up">
            <h3 className="text-3xl font-extrabold text-white mb-6">
                Asset Management
            </h3>
            <p className="text-gray-400 leading-relaxed mb-12">
                Simplify the way you manage your tokenized real estate investments. Use advanced tools to optimize and secure your portfolio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
                {features.map(({ title, description }, idx) => (
                    <div
                        key={idx}
                        className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                        data-aos="zoom-in"
                        data-aos-delay={`${200 * (idx + 1)}`}
                    >
                        <h4 className="text-xl font-semibold text-teal-400 mb-4">{title}</h4>
                        <p className="text-gray-300">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetManagement;
