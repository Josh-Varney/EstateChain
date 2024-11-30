import React from "react";

interface PricingStickyHeaderProps {
  billingCycle: "monthly" | "yearly";
  toggleBillingCycle: () => void;
}

const PricingStickyHeader: React.FC<PricingStickyHeaderProps> = ({
  billingCycle,
  toggleBillingCycle,
}) => (
  <div className="sticky top-0 bg-gray-800 shadow-lg z-10 py-3 px-6 flex justify-between items-center">
    <span className="text-lg font-semibold text-gray-300">Compare Plans</span>
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
);

export default PricingStickyHeader;
