import React from "react";

const FeaturesHero: React.FC = () => (
  <section className="py-16 px-6 text-center">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-row items-center justify-center mt-2 space-x-2 bg-gray-700 text-gray-200 rounded-full w-fit mx-auto px-6 py-2 shadow-lg">
        <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
          Key Features
        </p>
      </div>
      <h1 className="text-4xl text-white md:text-5xl lg:text-5xl mt-6 leading-snug">
        Revolutionize Real Estate with <span className="text-blue-400">Tokenization</span>
      </h1>
      <p className="mt-6 text-gray-400 text-base md:text-sm lg:text-sm leading-relaxed text-balance">
        Unlock fractional ownership, enhance liquidity, and access global real estate opportunities seamlessly. Invest smarter, faster, and with more flexibility than ever before.
      </p>
    </div>
  </section>
);

export default FeaturesHero;
