import React from "react";

const FilterControls = ({ filters, onFilterChange, onApplyFilters }) => {
    return (
        <div className="mb-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Filter Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range */}
                <div className="flex flex-col">
                    <label
                        htmlFor="minPrice"
                        className="text-sm font-medium text-gray-700"
                    >
                        Min Price
                    </label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        placeholder="Enter minimum price"
                        value={filters.minPrice}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="maxPrice"
                        className="text-sm font-medium text-gray-700"
                    >
                        Max Price
                    </label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="Enter maximum price"
                        value={filters.maxPrice}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <label
                        htmlFor="location"
                        className="text-sm font-medium text-gray-700"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter location"
                        value={filters.location}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Bedrooms */}
                <div className="flex flex-col">
                    <label
                        htmlFor="minBedrooms"
                        className="text-sm font-medium text-gray-700"
                    >
                        Min Bedrooms
                    </label>
                    <input
                        type="number"
                        id="minBedrooms"
                        name="minBedrooms"
                        placeholder="Enter minimum bedrooms"
                        value={filters.minBedrooms}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Bathrooms */}
                <div className="flex flex-col">
                    <label
                        htmlFor="minBathrooms"
                        className="text-sm font-medium text-gray-700"
                    >
                        Min Bathrooms
                    </label>
                    <input
                        type="number"
                        id="minBathrooms"
                        name="minBathrooms"
                        placeholder="Enter minimum bathrooms"
                        value={filters.minBathrooms}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Tokens Left */}
                <div className="flex flex-col">
                    <label
                        htmlFor="minTokensLeft"
                        className="text-sm font-medium text-gray-700"
                    >
                        Min Tokens Left
                    </label>
                    <input
                        type="number"
                        id="minTokensLeft"
                        name="minTokensLeft"
                        placeholder="Enter minimum tokens left"
                        value={filters.minTokensLeft}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Token Price */}
                <div className="flex flex-col">
                    <label
                        htmlFor="maxTokenPrice"
                        className="text-sm font-medium text-gray-700"
                    >
                        Max Token Price
                    </label>
                    <input
                        type="number"
                        id="maxTokenPrice"
                        name="maxTokenPrice"
                        placeholder="Enter maximum token price"
                        value={filters.maxTokenPrice}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Property Type */}
                <div className="flex flex-col">
                    <label
                        htmlFor="type"
                        className="text-sm font-medium text-gray-700"
                    >
                        Property Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={filters.type}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Any Type</option>
                        <option value="Villa">Villa</option>
                        <option value="Cottage">Cottage</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Estate">Estate</option>
                    </select>
                </div>

                {/* Rental or Sale */}
                <div className="flex flex-col">
                    <label
                        htmlFor="rental"
                        className="text-sm font-medium text-gray-700"
                    >
                        Rental or Sale
                    </label>
                    <select
                        id="rental"
                        name="rental"
                        value={filters.rental}
                        onChange={onFilterChange}
                        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Both</option>
                        <option value="true">Rental</option>
                        <option value="false">Sale</option>
                    </select>
                </div>
            </div>

            <button
                onClick={onApplyFilters}
                className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterControls;
