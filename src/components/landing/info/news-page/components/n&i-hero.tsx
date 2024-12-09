import React from 'react';

const HeroSection: React.FC = () => {
    return (
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
    );
};

export default HeroSection;
