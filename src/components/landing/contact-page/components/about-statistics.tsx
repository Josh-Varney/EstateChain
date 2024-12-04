import React from "react";

const AboutStatistics: React.FC = () => (
  <section className="bg-gray-800 rounded-lg p-10 shadow-lg">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div>
        <h3 className="text-4xl font-extrabold text-teal-400">10+</h3>
        <p className="text-gray-300 mt-2">Happy Clients</p>
      </div>
      <div>
        <h3 className="text-4xl font-extrabold text-teal-400">3</h3>
        <p className="text-gray-300 mt-2">Countries Served</p>
      </div>
      <div>
        <h3 className="text-4xl font-extrabold text-teal-400">15+</h3>
        <p className="text-gray-300 mt-2">Projects Delivered</p>
      </div>
    </div>
  </section>
);

export default AboutStatistics;
