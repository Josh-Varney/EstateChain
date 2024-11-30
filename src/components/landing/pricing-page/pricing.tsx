import React, { useState } from "react";
import LandingHeader from "../components/header";
import LandingSubscription from "../components/footer";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <LandingHeader />
      <PricingHero
        hasStartedFreeTrial={hasStartedFreeTrial}
        startFreeTrial={startFreeTrial}
      />
      <PricingStickyHeader
        billingCycle={billingCycle}
        toggleBillingCycle={toggleBillingCycle}
      />
      <PricingPlans billingCycle={billingCycle} />
      <PricingTestimonials />
      <PricingFAQ />
      <LandingSubscription />
    </div>
  );
};

export default PricingPage;
