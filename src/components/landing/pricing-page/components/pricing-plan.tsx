import React from "react";

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

interface PricingPlansProps {
  billingCycle: "monthly" | "yearly";
}

const PricingPlans: React.FC<PricingPlansProps> = ({ billingCycle }) => (
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
);

export default PricingPlans;
