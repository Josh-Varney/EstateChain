import React from "react";
import { FaArrowRight, FaHouseDamage } from "react-icons/fa";

const FunctionActivatedDropdown = ({ title }) => {
  return (
    <div className="mb-4 border border-gray-700 rounded-md shadow-md bg-gray-800">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-700 hover:bg-gray-600 text-lg font-semibold text-white transition"
        onClick={() => console.log("Function Activated")}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <FaHouseDamage className="text-blue-400" />
            <span>{title}</span>
          </div>
          <div>
            <FaArrowRight />
          </div>
        </div>
      </button>
    </div>
  );
};

export default FunctionActivatedDropdown;
