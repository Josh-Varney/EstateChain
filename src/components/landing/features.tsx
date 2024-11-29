import React from "react";
import LandingHeader from "./components/landing-header";

const FeaturesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
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

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
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

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold">What Our Users Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Testimonial
              name="John Doe"
              feedback="This platform has completely changed the way I invest in real estate. The tokenization process is seamless and secure!"
            />
            <Testimonial
              name="Jane Smith"
              feedback="Fractional ownership is a game-changer. I can now invest in multiple properties without huge capital!"
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Revolutionize Your Investments?
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Join our platform to explore the next generation of real estate tokenization. Smarter, faster, and global investment opportunities await.
          </p>
          <button className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

// FeatureCard Component
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

// StepCard Component
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

// Testimonial Component
interface TestimonialProps {
  name: string;
  feedback: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, feedback }) => (
  <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
    <p className="text-gray-300 italic">"{feedback}"</p>
    <p className="mt-4 text-blue-400 font-semibold">- {name}</p>
  </div>
);

export default FeaturesPage;
