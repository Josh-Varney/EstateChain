import React, { useState } from "react";
import FilterControls from "./FilterControl";

const FilterBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);

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
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const applyFilters = () => {
        console.log('Applied Filters:', filters);
        setIsFilterVisible(false); // Close the panel after applying filters
    };

    const handleFilter = () => {
        console.log('Search:', searchQuery);
        console.log('Min Price:', minPrice);
        console.log('Max Price:', maxPrice);
        console.log('Filters:', filters);
        // Add your filtering logic here
    };

    return (
        <div className="relative">
            <div className="flex flex-row gap-4 p-4 bg-gray-100 rounded-lg">
                <div>
                    {/* Search Bar */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="p-2 border rounded-lg shadow-sm w-64"
                    />
                </div>
                <div>
                    {/* Min Price Dropdown */}
                    <select
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="p-2 border rounded-lg shadow-sm"
                    >
                        <option value="">Min Price</option>
                        <option value="10">$10</option>
                        <option value="50">$50</option>
                        <option value="100">$100</option>
                    </select>
                </div>
                <div>
                    {/* Max Price Dropdown */}
                    <select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="p-2 border rounded-lg shadow-sm"
                    >
                        <option value="">Max Price</option>
                        <option value="100">$100</option>
                        <option value="500">$500</option>
                        <option value="1000">$1000</option>
                    </select>
                </div>
                <div>
                    {/* Filter Button */}
                    <button
                        onClick={handleFilter}
                        className="p-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600"
                    >
                        Filter
                    </button>
                </div>
                <button
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    className="p-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
                >
                    {isFilterVisible ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {/* Slide-out Filter Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 max-w-md bg-white shadow-lg transform transition-transform ${
                    isFilterVisible ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ zIndex: 1000 }}
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Filter Settings</h2>
                    <FilterControls
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onApplyFilters={applyFilters}
                    />
                </div>
            </div>

            {isFilterVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={() => setIsFilterVisible(false)}
                    style={{ zIndex: 999 }}
                ></div>
            )}
        </div>
    );
};

export default FilterBar;
