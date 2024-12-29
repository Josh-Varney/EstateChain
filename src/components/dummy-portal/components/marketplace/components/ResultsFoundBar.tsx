import React from "react";

interface ResultsBarProps {
    count: number;
}

const ResultsBar: React.FC<ResultsBarProps> = ({ count }) => {
    return (
        <div className="flex items-center justify-between bg-blue-100 text-blue-800 px-4 py-2 text-center rounded mb-4 shadow">
            {/* Left side: Properties found */}
            <div className="text-lg font-medium">
                {count} properties found
            </div>

            {/* Right side: Sort and Map Button */}
            <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div>
                    <select className="bg-white text-blue-800 border border-blue-400 rounded px-2 py-1 shadow-sm">
                        <option value="highest">Highest Price</option>
                        <option value="lowest">Lowest Price</option>
                        <option value="newest">Newest Listed</option>
                        <option value="oldest">Oldest Listed</option>
                    </select>
                </div>

                {/* Map Button */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow">
                    Map
                </button>
            </div>
        </div>
    );
};

export default ResultsBar;
