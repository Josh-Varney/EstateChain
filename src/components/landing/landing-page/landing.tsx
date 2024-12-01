import React from "react";
import LandingHeader from "../components/header/header";
import LandingTitle from "./components/landing-title";
import PartnerCards from "./components/landing-partners";
import Features from "./components/landing-features";
import TrainingDashboard from "./components/landing-training";
import LandingFAQ from "./components/landing-FAQ";
import LandingSubscription from "../components/footer/footer";

const LandingPage: React.FC = () => {
  return (
    <div data-testid="landing-page-container" className="relative min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        {/* Landing Header  (Home, Technology, Features, Pricing, FAQ */}
        <LandingHeader />
        
        {/* Sick Title with Get Started */}
        <div className="mt-4">
          <LandingTitle />
        </div>
        {/* Innovative Features of BlockEstate */}
        <div className="mt-10">
          <PartnerCards /> 
        </div>
        <div className="mt-16">
            <Features />
        </div>
        {/* Cards with Analytics ETC */}
        <div className="mt-16">
          <TrainingDashboard />
        </div>

        <div>
          <LandingFAQ />
        </div>

        <hr className="border-gray-500 border-1 mt-16 w-screen" />

        <div className="mt-8 mb-8">
          <LandingSubscription />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
