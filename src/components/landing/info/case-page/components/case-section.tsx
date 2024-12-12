// components/CaseStudiesSection.tsx
import React from 'react';

const CaseStudiesSection: React.FC = () => (
    <section className="mb-20">
        <h2 className="text-4xl font-bold text-teal-400 mb-12 text-center tracking-wide" data-aos="fade-up">
            Real-World Applications
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
            {[
                {
                    title: 'Urban Realty Partners',
                    challenge: 'High entry barriers for investors due to large property values.',
                    solution: 'Fractional ownership via blockchain tokens worth as little as $500.',
                    result: 'Raised $10M in funding, achieving liquidity in just six months.',
                    color: 'text-blue-400',
                },
                {
                    title: 'GreenSpaces Ventures',
                    challenge: 'Difficulty securing funding for eco-friendly commercial spaces.',
                    solution: 'Blockchain tokens enabled small-scale investors to fund green office projects.',
                    result: 'Funded 85% of the project in just three months.',
                    color: 'text-green-400',
                },
            ].map((study, index) => (
                <div
                    key={index}
                    className="p-8 bg-gray-800 shadow-2xl rounded-xl transform hover:scale-105 transition-transform duration-300"
                    data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                >
                    <h3 className={`text-2xl font-bold ${study.color} mb-4`}>{study.title}</h3>
                    <p className="text-gray-300 mb-4">
                        <strong>Challenge:</strong> {study.challenge}
                    </p>
                    <p className="text-gray-300 mb-4">
                        <strong>Solution:</strong> {study.solution}
                    </p>
                    <p className="text-gray-300">
                        <strong>Result:</strong> {study.result}
                    </p>
                </div>
            ))}
        </div>
    </section>
);

export default CaseStudiesSection;
