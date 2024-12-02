import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingHeader from "../components/header/header";
import LandingSubscription from "../components/footer/footer";
import TechnologyHero from "./components/tech-hero";
import TechnologyStats from "./components/tech-stats";
import CuttingEdgeTechnologies from "./components/tech-used";
import TokenizationSection from "./components/tech-use";

const TechnologyPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 700, // Shorter animations for a snappier feel
      easing: "ease-out-quart", // Smooth easing with a polished deceleration
      once: true, // Trigger animations only once
      offset: 80, // Start animations closer to the viewport
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div data-aos="fade-down">
        <LandingHeader />
      </div>

      {/* Hero Section */}
      <section className="py-16" data-aos="fade-right">
        <TechnologyHero />
      </section>

      {/* Stats Section */}
      <section className="py-16" data-aos="fade-left" data-aos-delay="100">
        <TechnologyStats />
      </section>

      {/* Cutting Edge Technologies */}
      <section className="py-16 bg-gray-900" data-aos="fade-up" data-aos-delay="200">
        <CuttingEdgeTechnologies />
      </section>

      {/* Tokenization Section */}
      <section
        className="py-16 bg-gradient-to-b from-gray-900 to-gray-800"
        data-aos="fade-in"
        data-aos-delay="300"
      >
        <TokenizationSection />
      </section>

      {/* Divider */}
      <hr
        className="border-gray-600 mt-16"
        data-aos="scale-up"
        data-aos-duration="500"
      />

      {/* Footer */}
      <footer className="py-8" data-aos="fade-up">
        <LandingSubscription />
      </footer>
    </div>
  );
};

export default TechnologyPage;
