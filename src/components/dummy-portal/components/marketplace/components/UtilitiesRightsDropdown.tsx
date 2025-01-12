import React, { useState } from "react";
import { FaLuggageCart } from "react-icons/fa";

// Modal Component
const Modal = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable List Component
const UtilityList = ({ items, bold }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} className={`mb-2 text-sm ${bold ? "font-bold" : ""}`}>
        {item}
      </li>
    ))}
  </ul>
);

// Reusable Section Component
const Section = ({ title, description, fullDescription, leftItems, rightItems, onTitleClick }) => (
  <div>
    <h2 className="text-md font-bold mb-1">{title}</h2>
    <h2
      className="text-md mb-4 cursor-pointer text-blue-500 hover:underline"
      onClick={() => onTitleClick(title, fullDescription)}
    >
      {description}
    </h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <UtilityList items={leftItems} bold />
      </div>
      <div>
        <UtilityList items={rightItems} bold={undefined} />
      </div>
    </div>
  </div>
);

const UtilitiesDropdown = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", description: "" });

  // Open Modal with Section Data
  const handleTitleClick = (title, description) => {
    setModalData({ title, description });
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData({ title: "", description: "" });
  };

  // Section Data
  const sections = [
    {
      title: "Utility Supply",
      description: "What is a Utility Supply?",
      fullDescription:
        "Utility Supply includes electricity, water, heating, broadband, and sewage systems essential for daily living.",
      leftItems: ["Electric", "Water", "Heating", "Broadband", "Sewage"],
      rightItems: ["Ask developer", "Ask developer", "Gas", "Ask developer", "Ask developer"],
    },
    {
      title: "Rights and Restrictions",
      description: "What are Rights and Restrictions?",
      fullDescription:
        "Rights and restrictions refer to legal rights of way, property listing status, and other constraints on the property.",
      leftItems: ["Private rights of way", "Public rights of way", "Listed property", "Restrictions"],
      rightItems: ["Ask Agent", "Ask Agent", "Ask Agent", "Ask Agent"],
    },
    {
      title: "Risks",
      description: "What are Risks?",
      fullDescription:
        "Risks include potential flooding, flood defenses, and sources of risk related to the property.",
      leftItems: ["Flooded in last 5 years", "Flood defenses", "Source of flood"],
      rightItems: ["Ask Agent", "Ask Agent", "Ask Agent"],
    },
  ];

  return (
    <div className="mb-4 border rounded-md shadow-md">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex flex-row items-center space-x-2">
          <FaLuggageCart />
          <span>{title}</span>
        </div>
      </button>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="px-6 py-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-t">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                description={section.description}
                fullDescription={section.fullDescription}
                leftItems={section.leftItems}
                rightItems={section.rightItems}
                onTitleClick={handleTitleClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalData.title}
        description={modalData.description}
      />
    </div>
  );
};

export default UtilitiesDropdown;
