import React from "react";

const TokenizationSection: React.FC = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-3xl shadow-2xl">
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl lg:text-5xl">Tokenization of Real Estate</h1>
      <p className="mt-6 text-gray-400 leading-relaxed max-w-3xl mx-auto">
        Transforming the real estate market by leveraging blockchain technology to create
        digital tokens representing property ownership. Tokenization offers unprecedented
        opportunities for fractional ownership, liquidity, and global investment access.
      </p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Fractional Ownership",
            description:
              "Invest in real estate with smaller amounts, making property investment accessible to everyone.",
          },
          {
            title: "Enhanced Liquidity",
            description:
              "Trade tokens representing real estate ownership seamlessly, reducing traditional barriers.",
          },
          {
            title: "Global Access",
            description:
              "Allow investors worldwide to participate in real estate markets, democratizing opportunities.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 bg-gray-600 rounded-lg shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105"
          >
            <h3 className="text-lg sm:text-xl font-bold text-teal-400">{feature.title}</h3>
            <p className="mt-4 text-sm sm:text-base text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TokenizationSection;
