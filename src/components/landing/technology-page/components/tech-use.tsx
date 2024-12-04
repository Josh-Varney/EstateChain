import React from "react";

const TokenizationSection: React.FC = () => (
  <div className=" text-white ">
    {/* Header */}
  

    {/* Content Section */}
    <section className="px-6 lg:px-20">

      {/* Features Grid */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {[
          {
            title: "Fractional Ownership",
            description:
              "Make real estate investment accessible to everyone by enabling smaller investments in high-value properties.",
          },
          {
            title: "Enhanced Liquidity",
            description:
              "Unlock liquidity in traditionally illiquid real estate assets through seamless token trading on blockchain platforms.",
          },
          {
            title: "Global Access",
            description:
              "Empower worldwide investors to participate in real estate markets, fostering democratization and inclusivity.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="relative p-8 rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Decorative Background Element */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-teal-500 opacity-10 rounded-full transform -translate-x-6 -translate-y-6"></div>
            {/* Feature Content */}
            <h3 className="relative z-10 text-lg font-bold text-teal-400">
              {feature.title}
            </h3>
            <p className="relative z-10 mt-4 text-sm text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default TokenizationSection;
