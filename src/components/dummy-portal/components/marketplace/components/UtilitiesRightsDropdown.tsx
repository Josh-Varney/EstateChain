import React, { useEffect, useState } from "react";
import { FaLuggageCart } from "react-icons/fa";

// Modal Component
const Modal = ({ isOpen, onClose, title, description }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full transform transition-all duration-300"
      >
        {/* Modal header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal description */}
        <p className="text-gray-300">{description}</p>

        {/* Footer button */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
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
      <li key={index} className={`mb-2 text-sm ${bold ? "font-bold" : ""} text-gray-300`}>
        {item}
      </li>
    ))}
  </ul>
);

// Reusable Section Component
const Section = ({
  title,
  description,
  fullDescription,
  leftItems,
  rightItems,
  onTitleClick,
}) => (
  <div>
    <h2 className="text-md font-bold mb-1 text-white">{title}</h2>
    <h2
      className="text-md mb-4 cursor-pointer text-blue-400 hover:underline"
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

  const handleTitleClick = (title, description) => {
    setModalData({ title, description });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData({ title: "", description: "" });
  };

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
    <div className="mb-4 border border-gray-700 shadow-md rounded-b-lg">
      <button
        className="w-full px-4 py-2 text-left bg-gray-700 hover:bg-gray-600 text-lg font-semibold text-white transition"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex flex-row items-center space-x-2">
          <FaLuggageCart className="text-blue-400" />
          <span>{title}</span>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="px-6 py-6 bg-gray-900 text-gray-300 border-t rounded-b-lg border-gray-700">
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
