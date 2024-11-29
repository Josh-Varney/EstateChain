import React, { useState } from "react";
import LandingHeader from "../components/header";
import LandingSubscription from "../components/footer";

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

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Simple Pricing, No Surprises
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mt-6">
              Find the plan that suits your needs. Flexible, transparent, and
              designed to grow with you.
            </p>
            <div className="mt-8 flex space-x-4">
              {!hasStartedFreeTrial && (
                <button
                  onClick={startFreeTrial}
                  className="bg-blue-500 text-gray-100 py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                  Start Free Trial
                </button>
              )}
              <button className="bg-gray-800 hover:bg-gray-700 py-3 px-6 rounded-lg shadow-lg">
                View Plans
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://via.placeholder.com/500x400"
              alt="Pricing Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* Sticky Header */}
      <div className="sticky top-0 bg-gray-800 shadow-lg z-10 py-3 px-6 flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-300">
          Compare Plans
        </span>
        <div className="flex items-center">
          <span className="text-gray-300 mr-2">Monthly</span>
          <button
            onClick={toggleBillingCycle}
            className={`relative w-12 h-6 bg-gray-700 rounded-full flex items-center ${
              billingCycle === "yearly" ? "justify-end" : "justify-start"
            }`}
          >
            <span className="w-5 h-5 bg-blue-500 rounded-full"></span>
          </button>
          <span className="text-gray-300 ml-2">Yearly</span>
          {billingCycle === "yearly" && (
            <span className="text-sm text-blue-400 ml-4">
              Save 20% with yearly plans!
            </span>
          )}
        </div>
      </div>

      {/* Pricing Plans */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800 border rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 ${
                plan.isPopular ? "border-blue-500 ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-100 mb-4">
                  {plan.title}
                </h3>
                <div className="text-4xl font-extrabold text-blue-400 mb-2">
                  $
                  {billingCycle === "yearly"
                    ? plan.price * 12 * 0.8
                    : plan.price}
                  <span className="text-sm text-gray-500">
                    {billingCycle === "yearly" ? "/year" : "/month"}
                  </span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-gray-100 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-100">What People Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg shadow-lg text-left"
              >
                <p className="italic text-gray-400">“{testimonial.message}”</p>
                <div className="mt-4">
                  <span className="block font-bold text-gray-100">
                    {testimonial.name}
                  </span>
                  <span className="block text-sm text-gray-400">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-100">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-6">
            {faq.map((item, index) => (
              <details
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <summary className="cursor-pointer text-lg font-semibold text-gray-100">
                  {item.question}
                </summary>
                <p className="mt-2 text-gray-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <hr className="border-gray-500 border-1 mt-16 w-screen" />
        
        <div className="mt-8">
        <LandingSubscription />
        </div>
      </section>
      
    </div>
  );
};

export default PricingPage;

// Mock Data
const plans = [
  {
    title: "Basic",
    price: 10,
    description: "For individuals starting out.",
    features: ["1 Project", "Basic Support"],
    isPopular: false,
  },
  {
    title: "Pro",
    price: 30,
    description: "Perfect for small teams.",
    features: ["10 Projects", "Priority Support"],
    isPopular: true,
  },
  {
    title: "Enterprise",
    price: 100,
    description: "For large organizations.",
    features: ["Unlimited Projects", "Custom Integrations"],
    isPopular: false,
  },
];

const testimonials = [
  {
    message: "Amazing service!",
    name: "John Doe",
    role: "CEO at TechCo",
  },
  {
    message: "Helped us scale our business.",
    name: "Jane Smith",
    role: "Manager at BuildCo",
  },
];

const faq = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade at any time.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial for all plans.",
  },
];
