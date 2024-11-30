import React from "react";

interface FeatureCardProps {
    icon: string;
    color: string;
    title: string;
    description: string;
  }
  
  const FeatureCard: React.FC<FeatureCardProps> = ({ icon, color, title, description }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
      <div className={`${color} text-6xl mb-6`}>{icon}</div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-4 text-gray-300">{description}</p>
    </div>
);

const FeaturesSection: React.FC = () => (
  <section className="py-16 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard
        icon="🏠"
        color="text-blue-400"
        title="Fractional Ownership"
        description="Invest in tokenized property shares, opening real estate markets to everyone, with minimal capital."
      />
      <FeatureCard
        icon="💳"
        color="text-green-400"
        title="Instant Liquidity"
        description="Seamlessly trade property tokens in a secure marketplace with faster transactions and lower costs."
      />
      <FeatureCard
        icon="🔒"
        color="text-purple-400"
        title="Blockchain Security"
        description="Enjoy robust security and transparency with blockchain encryption for all your transactions."
      />
      <FeatureCard
        icon="🌐"
        color="text-teal-400"
        title="Global Investment"
        description="Invest in properties worldwide, expanding your portfolio beyond borders with ease."
      />
      <FeatureCard
        icon="📊"
        color="text-yellow-400"
        title="Real-Time Insights"
        description="Get detailed analytics and performance metrics to make informed investment decisions."
      />
      <FeatureCard
        icon="🤝"
        color="text-pink-400"
        title="Seamless Integration"
        description="Easily integrate with financial tools for efficient portfolio management and seamless workflows."
      />
    </div>
  </section>
);

export default FeaturesSection;

