import React from "react";

const WhyChooseUs = () => {
    const features = [
        { title: "Trusted Security", description: "Enterprise-grade security for all transactions." },
        { title: "Comprehensive Insights", description: "Stay ahead with analytics and real-time updates." },
        { title: "Global Opportunities", description: "Access diverse properties across geographies." },
    ];

    return (
        <div
            className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-lg shadow-lg text-center"
            data-aos="fade-up"
        >
            <h3 className="text-4xl font-extrabold text-white mb-6">Why Choose Us?</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Trusted by thousands of investors globally, our platform delivers powerful tools and unmatched insights into tokenized real estate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map(({ title, description }, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        data-aos="fade-right"
                        data-aos-delay={`${200 * (idx + 1)}`}
                    >
                        <h4 className="text-2xl font-bold text-teal-400 mb-4">{title}</h4>
                        <p className="text-gray-300">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
