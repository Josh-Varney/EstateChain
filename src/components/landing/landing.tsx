import React from "react";
import LandingHeader from "./components/landing-header";
import LandingTitle from "./components/landing-title";
import PartnerCards from "./components/landing-partners";
import Features from "./components/landing-features";
import TrainingDashboard from "./components/landing-training";
import LandingFAQ from "./components/landing-FAQ";
import { FaGripHorizontal } from "react-icons/fa";
import LandingExtras from "./components/landing-extras";

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gf-900 to-slate-800 overflow-hidden">

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        {/* Landing Header  (Home, Technology, Features, Pricing, FAQ */}
        <LandingHeader />
        
        {/* Sick Title with Get Started */}
        <div className="mt-8">
          <LandingTitle />
        </div>
        {/* Innovative Features of BlockEstate */}
        <div className="mt-16">
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

        <hr className="border-green-500 border-2 mt-16 w-screen" />

        <div className="mt-8">
          <LandingExtras />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
