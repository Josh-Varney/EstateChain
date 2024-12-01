import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingHeader from "../components/header/header";
import LandingSubscription from "../components/footer/footer";
import AboutHero from "./components/about-hero";
import AboutTimeline from "./components/about-timeline";
import AboutTestimonials from "./components/about-testimonials";
import AboutStatistics from "./components/about-statistics";
import AboutAwards from "./components/about-awards";
import AboutCTA from "./components/about-cta";

const AboutUsPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      easing: "ease-out", // Animation easing
      offset: 50, // Offset to trigger animations
      once: true, // Run animation only once
    });
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100">
      <div data-aos="fade-down">
        <LandingHeader />
      </div>

      <main className="flex-1 px-6 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div data-aos="fade-up">
            <AboutHero />
          </div>
          <div data-aos="fade-right">
            <AboutTimeline />
          </div>
          <div data-aos="fade-left">
            <AboutTestimonials />
          </div>
          <div data-aos="zoom-in">
            <AboutStatistics />
          </div>
          <div data-aos="flip-up">
            <AboutAwards />
          </div>
          <div data-aos="fade-up">
            <AboutCTA />
          </div>
        </div>

        <hr data-aos="fade-right" className="border-gray-500 border-1 mt-16 w-screen" />

        <section data-aos="zoom-in" className="mt-8">
          <LandingSubscription />
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
