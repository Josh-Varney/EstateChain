import React, { useState } from "react";

const FutureInnovations: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-16">
      {/* Section Header */}
      <section className="px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-5xl leading-relaxed text-center">
            Explore the Technologies of Tomorrow
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Discover groundbreaking innovations that are reshaping our world.
          </p>
        </div>

        {/* Grid of Innovations */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              title: "AI Synergy Engine",
              description:
                "A platform that harmonizes artificial intelligence with human creativity to solve complex problems.",
              icon: "⚙️",
            },
            {
              title: "Quantum Nexus",
              description:
                "Harness the power of quantum computing to tackle challenges beyond traditional computation.",
              icon: "🔗",
            },
            {
              title: "EcoSphere AI",
              description:
                "A sustainable system that uses AI to optimize renewable energy sources globally.",
              icon: "🌍",
            },
            {
              title: "MetaSense XR",
              description:
                "An immersive mixed-reality system redefining training, entertainment, and remote collaboration.",
              icon: "👓",
            },
            {
              title: "CryoShield Security",
              description:
                "State-of-the-art cryogenic encryption that protects sensitive data against future threats.",
              icon: "❄️",
            },
            {
              title: "NeuroLink Hub",
              description:
                "A neural interface connecting minds to machines seamlessly and intuitively.",
              icon: "🧠",
            },
          ].map((innovation, index) => (
            <div
              key={index}
              onClick={() => setSelectedCard(index)}
              className={`group relative p-8 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ${
                selectedCard === index ? "animate-bounce" : ""
              }`}
            >
              {/* Icon */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-500 bg-opacity-10 rounded-full flex items-center justify-center shadow-md">
                <span className="text-5xl text-white group-hover:scale-110 transition duration-300">
                  {innovation.icon}
                </span>
              </div>

              {/* Card Content */}
              <div className="mt-16 text-center">
                <h3 className="text-xl font-semibold text-white">
                  {innovation.title}
                </h3>
                <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                  {innovation.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FutureInnovations;
