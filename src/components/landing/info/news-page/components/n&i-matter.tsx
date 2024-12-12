import React from 'react';

const WhyInsightsMatterSection: React.FC = () => {
    return (
        <section className="py-16 bg-gray-800">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 items-center gap-12">
                    <div data-aos="fade-right">
                        <h2 className="text-4xl font-bold text-teal-400 mb-6">
                            Why Insights Matter
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            In a rapidly changing world, staying informed is key to making impactful decisions. Our insights empower leaders and innovators to navigate challenges and seize opportunities.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start">
                                <div className="text-blue-400 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Stay ahead of industry trends
                            </li>
                            <li className="flex items-start">
                                <div className="text-purple-400 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Navigate challenges with confidence
                            </li>
                            <li className="flex items-start">
                                <div className="text-green-400 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Inspire innovation and growth
                            </li>
                        </ul>
                    </div>
                    <div data-aos="fade-left" className="flex justify-center">
                        <img src="https://via.placeholder.com/400x300" alt="Why Insights Matter" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyInsightsMatterSection;
