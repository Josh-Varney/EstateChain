import React from "react";

interface StepCardProps {
    step: string;
    title: string;
    description: string;
  }
  
  const StepCard: React.FC<StepCardProps> = ({ step, title, description }) => (
    <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
      <div className="text-blue-400 text-3xl font-bold">{step}</div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
);

const HowItWorks: React.FC = () => (
  <section className="py-16 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl text-white md:text-5xl lg:text-5xl">How It Works</h2>
      <p className="mt-4 text-gray-300">
        Experience a simple, transparent, and secure way to invest in real estate through tokenization.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <StepCard
          step="1"
          title="Create an Account"
          description="Sign up and verify your identity to get started on our platform."
        />
        <StepCard
          step="2"
          title="Choose a Property"
          description="Browse through our curated properties and pick the one that fits your goals."
        />
        <StepCard
          step="3"
          title="Start Investing"
          description="Purchase tokens to own fractions of properties and enjoy returns."
        />
      </div>
    </div>
  </section>
);

export default HowItWorks;
