import React from 'react';

const FeaturedStoriesSection: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-gray-700 to-gray-800">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-4xl font-bold text-teal-400 mb-10 text-center" data-aos="fade-up">
                    Featured Stories
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105" data-aos="fade-right">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">The Rise of Green Technology</h3>
                        <p className="text-gray-300 mb-6">
                            Green technology is paving the way for sustainable innovation. Learn how companies are harnessing renewable energy and eco-friendly practices to shape the future.
                        </p>
                        <a href="#" className="text-green-400 hover:underline">
                            Read the full story →
                        </a>
                    </div>
                    <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105" data-aos="fade-left">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">Blockchain in Healthcare</h3>
                        <p className="text-gray-300 mb-6">
                            Discover how blockchain is transforming the healthcare industry by enhancing data security and ensuring transparency in patient care.
                        </p>
                        <a href="#" className="text-blue-400 hover:underline">
                            Read the full story →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedStoriesSection;
