import React from "react";

const AboutHero: React.FC = () => (
  <section className="relative text-center">
    <h1 className="text-5xl font-extrabold text-teal-400">About Us</h1>
    <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
      From humble beginnings to pioneering innovation, EquiSpace is your trusted partner in technology. Join us as we shape the future.
    </p>
    <div className="mt-8">
      <img
        src="https://via.placeholder.com/800x400.png?text=Placeholder+Image"
        alt="Placeholder - About Us"
        className="w-full h-96 object-cover rounded-lg shadow-lg"
      />
    </div>
  </section>
);

export default AboutHero;
