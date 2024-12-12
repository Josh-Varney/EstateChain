import React from "react";

const PortfolioOverview = () => {
    const features = [
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
    ];

    return (
        <div className="mt-12" data-aos="fade-up">
            <h3 className="text-4xl font-extrabold text-white mb-6">
                Portfolio Overview
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
                Take control of your tokenized real estate investments with cutting-edge tools designed to provide in-depth insights, performance analysis, and growth opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
                {features.map(({ title, description, points }, idx) => (
                    <div
                        key={idx}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                        data-aos="zoom-in"
                        data-aos-delay={`${200 * (idx + 1)}`}
                    >
                        <h4 className="text-xl font-bold text-teal-400 mb-4">{title}</h4>
                        <p className="text-gray-300 mb-6">{description}</p>
                        <ul className="text-gray-400 space-y-3">
                            {points.map((point, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                    <span className="text-teal-400">●</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioOverview;
