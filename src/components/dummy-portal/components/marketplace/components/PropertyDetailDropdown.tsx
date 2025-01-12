import React, { useState } from "react";

const CardDropdown = ({ title, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border rounded-md shadow-md">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>

      {/* Card Content */}
      {isOpen && details && (
        <div className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-t">
          {Array.isArray(details) ? (
            <ul className="list-disc pl-5 space-y-2">
              {details.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{details}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardDropdown;
