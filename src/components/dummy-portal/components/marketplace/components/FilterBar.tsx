import React, { useState, useRef, useEffect } from "react";
import FilterControls from "./FilterControl";
import { FaSortDown } from "react-icons/fa";

type Filters = {
    propertyMinPrice: string;
    propertyMaxPrice: string;
    propertyLocation: string;
    propertySettlement: string;
    propertyMinBedrooms: string;
    propertyMinBathrooms: string;
    propertyMinTokensLeft: string;
    propertyMaxTokenPrice: string;
    propertyAdded: string;
    propertyType: string;
    propertyRental: string;
};

type FilterBarProps = {
    darkMode: string;
    filters: Filters;
    onFilterChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
};

const FilterBar: React.FC<FilterBarProps> = ({ darkMode, filters, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

    const filterRef = useRef<HTMLDivElement>(null);

    const clearSearch = () => setSearchQuery("");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleFilterDropdown = () => {
        setIsFilterVisible((prev) => !prev);
    };

    return (
        <div className="relative">
            <div className="flex flex-wrap items-center gap-3 p-0 bg-gradient-to-b from-gray-800 to-gray-900">
                {/* Search Bar */}
                <div className="relative flex-grow border-gray-600 p-2 pr-4">
                    <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search location..."
                            className="flex-grow px-4 py-1 text-sm rounded-l-lg focus:outline-none text-gray-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="px-2 py-1 text-gray-400 hover:text-red-500"
                            >
                                &#x2715;
                            </button>
                        )}
                        <select
                            className="px-4 py-2 text-sm bg-white border-l rounded-r-lg border-gray-300 text-gray-400"
                        >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                        </select>
                    </div>
                </div>

                {/* Price Filter */}
                <div className="flex flex-row space-x-2 items-center px-4 py-2 border-r border-gray-600">
                    <div className="">
                        <select
                            name="propertyMinPrice"
                            value={filters.propertyMinPrice}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent"
                        >
                            <option value="">Min Price</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                    <div className="text-gray-400 text-sm">to</div>
                    <div className="">
                        <select
                            name="propertyMaxPrice"
                            value={filters.propertyMaxPrice}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent"
                        >
                            <option value="">Max Price</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                </div>

                {/* Bedroom Filter */}
                <div className="flex flex-row space-x-2 items-center px-4 py-2 border-r border-gray-600">
                    <div className="">
                        <select
                            name="propertyMinBedrooms"
                            value={filters.propertyMinBedrooms}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent"
                        >
                            <option value="">Min Beds</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="text-gray-400 text-sm">to</div>
                    <div className="">
                        <select
                            name="propertyMinBathrooms"
                            value={filters.propertyMinBathrooms}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent"
                        >
                            <option value="">Min Baths</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>

                {/* Filter Button */}
                <div
                    onClick={toggleFilterDropdown}
                    className="px-4 py-2 flex flex-row space-x-1 cursor-pointer"
                >
                    <h1 className="text-sm">Filters</h1>
                    <FaSortDown />
                </div>
            </div>

            {/* Dropdown Filter Panel */}
            {isFilterVisible && (
                <div
                    ref={filterRef}
                    className={`absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-lg mt-1 z-50 transition-transform duration-300 ease-in-out transform ${isFilterVisible ? "scale-y-100" : "scale-y-0 origin-top"}`}
                >
                    <FilterControls
                        darkMode={darkMode}
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />
                </div>
            )}
        </div>
    );
};

export default FilterBar;
