import React from "react";

const FilterControls = ({ filters, onFilterChange, onApplyFilters }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={filters.location}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="minBedrooms"
                    placeholder="Min Bedrooms"
                    value={filters.minBedrooms}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="minBathrooms"
                    placeholder="Min Bathrooms"
                    value={filters.minBathrooms}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="minTokensLeft"
                    placeholder="Min Tokens Left"
                    value={filters.minTokensLeft}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="maxTokenPrice"
                    placeholder="Max Token Price"
                    value={filters.maxTokenPrice}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Property Type"
                    value={filters.type}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                />
                <select
                    name="rental"
                    value={filters.rental}
                    onChange={onFilterChange}
                    className="p-2 border rounded"
                >
                    <option value="">Rental or Sale</option>
                    <option value="true">Rental</option>
                    <option value="false">Sale</option>
                </select>
            </div>
            <button
                onClick={onApplyFilters}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterControls;
