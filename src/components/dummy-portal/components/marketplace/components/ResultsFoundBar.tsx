import React from "react";
import { FaMap, FaRegAddressCard } from "react-icons/fa";

interface ResultsBarProps {
    count: number;
    onSortChange?: (value: string) => void;
    onMapButtonClick?: () => void;
}

const ResultsBar: React.FC<ResultsBarProps> = ({ count, onSortChange, onMapButtonClick }) => {
    return (
        <div className="flex items-center justify-between text-gray-300 px-4 py-1 text-center shadow">
            {/* Left side: Properties found */}
            <div className="flex flex-row items-center space-x-2">
                <span className="text-2xl font-medium" aria-label="Count">
                    {count}
                </span>
                <span className="text-base" aria-label="Results Text">
                    results
                </span>
            </div>

            {/* Right side: Sort and Map Button */}
            <div className="flex items-center">
                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2 border-gray-400 border-r pr-4">
                    <label htmlFor="sortOptions" className="text-white text-sm">
                        Sort:
                    </label>
                    <select
                        id="sortOptions"
                        className="text-sm bg-transparent text-white"
                        onChange={(e) => onSortChange?.(e.target.value)}
                    >
                        <option value="">Max Price</option>
                        <option value="100">$100</option>
                        <option value="500">$500</option>
                        <option value="1000">$1000</option>
                    </select>
                </div>

                {/* Map Buttons */}
                <div className="flex items-center space-x-2">
                    <button
                        className="flex items-center space-x-2 border-gray-400 border-r text-gray-600 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2"
                        onClick={onMapButtonClick}
                        aria-label="Toggle Map View with Card"
                    >
                        <FaRegAddressCard className="text-xl h-5 w-5" />
                        <span className="sr-only">Open Map View</span>
                    </button>

                    <button
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2"
                        onClick={onMapButtonClick}
                        aria-label="Toggle Map View"
                    >
                        <FaMap className="text-xl h-5 w-5" />
                        <span className="sr-only">Open Map View</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsBar;
