import React, { useState } from "react";
import { FaHouseDamage, FaPowerOff } from "react-icons/fa";

const FunctionActivatedDropdown = ({ title }) => {

  return (
    <div className="mb-4 border rounded-md shadow-md">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        onClick={() => console.log("Function Activated")}
      >
        <div className="flex flex-row items-center space-x-2">
          <FaHouseDamage />
          <span>{title}</span>
        </div>
      </button>
    </div>
  );
};

export default FunctionActivatedDropdown;
