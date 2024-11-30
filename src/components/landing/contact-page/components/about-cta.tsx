import React from "react";

const AboutCTA: React.FC = () => (
  <section className="bg-teal-500 text-white rounded-lg p-10 shadow-lg text-center">
    <h2 className="text-3xl font-bold">Let’s Build the Future Together</h2>
    <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
      Ready to explore the possibilities with Webtrix? Contact us today and let’s create something extraordinary.
    </p>
    <button className="mt-6 px-8 py-3 bg-gray-800 text-teal-400 font-semibold rounded-lg hover:bg-gray-700 shadow-lg hover:shadow-xl transition">
      Get in Touch
    </button>
  </section>
);

export default AboutCTA;
