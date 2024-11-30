import React from "react";

const CallToAction: React.FC = () => (
  <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold">
        Ready to Revolutionize Your Investments?
      </h2>
      <p className="mt-4 text-gray-300 leading-relaxed">
        Join our platform to explore the next generation of real estate tokenization. Smarter, faster, and global investment opportunities await.
      </p>
      <button className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
        Get Started Now
      </button>
    </div>
  </section>
);

export default CallToAction;
