import React from "react";
import { FaChevronCircleLeft } from "react-icons/fa";

const AlertSaveSearchBar = () => {
    return (
        <div className="flex flex-row items-center justify-between bg-blue-500 w-full px-6 py-1 text-white">
            {/* Title Section */}
            <div className="flex-1 text-left">
                <h1 className="text-lg font-bold">
                New Homes and Developments For Sale in RH19 2ND
                </h1>
            </div>

            {/* Navigation Section */}
            <div className="flex items-center space-x-4">
                {/* Back Button */}
                <button
                className="flex items-center justify-center p-1 rounded-full bg-white text-blue-500 shadow-md hover:bg-gray-100 transition"
                aria-label="Go Back"
                >
                <FaChevronCircleLeft className="text-xl" />
                </button>

                {/* Save Search */}
                <button
                className="px-4 py-2 rounded-lg bg-white text-blue-500 font-medium shadow-md hover:bg-gray-100 transition"
                onClick={() => alert("Search Saved")}
                >
                Save Search
                </button>

                {/* Create Alert */}
                <button
                className="px-4 py-2 rounded-lg bg-white text-blue-500 font-medium shadow-md hover:bg-gray-100 transition"
                onClick={() => alert("Alert Created")}
                >
                Create Alert
                </button>
            </div>
        </div>
    );
}

export default AlertSaveSearchBar;