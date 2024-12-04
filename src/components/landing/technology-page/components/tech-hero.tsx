import React from "react";

const TechnologyHero: React.FC = () => (
  <section className="relative text-white  px-4 sm:px-6 lg:px-16 rounded-3xl mt-4 flex items-center">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:space-x-8">
      
      {/* Text Content */}
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-5xl leading-relaxed text-center lg:text-left text-nowrap">
          Revolutionizing Technology <br /> for a
          <span className="text-teal-400"> Better Tomorrow</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed text-center lg:text-left text-balance">
          We pioneer cutting-edge solutions in AI, cloud computing, and sustainable technology. 
          Our mission is to empower businesses with innovative tools that drive growth and efficiency.
        </p>
      </div>
      
      {/* Image Content */}
      <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
        <img
          src="https://via.placeholder.com/600x400"
          alt="Technology Hero"
          className="rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-300"
        />
      </div>
      
    </div>
  </section>
);

export default TechnologyHero;
