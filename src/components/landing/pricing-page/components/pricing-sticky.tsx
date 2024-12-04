import React from "react";
import { CSSTransition } from "react-transition-group";
import "./PricingStickyHeader.css"; // Create this CSS file for animations

interface PricingStickyHeaderProps {
  billingCycle: "monthly" | "yearly";
  toggleBillingCycle: () => void;
}

const PricingStickyHeader: React.FC<PricingStickyHeaderProps> = ({
  billingCycle,
  toggleBillingCycle,
}) => (
  <div className="top-0 bg-gray-800 shadow-lg z-50 py-3 px-6 flex justify-between items-center">
    <span className="text-lg font-semibold text-gray-300">Compare Plans</span>
    <div className="flex items-center">
      <span className="text-gray-300 mr-2">Monthly</span>
      <button
        onClick={toggleBillingCycle}
        className={`relative w-12 h-6 bg-gray-700 rounded-full flex items-center ${
          billingCycle === "yearly" ? "justify-end" : "justify-start"
        }`}
      >
        <span className="w-5 h-5 bg-teal-500 rounded-full"></span>
      </button>
      <span className="text-gray-300 ml-2">Yearly</span>
      <CSSTransition
        in={billingCycle === "yearly"}
        timeout={300}
        classNames="fade-slide"
        unmountOnExit
      >
        <span className="text-sm text-teal-400 ml-4">
          Save 20% with yearly plans!
        </span>
      </CSSTransition>
    </div>
  </div>
);

export default PricingStickyHeader;
