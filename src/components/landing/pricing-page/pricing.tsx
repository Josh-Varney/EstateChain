import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingHeader from "../components/header/header";
import LandingSubscription from "../components/footer/footer";
import PricingHero from "./components/pricing-hero";
import PricingStickyHeader from "./components/pricing-sticky";
import PricingPlans from "./components/pricing-plan";
import PricingTestimonials from "./components/pricing-testimonial";
import PricingFAQ from "./components/pricing-faq";

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const [hasStartedFreeTrial, setHasStartedFreeTrial] = useState(false);

  const toggleBillingCycle = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  };

  const startFreeTrial = () => {
    setHasStartedFreeTrial(true);
    alert("Your free trial has started!");
  };

  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in ms
      easing: "ease-out", // Easing function
      offset: 50, // Offset to trigger animations
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div
      data-testid="pricing-page-container"
      className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white pb-8"
    >
      <div data-aos="fade-down">
        <LandingHeader />
      </div>
      <div data-aos="fade-up">
        <PricingHero
          hasStartedFreeTrial={hasStartedFreeTrial}
          startFreeTrial={startFreeTrial}
        />
      </div>
      <div data-aos="fade-right">
        <PricingStickyHeader
          billingCycle={billingCycle}
          toggleBillingCycle={toggleBillingCycle}
        />
      </div>
      <div data-aos="zoom-in">
        <PricingPlans billingCycle={billingCycle} />
      </div>
      <hr className="border-gray-500 border-1 w-screen" />
      <div data-aos="fade-left">
        <PricingTestimonials />
      </div>
      <hr className="border-gray-500 border-1 w-screen" />
      <div data-aos="fade-up">
        <PricingFAQ />
      </div>
      <hr className="border-gray-500 border-1 w-screen"/>
      <div data-aos="fade-up" className="mt-8">
        <LandingSubscription />
      </div>
    </div>
  );
};

export default PricingPage;
