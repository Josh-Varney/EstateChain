import React from "react";
import { FaLuggageCart } from "react-icons/fa";

const PropertyAgentDisplayCard = ({ title }) => {
  return (
    <div className="mb-6 border rounded-lg shadow-md overflow-hidden">
      {/* Card Header */}
      <button
        className="w-full px-4 py-3 text-left bg-gray-100 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <FaLuggageCart className="text-xl" />
          <span>{title}</span>
        </div>
      </button>

      {/* Card Content */}
      <div className="px-5 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        {/* About Section */}
        <div className="mb-5">
          <h2 className="text-xl font-bold">About Savills, Haywards Heath</h2>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            4 Chelsea Arcade, The Broadway, Haywards Heath, RH16 3AP
          </p>
        </div>

        {/* Why Savills Section */}
        <div className="mb-5">
          <h2 className="text-xl font-bold">Why Savills</h2>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Founded in the UK in 1855, Savills is one of the world's leading property agents. Our experience and dedication make us a trusted partner.
          </p>
        </div>

        {/* Properties Section */}
        <div className="mb-5">
          <h2 className="text-xl font-bold">Properties We Sold Recently</h2>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Discover the diverse range of properties we have successfully sold, showcasing our expertise in the market.
          </p>
        </div>

        {/* Card Slider */}
        <div className="w-full overflow-x-auto mb-5">
          <div className="flex space-x-4">
            {/* Example property cards */}
            <div className="min-w-[200px] bg-gray-100 dark:bg-gray-700 rounded-md shadow p-3">
              <h3 className="font-semibold">Property 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Details about property 1.</p>
            </div>
            <div className="min-w-[200px] bg-gray-100 dark:bg-gray-700 rounded-md shadow p-3">
              <h3 className="font-semibold">Property 2</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Details about property 2.</p>
            </div>
            <div className="min-w-[200px] bg-gray-100 dark:bg-gray-700 rounded-md shadow p-3">
              <h3 className="font-semibold">Property 3</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Details about property 3.</p>
            </div>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
              View our properties for sale
            </h1>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
              Find out more about us
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAgentDisplayCard;
