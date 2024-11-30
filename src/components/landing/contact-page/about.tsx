import React from "react";
import LandingHeader from "../components/header";
import LandingSubscription from "../components/footer";
import AboutHero from "./components/about-hero";
import AboutTimeline from "./components/about-timeline";
import AboutTestimonials from "./components/about-testimonials";
import AboutStatistics from "./components/about-statistics";
import AboutAwards from "./components/about-awards";
import AboutCTA from "./components/about-cta";


const AboutUsPage: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100">
      <LandingHeader />

      <main className="flex-1 px-6 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <AboutHero />
          <AboutTimeline />
          <AboutTestimonials />
          <AboutStatistics />
          <AboutAwards />
          <AboutCTA />
        </div>

        <hr className="border-gray-500 border-1 mt-16 w-screen" />

        <section className="mt-8">
          <LandingSubscription />
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
