import React from "react";

const AboutHero: React.FC = () => (
  <section className="relative text-center">
    <h1 className="text-5xl font-extrabold text-teal-400">About Us</h1>
    <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
      From humble beginnings to pioneering innovation, Webtrix is your trusted partner in technology. Join us as we shape the future.
    </p>
    <div className="mt-8">
      <img
        src="/assets/about-hero.jpg"
        alt="Webtrix Team"
        className="w-full h-96 object-cover rounded-lg shadow-lg"
      />
    </div>
  </section>
);

export default AboutHero;
