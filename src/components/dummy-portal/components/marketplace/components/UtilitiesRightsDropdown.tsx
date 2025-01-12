import React, { useState } from "react";
import { FaLuggageCart } from "react-icons/fa";

// Reusable List Component
const UtilityList = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  );
};

const UtilitiesDropdown = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  // List items
  const leftColumnItems = ["Electric", "Water", "Heating", "Broadband", "Sewage"];
  const rightColumnItems = ["Ask developer", "Ask developer", "Gas", "Ask developer", "Ask developer"];
  const rightsAndRestrictionsLeft = ["Access hours", "Usage limitations"];
  const rightsAndRestrictionsRight = ["Maintenance obligations", "Shared access rules"];
  const risksLeft = ["Power outage", "Water contamination"];
  const risksRight = ["Network downtime", "High utility costs"];

  return (
    <div className="mb-4 border rounded-md shadow-md">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-row items-center space-x-2">
          <FaLuggageCart />
          <span>{title}</span>
        </div>
      </button>

      {/* Card Content */}
      {isOpen && (
        <div className="px-6 py-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-t">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Utility Types and Details */}
            <div>
              <h2 className="text-xl font-bold mb-4">Utility Supply</h2>
              <h2>What is a Utility Supply?</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Utility Types</h3>
                  <UtilityList items={leftColumnItems} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <UtilityList items={rightColumnItems} />
                </div>
              </div>
            </div>

            {/* Rights and Restrictions */}
            <div>
              <h2 className="text-xl font-bold mb-4">Rights and Restrictions</h2>
              <h2>What are Rights and Restrictions?</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <UtilityList items={rightsAndRestrictionsLeft} />
                </div>
                <div>
                  <UtilityList items={rightsAndRestrictionsRight} />
                </div>
              </div>
            </div>

            {/* Risks */}
            <div>
              <h2 className="text-xl font-bold mb-4">Risks</h2>
              <h2>What are Risks?</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <UtilityList items={risksLeft} />
                </div>
                <div>
                  <UtilityList items={risksRight} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilitiesDropdown;
