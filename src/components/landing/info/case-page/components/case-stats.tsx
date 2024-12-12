// components/StatisticsSection.tsx
import React from 'react';

const StatisticsSection: React.FC = () => (
    <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" data-aos="fade-up">
            {[
                { value: '85%', label: 'Funding Success Rate', color: 'text-blue-400' },
                { value: '$10M', label: 'Funds Raised', color: 'text-green-400' },
                { value: '6 Months', label: 'To Liquidity', color: 'text-purple-400' },
            ].map((stat, index) => (
                <div key={index} className="bg-gray-800 shadow-xl rounded-lg p-8">
                    <h3 className={`text-5xl font-bold ${stat.color}`}>{stat.value}</h3>
                    <p className="text-gray-300 mt-4">{stat.label}</p>
                </div>
            ))}
        </div>
    </section>
);

export default StatisticsSection;
