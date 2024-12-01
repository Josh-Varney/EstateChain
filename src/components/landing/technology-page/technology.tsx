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
      duration: 900, // Slightly longer animations for added depth
      easing: "ease-in-out-sine", // Balanced easing for a smoother look
      once: true, // Trigger each animation only once
      offset: 120, // A slightly delayed trigger
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div data-aos="fade-zoom-in">
        <LandingHeader />
      </div>

      {/* Hero Section */}
      <section className="py-16" data-aos="flip-up">
        <TechnologyHero />
      </section>

      {/* Stats Section */}
      <section className="py-16" data-aos="rotate-left">
        <TechnologyStats />
      </section>

      {/* Cutting Edge Technologies */}
      <section className="py-16 bg-gray-900" data-aos="fade-up-right">
        <CuttingEdgeTechnologies />
      </section>

      {/* Tokenization Section */}
      <section
        className="py-16 bg-gradient-to-b from-gray-900 to-gray-800"
        data-aos="fade-zoom-out"
      >
        <TokenizationSection />
      </section>

      {/* Divider */}
      <hr className="border-gray-600 mt-16" data-aos="zoom-out" />

      {/* Footer */}
      <footer className="py-8" data-aos="fade-zoom-out">
        <LandingSubscription />
      </footer>
    </div>
  );
};

export default TechnologyPage;
