import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LandingHeader: React.FC = () => {
    return (
        <div className="flex flex-wrap w-full items-center mt-4">
            {/* Logo Section */}
            <div className="flex-shrink-0">
                <p className="bg-red-50 ml-5 mr-10 p-2">Logo</p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-row items-center justify-center space-x-5 flex-1 overflow-x-auto">
                <p className="text-white text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    Home
                </p>
                <p className="text-gray-500 text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    Technology
                </p>
                <p className="text-gray-500 text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    Features
                </p>
                <p className="text-gray-500 text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    Pricing
                </p>
                <p className="text-gray-500 text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    FAQ
                </p>
            </div>

            {/* Button Section */}
            <div className="flex-shrink-0 mr-6">
                <button className="flex flex-row items-center space-x-1 rounded-xl bg-gray-700 text-white p-2 text-xs hover:bg-gray-500">
                    {/* Icon */}
                    <FontAwesomeIcon icon={faUser} size="1x" />

                    {/* Button Text */}
                    <p className="text-center whitespace-nowrap">Create Account</p>
                </button>
            </div>
        </div>
    );
};

export default LandingHeader;
