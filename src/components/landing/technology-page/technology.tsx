import React from "react";
import LandingHeader from "../components/header";
import LandingSubscription from "../components/footer";

const TechnologyPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
      {/* Header Bar */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative text-white py-16 px-4 sm:px-6 lg:px-16 rounded-3xl mt-4 shadow-xl flex items-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:space-x-8">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl text-white md:text-5xl lg:text-5xl leading-relaxed text-center">
              Revolutionizing Technology for a <span className="text-blue-400">Better Tomorrow</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed text-center lg:text-left">
              Pioneering cutting-edge solutions in AI, cloud computing, and sustainable technology.
              Our mission is to empower businesses with innovative tools that drive growth and efficiency.
            </p>
            <div className="flex justify-center lg:justify-start">
             
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Technology Hero Image"
              className="rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { value: "50+", label: "Tech Partnerships", icon: "🌐" },
            { value: "10K+", label: "Projects Delivered", icon: "🚀" },
            { value: "24/7", label: "Customer Support", icon: "📞" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 text-center"
            >
              <div className="text-5xl">{stat.icon}</div>
              <h2 className="text-3xl  md:text-3xl lg:text-3xl justify-center text-balance sm:text-4xl font-bold text-blue-400 mt-4">{stat.value}</h2>
              <p className="mt-4 text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cutting-Edge Technologies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 text-white rounded-3xl shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-white md:text-5xl lg:text-5xl justify-center text-balance text-center">Our Cutting-Edge Technologies</h1>
          <p className="mt-6 text-gray-400 leading-relaxed max-w-3xl mx-auto text-center">
            Discover the groundbreaking technologies that drive our success. From advanced AI to quantum-level computing,
            we leverage the tools of tomorrow to solve today’s challenges.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    {
      title: "NeuralCloud AI",
      description:
        "A self-learning cloud platform powered by neural networks that adapts to user behavior in real time.",
      icon: "🤖",
    },
    {
      title: "QuantumSecure Encryption",
      description:
        "Unbreakable quantum encryption technology ensuring data security for the next generation.",
      icon: "🔒",
    },
    {
      title: "GreenCompute Framework",
      description:
        "An energy-efficient computing system that reduces power consumption by 70% without compromising performance.",
      icon: "🌱",
    },
    {
      title: "BioSyn Sensors",
      description:
        "Next-gen biometric sensors that seamlessly integrate with devices for secure and fast authentication.",
      icon: "🔬",
    },
    {
      title: "AutonoChain",
      description:
        "A blockchain-powered automation system enabling secure and transparent process management.",
      icon: "⛓️",
    },
    {
      title: "HoloView XR",
      description:
        "Immersive holographic visualization technology for training, simulations, and entertainment.",
      icon: "🌀",
    },
  ].map((tech, index) => (
    <div
      key={index}
      className="p-8 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-700 rounded-full mb-6">
        <span className="text-3xl text-blue-400">{tech.icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-white text-center uppercase tracking-wide">
        {tech.title}
      </h3>
      <p className="mt-4 text-gray-300 text-center leading-relaxed">
        {tech.description}
      </p>
    </div>
  ))}
</div>


        </div>
      </section>

      {/* Tokenization Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-3xl shadow-2xl">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl text-white md:text-5xl lg:text-5xl justify-center text-balance text-center">Tokenization of Real Estate</h1>
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

      {/* Footer */}
      <hr className="border-gray-600 mt-16 w-full" />
      <div className="mt-8 mb-8">
        <LandingSubscription />
      </div>
    </div>
  );
};

export default TechnologyPage;
