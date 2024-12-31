import React from "react";

const FilterControls = ({ filters, onFilterChange, onApplyFilters }) => {
    return (
        <div className="bg-white p-3 rounded-md shadow-md border border-gray-200 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Filter Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Price Range */}
                <div className="flex flex-col">
                    <label
                        htmlFor="minPrice"
                        className="text-xs font-medium text-gray-700"
                    >
                        Min Price
                    </label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        placeholder="Min price"
                        value={filters.minPrice}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="maxPrice"
                        className="text-xs font-medium text-gray-700"
                    >
                        Max Price
                    </label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="Max price"
                        value={filters.maxPrice}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <label
                        htmlFor="location"
                        className="text-xs font-medium text-gray-700"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Location"
                        value={filters.location}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Bedrooms */}
                <div className="flex flex-col">
                    <label
                        htmlFor="minBedrooms"
                        className="text-xs font-medium text-gray-700"
                    >
                        Min Bedrooms
                    </label>
                    <input
                        type="number"
                        id="minBedrooms"
                        name="minBedrooms"
                        placeholder="Bedrooms"
                        value={filters.minBedrooms}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Bathrooms */}
                <div className="flex flex-col">
                    <label
                        htmlFor="minBathrooms"
                        className="text-xs font-medium text-gray-700"
                    >
                        Min Bathrooms
                    </label>
                    <input
                        type="number"
                        id="minBathrooms"
                        name="minBathrooms"
                        placeholder="Bathrooms"
                        value={filters.minBathrooms}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Tokens Left */}
                <div className="flex flex-col">
                    <label
                        htmlFor="minTokensLeft"
                        className="text-xs font-medium text-gray-700"
                    >
                        Min Tokens Left
                    </label>
                    <input
                        type="number"
                        id="minTokensLeft"
                        name="minTokensLeft"
                        placeholder="Tokens left"
                        value={filters.minTokensLeft}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Token Price */}
                <div className="flex flex-col">
                    <label
                        htmlFor="maxTokenPrice"
                        className="text-xs font-medium text-gray-700"
                    >
                        Max Token Price
                    </label>
                    <input
                        type="number"
                        id="maxTokenPrice"
                        name="maxTokenPrice"
                        placeholder="Token price"
                        value={filters.maxTokenPrice}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Property Type */}
                <div className="flex flex-col">
                    <label
                        htmlFor="type"
                        className="text-xs font-medium text-gray-700"
                    >
                        Property Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={filters.type}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
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
                        className="text-xs font-medium text-gray-700"
                    >
                        Rental or Sale
                    </label>
                    <select
                        id="rental"
                        name="rental"
                        value={filters.rental}
                        onChange={onFilterChange}
                        className="p-1 text-xs border border-gray-300 rounded-md mt-1 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Both</option>
                        <option value="true">Rental</option>
                        <option value="false">Sale</option>
                    </select>
                </div>
            </div>

            <button
                onClick={onApplyFilters}
                className="mt-4 w-full bg-blue-600 text-white text-sm font-medium py-1 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterControls;
