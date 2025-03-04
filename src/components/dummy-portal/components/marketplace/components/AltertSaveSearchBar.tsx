import React from "react";
import { FaBell, FaChevronRight, FaStar } from "react-icons/fa";

interface AlertSaveSearchBarProps {
    postcode?: string; 
}

const AlertSaveSearchBar: React.FC<AlertSaveSearchBarProps> = ({ postcode }) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center text-white w-full px-4 py-1">
                {/* Title Section */}
                <div className="flex text-left">
                    <h1 className="text-sm">
                        {postcode
                            ? `New Homes and Developments For Sale in ${postcode}`
                            : "New Homes and Developments For Sale"}
                    </h1>
                </div>
                <div>
                    <button
                        className="flex items-center justify-center rounded-full px-3 text-gray-500 transition"
                        aria-label="Go Back"
                        >
                        <FaChevronRight className="text-sm" />
                    </button>
                </div>
                <div>
                    <button
                        className="flex items-center justify-center space-x-2 px-3 py-2"
                        onClick={() => alert("Search Saved")}
                    >
                        <FaStar className="text-base text-yellow-500" />
                        <h1 className="text-sm font-medium text-white">Save Search</h1>
                    </button>
                </div>

                <div>
                    {/* Create Alert */}
                    <button
                        className="flex items-center justify-center space-x-2 px-3 py-2"
                        onClick={() => alert("Search Saved")}
                    >
                        <FaBell className="text-base text-blue-500" />
                        <span className="text-sm font-medium text-white">Create Alert</span>
                    </button>
                </div>

            </div>
            
        </div>
    );
}

export default AlertSaveSearchBar;