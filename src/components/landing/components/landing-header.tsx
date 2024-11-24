import React from "react";

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
                <p className="text-white font-sans selection:bg-cyan-600 selection:text-white">
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
                <button className="rounded-3xl text-white bg-gray-400 text-sm text-nowrap p-2 selection:bg-cyan-700 selection:text-white">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingHeader;
