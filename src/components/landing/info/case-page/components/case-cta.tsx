// components/CTASection.tsx
import React from 'react';

const CTASection: React.FC = () => (
    <section
        className="bg-gradient-to-r from-teal-500 to-gray-800 text-white py-12 text-center rounded-xl shadow-lg"
        data-aos="zoom-in"
    >
        <h2 className="text-4xl font-bold mb-4">Learn More About Real Estate Tokenization</h2>
        <p className="text-lg font-light mb-6">
            Dive deeper into the world of blockchain-powered real estate investments.
        </p>
        <a
            href="#"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            onClick={() => {
                window.location.href = '/login';
            }}
        >
            Get Started
        </a>
    </section>
);

export default CTASection;
