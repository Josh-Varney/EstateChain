import React, { useState } from "react";
import { FaLuggageCart } from "react-icons/fa";


const PropertyMapDisplayContainer = ({ title }) => {

  return (
    <div className="mb-4 border rounded-md shadow-md">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <div className="flex flex-row items-center space-x-2">
          <FaLuggageCart />
          <span>{title}</span>
        </div>
      </button>

      {/* Card Content */}
      <div>
        <h1>Nas</h1>
      </div>
    </div>
  );
};

export default PropertyMapDisplayContainer;
