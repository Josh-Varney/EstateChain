// components/HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => (
    <section className="bg-gradient-to-b from-teal-500 to-gray-800 text-white py-20 shadow-lg">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg" data-aos="fade-down">
                Tokenization in Real Estate
            </h1>
            <p className="mt-4 text-lg md:text-2xl font-light tracking-wide" data-aos="fade-up">
                Revolutionizing property investments with blockchain technology.
            </p>
        </div>
    </section>
);

export default HeroSection;
