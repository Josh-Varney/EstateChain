import React, { useState } from "react";
import FilterControls from "./FilterControl";
import { FaSort, FaSortDown } from "react-icons/fa";

const FilterBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("Option 1");

    const clearSearch = () => setSearchQuery("");

    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        location: '',
        minBedrooms: '',
        minBathrooms: '',
        minTokensLeft: '',
        maxTokenPrice: '',
        type: '',
        rental: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        console.log('Applied Filters:', filters);
        setIsFilterVisible(false);
    };

    const handleFilter = () => {
        console.log('Search:', searchQuery);
        console.log('Max Price:', maxPrice);
        console.log('Filters:', filters);
    };

    return (
        <div className="relative">
            <div className="flex flex-wrap items-center gap-3 p-0 bg-gradient-to-b from-gray-800 to-gray-900">
                {/* Search Bar */}
                <div className="relative flex-grow  border-gray-600 p-2 pr-4">
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
                            value={dropdownValue}
                            onChange={(e) => setDropdownValue(e.target.value)}
                            className="px-4 py-2 text-sm bg-white border-l rounded-r-lg border-gray-300 text-gray-400"
                        >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                        </select>
                    </div>
                </div>

                {/* Max Price Dropdown */}
                <div className="flex flex-row space-x-2 items-center px-4 py-2 border-r  border-gray-600">
                    <div className="">
                        <select
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="text-sm border-gray-300 rounded-lg bg-transparent">
                            <option value="">Min Price</option>
                            <option value="100">$100</option>
                            <option value="500">$500</option>
                            <option value="1000">$1000</option>
                        </select>
                    </div>
                    <div className="text-gray-400 text-sm">
                        to
                    </div>
                    <div className="">
                        <select
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="text-sm border-gray-300 rounded-lg bg-transparent">
                            <option value="">Max Price</option>
                            <option value="100">$100</option>
                            <option value="500">$500</option>
                            <option value="1000">$1000</option>
                        </select>
                    </div>
                </div>

                {/* Bed Filter */}
                <div className="flex flex-row space-x-2 items-center px-4 py-2 border-r border-gray-600">
                    <div className="">
                        <select
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="text-sm border-gray-300 rounded-lg bg-transparent">
                            <option value="">Min Beds</option>
                            <option value="100">1</option>
                            <option value="500">2</option>
                            <option value="1000">3</option>
                        </select>
                    </div>
                    <div className="text-gray-400 text-sm">
                        to
                    </div>
                    <div className="">
                        <select
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="text-sm border-gray-300 rounded-lg bg-transparent">
                            <option value="">Max Beds</option>
                            <option value="100">1</option>
                            <option value="500">2</option>
                            <option value="1000">3</option>
                        </select>
                    </div>
                </div>

                {/* Max Price Button */}
                <div onClick={() => setIsFilterVisible(!isFilterVisible)} className="px-4 py-2 flex flex-row space-x-1">
                    <h1 className="text-sm">Filters</h1>
                    <FaSortDown />
                </div>
            </div>

            {/* Slide-out Filter Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ${
                    isFilterVisible ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ zIndex: 1000 }}
            >
                <div className="p-4">
                    <h2 className="mb-4 text-lg font-bold">Filter Settings</h2>
                    <FilterControls
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onApplyFilters={applyFilters}
                    />
                </div>
            </div>

            {/* Overlay */}
            {isFilterVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40"
                    onClick={() => setIsFilterVisible(false)}
                    style={{ zIndex: 999 }}
                ></div>
            )}
        </div>
    );
};

export default FilterBar;
