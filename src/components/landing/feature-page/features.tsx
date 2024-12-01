import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingHeader from "../components/header/header";
import LandingSubscription from "../components/footer/footer";
import FeaturesHero from "./components/features-hero";
import FeaturesSection from "./components/features-section";
import HowItWorks from "./components/features-guide";
import TestimonialsSection from "./components/features-testimonial";
import CallToAction from "./components/features-cta";

const FeaturesPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Default animation duration
      easing: 'ease-in-out', // Smooth easing
      once: true, // Trigger animation once per scroll
      offset: 100, // Start animations 100px before the element enters viewport
    });
  }, []);

  return (
    <div
      data-testid="features-page-container"
      className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden"
    >
      {/* Landing Header */}
      <div data-aos="fade-down">
        <LandingHeader />
      </div>

      {/* Features Hero */}
      <div data-aos="zoom-in" data-aos-delay="200">
        <FeaturesHero />
      </div>

      {/* Features Section */}
      <div data-aos="fade-up" data-aos-delay="400">
        <FeaturesSection />
      </div>

      {/* How It Works */}
      <div data-aos="fade-left" data-aos-delay="600">
        <HowItWorks />
      </div>

      {/* Testimonials Section */}
      <div data-aos="zoom-in-up" data-aos-delay="800">
        <TestimonialsSection />
      </div>

      {/* Call to Action */}
      <div data-aos="fade-up" data-aos-delay="1000">
        <CallToAction />
      </div>

      {/* Divider */}
      <hr className="border-gray-500 border-1 w-screen" data-aos="zoom-in" data-aos-delay="1200" />

      {/* Footer */}
      <div className="mt-8 mb-8" data-aos="fade-up" data-aos-delay="1400">
        <LandingSubscription />
      </div>
    </div>
  );
};

export default FeaturesPage;
