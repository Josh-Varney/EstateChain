import React from 'react';

const LatestNewsSection: React.FC = () => {
    return (
        <section id="latest-news" className="py-16 bg-gray-800">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-4xl font-bold text-teal-400 mb-10 text-center" data-aos="fade-up">
                    Latest News
                </h2>
                <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* News Item 1 */}
                    <div className="p-6 bg-gray-700 shadow-md rounded-lg flex-1 hover:shadow-lg transition-shadow" data-aos="fade-right">
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">
                            Tokenization Trends in 2024
                        </h3>
                        <p className="text-gray-300">
                            Discover the latest innovations in blockchain tokenization and how it’s transforming industries.
                        </p>
                        <a href="#" className="mt-4 inline-block text-blue-400 hover:underline">
                            Read more
                        </a>
                    </div>
                    {/* News Item 2 */}
                    <div className="p-6 bg-gray-700 shadow-md rounded-lg flex-1 hover:shadow-lg transition-shadow" data-aos="fade-up">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">
                            How AI is Revolutionizing Data Security
                        </h3>
                        <p className="text-gray-300">
                            Explore how AI advancements are setting new standards in cybersecurity and protecting critical systems.
                        </p>
                        <a href="#" className="mt-4 inline-block text-purple-400 hover:underline">
                            Read more
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNewsSection;
