import React from "react";
import LandingHeader from "../components/header";
import LandingSubscription from "../components/footer";
import FeaturesHero from "./components/features-hero";
import FeaturesSection from "./components/features-section";
import HowItWorks from "./components/features-guide";
import TestimonialsSection from "./components/features-testimonial";
import CallToAction from "./components/features-cta";


const FeaturesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
      <LandingHeader />
      <FeaturesHero />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CallToAction />
      <hr className="border-gray-500 border-1 mt-8 w-screen" />
      <div className="mt-8 mb-8">
        <LandingSubscription />
      </div>
    </div>
  );
};

export default FeaturesPage;
