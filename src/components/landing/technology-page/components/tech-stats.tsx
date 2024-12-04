import React from "react";

const statsData = [
  { value: "50+", label: "Tech Partnerships", icon: "🌐" },
  { value: "10K+", label: "Projects Delivered", icon: "🚀" },
  { value: "24/7", label: "Customer Support", icon: "📞" },
];

const TechnologyStats: React.FC = () => (
  <div>
      <div className="w-fit mx-auto rounded-3xl bg-slate-700 px-6 py-2 text-center shadow-md mb-8">
          <p className="text-xs uppercase tracking-widest text-white font-semibold">Our Achievements</p>
      </div>

      <div className="text-white text-center mb-8">
          <p className="text-xl">
              Our Journey to Success, Commitment and Perfection
          </p>
      </div>

      <section
      className="px-4 sm:px-6 lg:px-16"
      aria-label="Technology statistics"
    >
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {statsData.map((stat, index) => (
          <article
            key={index}
            className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 text-center"
            aria-label={`${stat.label}: ${stat.value}`}
          >
            <div className="text-5xl" aria-hidden="true">{stat.icon}</div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-blue-400 mt-4"
            >
              {stat.value}
            </h2>
            <p className="mt-4 text-gray-300">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  </div>
  
);

export default TechnologyStats;
