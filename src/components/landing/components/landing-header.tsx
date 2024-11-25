import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LandingHeader: React.FC = () => {
    return (
        <div className="flex flex-row w-full justify-start items-center mt-6">
            {/* Logo Section */}
            <div>
                <p className="bg-red-50 ml-5 mr-10 p-2">Logo</p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-row items-center justify-center space-x-14 w-full">
                <p className="text-white text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    Home
                </p>
                <p className="text-white text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    About
                </p>
                <p className="text-white text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    Services
                </p>
                <p className="text-white text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    Contact
                </p>
                <p className="text-white text-sm font-sans selection:bg-cyan-600 selection:text-white">
                    Blog
                </p>
            </div>

            {/* Button Section */}
            <div className="mr-4">
                <button className="flex items-center space-x-1 rounded-xl bg-gray-700 text-white p-2 text-xs text-center text-nowrap hover:bg-gray-500">
                    {/* Icon */}
                    <FontAwesomeIcon icon={faUser} size="1x" />

                    {/* Button Text */}
                    <span>Create Account</span>
                </button>
            </div>
        </div>
    );
};

export default LandingHeader;
