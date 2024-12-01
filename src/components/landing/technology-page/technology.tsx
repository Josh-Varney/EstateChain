import React from "react";
import LandingHeader from "../components/header/header";
import LandingSubscription from "../components/footer/footer";
import TechnologyHero from "./components/tech-hero";
import TechnologyStats from "./components/tech-stats";
import CuttingEdgeTechnologies from "./components/tech-used";
import TokenizationSection from "./components/tech-use";

const TechnologyPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
      <LandingHeader />
      <TechnologyHero />
      <TechnologyStats />
      <CuttingEdgeTechnologies />
      <TokenizationSection />
      <hr className="border-gray-600 mt-16 w-full" />
      <div className="mt-8 mb-8">
        <LandingSubscription />
      </div>
    </div>
  );
};

export default TechnologyPage;
