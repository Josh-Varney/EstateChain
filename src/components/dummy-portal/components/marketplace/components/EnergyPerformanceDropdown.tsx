import React, { useState } from "react";
import { FaInfoCircle, FaPowerOff, FaSpaceShuttle } from "react-icons/fa";

const EPCDropdown = ({ title, imageSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border rounded-md shadow-md">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-row items-center space-x-2">
          <FaPowerOff />
          <span>{title}</span>
        </div>
      </button>

      {/* Card Content */}
      {isOpen && (
        <div className="px-4 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-t">
          <div className="flex flex-row justify-between h-full w-full">
            {/* Left Column */}
            <div className="flex flex-col h-full w-full">
              <div className="flex flex-row items-center space-x-1 mb-4 ">
                <h1 className="text-xs font-bold whitespace-nowrap">Energy Performance Certificate</h1>
                <FaInfoCircle className="text-xs"/>
              </div>
              <button className="flex flex-row items-center border-black justify-center w-full border rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaSpaceShuttle className="mr-2" />
                <span>EPC 1</span>
              </button>
            </div>

            {/* Placeholder Image */}
            <div className="h-full w-full flex flex-col">
              <img
                src={imageSrc}
                alt="Placeholder"
                className="object-cover h-full w-full rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EPCDropdown;
