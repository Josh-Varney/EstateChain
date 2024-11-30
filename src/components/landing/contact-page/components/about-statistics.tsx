import React from "react";

const AboutStatistics: React.FC = () => (
  <section className="bg-gray-800 rounded-lg p-10 shadow-lg">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div>
        <h3 className="text-4xl font-extrabold text-teal-400">500+</h3>
        <p className="text-gray-300 mt-2">Clients Served</p>
      </div>
      <div>
        <h3 className="text-4xl font-extrabold text-teal-400">20+</h3>
        <p className="text-gray-300 mt-2">Countries Reached</p>
      </div>
      <div>
        <h3 className="text-4xl font-extrabold text-teal-400">1000+</h3>
        <p className="text-gray-300 mt-2">Projects Completed</p>
      </div>
    </div>
  </section>
);

export default AboutStatistics;
