import React from "react";

const CuttingEdgeTechnologies: React.FC = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-16 text-white rounded-3xl shadow-xl">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl lg:text-5xl text-center">Our Cutting-Edge Technologies</h1>
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
);

export default CuttingEdgeTechnologies;
