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
      duration: 800, // Shorter animation duration for professionalism
      easing: 'ease-out-cubic', // Smoother easing curve
      once: true, // Trigger animation once per scroll
      offset: 50, // Smaller offset to start animations closer to the viewport
    });
  }, []);

  return (
    <div
      data-testid="features-page-container"
      className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden"
    >
      {/* Landing Header */}
      <div data-aos="fade" data-aos-duration="600">
        <LandingHeader />
      </div>

      {/* Features Hero */}
      <div data-aos="fade" data-aos-duration="700">
        <FeaturesHero />
      </div>

      {/* Features Section */}
      <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="200">
        <FeaturesSection />
      </div>

      {/* How It Works */}
      <div data-aos="fade" data-aos-duration="700" data-aos-delay="300">
        <HowItWorks />
      </div>

      {/* Testimonials Section */}
      <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="400">
        <TestimonialsSection />
      </div>

      {/* Call to Action */}
      <div data-aos="fade" data-aos-duration="700" data-aos-delay="500">
        <CallToAction />
      </div>

      {/* Divider */}
      <hr
        className="border-gray-500 border-1 w-screen"
        data-aos="fade"
        data-aos-duration="600"
        data-aos-delay="600"
      />

      {/* Footer */}
      <div className="mt-8 mb-8" data-aos="fade-up" data-aos-duration="700" data-aos-delay="700">
        <LandingSubscription />
      </div>
    </div>
  );
};

export default FeaturesPage;
