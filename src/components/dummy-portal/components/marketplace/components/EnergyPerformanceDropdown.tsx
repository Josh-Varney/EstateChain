import React, { useState } from "react";
import { FaInfoCircle, FaPowerOff, FaSpaceShuttle } from "react-icons/fa";

const EPCDropdown = ({ title, imageSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-gray-700 rounded-b-lg shadow-md bg-gray-800">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-700 hover:bg-gray-600 text-gray-100 text-lg font-semibold transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-row items-center space-x-2">
          <FaPowerOff className="text-blue-400" />
          <span>{title}</span>
        </div>
      </button>

      {/* Card Content */}
      {isOpen && (
        <div className="px-4 py-4 bg-gray-900 text-gray-200 shadow-lg rounded-b-lg transition-transform duration-300 border-t border-gray-700">
          <div className="flex flex-row justify-between h-full w-full">
            {/* Left Column */}
            <div className="flex flex-col h-full w-full">
              <div className="flex flex-row items-center space-x-1 mb-4">
                <h1 className="text-xs font-bold text-gray-300 whitespace-nowrap">
                  Energy Performance Certificate
                </h1>
                <FaInfoCircle className="text-gray-400" />
              </div>
              <button className="flex flex-row items-center justify-center w-full border border-gray-600 rounded-md p-2 bg-gray-800 hover:bg-gray-700 hover:text-white transition">
                <FaSpaceShuttle className="mr-2 text-blue-400" />
                <span>EPC 1</span>
              </button>
            </div>

            {/* Placeholder Image */}
            <div className="h-full w-full flex flex-col">
              <img
                src={imageSrc}
                alt="Placeholder"
                className="object-cover h-full w-full rounded-md border border-gray-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EPCDropdown;
