import React from "react";
import LandingHeader from "./components/landing-header";

const TechnologyPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header Bar */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:flex lg:justify-between lg:items-center">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              New Energy for the Future
            </h1>
            <p className="mt-4 text-lg">
              Sustainable solutions for an environmentally friendly and
              renewable future.
            </p>
            <button className="mt-6 bg-white text-green-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100">
              Discover Our Recent Projects
            </button>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Hero Windmills"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">6 Mil</h2>
            <p className="mt-2 text-gray-600">Company's Annual Net Income</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">315</h2>
            <p className="mt-2 text-gray-600">Projects Completed Worldwide</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">120K</h2>
            <p className="mt-2 text-gray-600">Employees Working Globally</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            We offer quality, with the best materials and service
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Layered Security
              </h3>
              <p className="mt-2 text-gray-600">
                We ensure the safety of every project with tailored security
                solutions.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Quality Control
              </h3>
              <p className="mt-2 text-gray-600">
                Each unit is carefully checked for every detail.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Reliable Customer Service
              </h3>
              <p className="mt-2 text-gray-600">
                Our experts are available 24/7 for assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              Trusted service, for your various needs
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-white border rounded-lg shadow-lg p-4 text-left">
                <h3 className="text-lg font-bold text-gray-800">
                  Solar Panels for Home
                </h3>
              </button>
              <button className="bg-white border rounded-lg shadow-lg p-4 text-left">
                <h3 className="text-lg font-bold text-gray-800">
                  Wind Power Generators
                </h3>
              </button>
              <button className="bg-white border rounded-lg shadow-lg p-4 text-left">
                <h3 className="text-lg font-bold text-gray-800">
                  Solar Panels for Industry
                </h3>
              </button>
              <button className="bg-white border rounded-lg shadow-lg p-4 text-left">
                <h3 className="text-lg font-bold text-gray-800">
                  Solar Panels for Chargers
                </h3>
              </button>
            </div>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/600x400"
              alt="Service Example"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 YourBrand. All rights reserved.</p>
          <p className="mt-2">Terms of Service | Privacy Policy</p>
        </div>
      </footer>
    </div>
  );
};

export default TechnologyPage;
