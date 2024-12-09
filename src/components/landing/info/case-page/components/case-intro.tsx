// components/IntroductionSection.tsx
import React from 'react';

const IntroductionSection: React.FC = () => (
    <section className="mb-20 text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-teal-400 mb-6 tracking-tight">What is Tokenization?</h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Tokenization transforms real estate assets into digital tokens that represent ownership. This 
            innovation brings unprecedented accessibility, liquidity, and transparency to the real estate market.
        </p>
    </section>
);

export default IntroductionSection;
