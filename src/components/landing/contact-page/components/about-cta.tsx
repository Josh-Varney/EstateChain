import React from "react";

const AboutCTA: React.FC = () => (
  <section
    className="bg-gradient-to-r from-teal-500 to-gray-700 text-white rounded-lg p-10 shadow-lg text-center"
    aria-labelledby="about-cta-heading"
  >
    <header>
      <h2 id="about-cta-heading" className="text-3xl font-bold">
        Let’s Build the Future Together
      </h2>
    </header>
    <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
      Ready to explore the possibilities with Webtrix? Contact us today and let’s create something extraordinary.
    </p>
    <button
      className="mt-6 px-8 py-3 bg-gray-800 text-teal-400 font-semibold rounded-lg hover:bg-gray-700 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-teal-300 focus:outline-none transition-all duration-200 ease-in-out"
      aria-label="Get in touch with Webtrix"
    >
      Get in Touch
    </button>
  </section>
);

export default AboutCTA;
