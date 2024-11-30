import React from "react";

const TechnologyStats: React.FC = () => (
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
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mt-4">{stat.value}</h2>
          <p className="mt-4 text-gray-300">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TechnologyStats;
