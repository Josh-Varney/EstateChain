import React from "react";

interface PricingHeroProps {
  hasStartedFreeTrial: boolean;
  startFreeTrial: () => void;
}

const PricingHero: React.FC<PricingHeroProps> = ({
  hasStartedFreeTrial,
  startFreeTrial,
}) => (
  <header className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white py-16">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      <div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Simple Pricing, No Surprises
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mt-6">
          Find the plan that suits your needs. Flexible, transparent, and
          designed to grow with you.
        </p>
        <div className="mt-8 flex space-x-4">
          {!hasStartedFreeTrial && (
            <button
              onClick={startFreeTrial}
              className="bg-blue-500 text-gray-100 py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Start Free Trial
            </button>
          )}
          <button className="bg-gray-800 hover:bg-gray-700 py-3 px-6 rounded-lg shadow-lg">
            View Plans
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src="https://via.placeholder.com/500x400"
          alt="Pricing Illustration"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </header>
);

export default PricingHero;
