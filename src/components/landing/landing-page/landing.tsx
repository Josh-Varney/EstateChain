import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from "react";
import LandingHeader from "../components/header/header";
import LandingTitle from "./components/landing-title";
import PartnerCards from "./components/landing-partners";
import Features from "./components/landing-features";
import TrainingDashboard from "./components/landing-training";
import LandingFAQ from "./components/landing-FAQ";
import LandingSubscription from "../components/footer/footer";

const LandingPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true, // Animates once per scroll session
    });
  }, []);

  return (
    <div data-testid="landing-page-container" className="relative min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        {/* Landing Header */}
        <LandingHeader data-aos="fade-down" />

        {/* Landing Title */}
        <div className="mt-4" data-aos="zoom-in">
          <LandingTitle />
        </div>

        {/* Partner Cards */}
        <div className="mt-10" data-aos="fade-up">
          <PartnerCards />
        </div>

        {/* Features */}
        <div className="mt-16" data-aos="fade-left">
          <Features />
        </div>

        {/* Training Dashboard */}
        <div className="mt-16" data-aos="zoom-in-up">
          <TrainingDashboard />
        </div>

        {/* FAQ */}
        <div data-aos="fade-right">
          <LandingFAQ />
        </div>

        {/* Footer */}
        <hr className="border-gray-500 border-1 mt-16 w-screen" />
        <div className="mt-8 mb-8" data-aos="zoom-in">
          <LandingSubscription />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
